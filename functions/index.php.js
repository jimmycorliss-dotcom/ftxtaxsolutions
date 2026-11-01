// Preserve the existing Joomla demo form backend without collecting data here.
export async function onRequestPost({ request }) {
  const url = new URL(request.url);
  if (url.searchParams.get('option') !== 'com_baforms' || url.searchParams.get('view') !== 'form') {
    return new Response('Not found', { status: 404 });
  }
  const headers = new Headers();
  headers.set('Content-Type', request.headers.get('Content-Type') || 'application/x-www-form-urlencoded');
  const upstream = await fetch('https://ftxtaxsolutions.com/index.php?option=com_baforms&view=form', {
    method: 'POST', headers, body: request.body, redirect: 'manual'
  });
  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete('set-cookie');
  responseHeaders.set('Cache-Control', 'no-store');
  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
}
