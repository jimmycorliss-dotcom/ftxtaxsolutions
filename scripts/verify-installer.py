"""Verify a published download against its recorded size and SHA-256."""
import hashlib, json, sys, urllib.request

metadata = json.load(open(sys.argv[1], encoding='utf-8'))
digest = hashlib.sha256()
size = 0
with urllib.request.urlopen(metadata['url'], timeout=180) as response:
    for chunk in iter(lambda: response.read(1024 * 1024), b''):
        digest.update(chunk)
        size += len(chunk)
assert size == metadata['bytes'], 'Download size mismatch'
assert digest.hexdigest() == metadata['sha256'], 'Download SHA-256 mismatch'
print(f'Verified {metadata["filename"]}: {size:,} bytes; SHA-256 matches original.')
