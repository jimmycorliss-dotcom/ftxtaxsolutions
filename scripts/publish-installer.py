"""Publish the user-selected installer without storing authentication credentials."""
import argparse, hashlib, json, subprocess, urllib.request
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('--product', choices=['intuit', 'crosslink'], default='intuit')
args = parser.parse_args()
crosslink = args.product == 'crosslink'
source = Path(r'C:\Users\anglo\OneDrive\Desktop') / ('XLink24 Demo_Tax_Year_2023.exe' if crosslink else 'EvalInstaller Intuit.exe')
asset_name = 'Crosslink-demo.exe' if crosslink else 'EvalInstaller-Intuit.exe'
release_name = 'Crosslink Demo' if crosslink else 'Intuit Evaluation Installer'
data = source.read_bytes()
credentials = subprocess.run(['git', '-c', 'credential.interactive=false', 'credential', 'fill'], input='protocol=https\nhost=github.com\n\n', text=True, capture_output=True, check=True)
values = dict(line.split('=', 1) for line in credentials.stdout.splitlines() if '=' in line)
token = values['password']
repo = 'jimmycorliss-dotcom/ftxtaxsolutions'
tag = ('crosslink-demo-' if crosslink else 'intuit-eval-installer-') + hashlib.sha256(data).hexdigest()[:12]

def api(url, body=None, content_type='application/json'):
    headers = {'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json', 'User-Agent': 'FTX-deployment', 'Content-Type': content_type}
    payload = json.dumps(body).encode() if isinstance(body, dict) else body
    if content_type == 'application/octet-stream':
        headers['Content-Length'] = str(len(body))
        def chunks():
            for offset in range(0, len(body), 1024 * 1024):
                yield body[offset:offset + 1024 * 1024]
                if offset and offset % (32 * 1024 * 1024) == 0:
                    print(f'Uploaded {offset // (1024 * 1024)} MiB', flush=True)
        payload = chunks()
    with urllib.request.urlopen(urllib.request.Request(url, data=payload, headers=headers), timeout=900) as response:
        return json.load(response)

base = 'https://api.github.com/repos/' + repo
try:
    release = api(base + '/releases/tags/' + tag)
except urllib.error.HTTPError as error:
    if error.code != 404: raise
    release = api(base + '/releases', {'tag_name': tag, 'target_commitish': 'main', 'name': release_name, 'body': 'Installer supplied by the site owner. SHA-256: ' + hashlib.sha256(data).hexdigest(), 'draft': False, 'prerelease': False})
asset = next((a for a in release['assets'] if a['name'] == asset_name), None)
if not asset:
    asset = api(release['upload_url'].split('{')[0] + '?name=' + asset_name, data, 'application/octet-stream')
assert asset['size'] == len(data)
metadata = {'url': asset['browser_download_url'], 'filename': source.name, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest(), 'release': release['html_url']}
Path('installer-crosslink.json' if crosslink else 'installer.json').write_text(json.dumps(metadata, indent=2) + '\n')
print(json.dumps(metadata))
