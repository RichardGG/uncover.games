export async function getCachedData(
  cacheName: string,
  cacheKey: string
): Promise<false | Response> {
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(cacheKey);

  if (!cachedResponse || !cachedResponse.ok) {
    return false;
  }

  return await cachedResponse;
}

export async function setCachedData(
  cacheName: string,
  cacheKey: string,
  data: string
) {
  const cacheStorage = await caches.open(cacheName);
  cacheStorage.put(
    cacheKey,
    new Response(data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Timestamp': `${Date.now()}`,
      },
    })
  );
}

export function needsRefresh(
  modifiedTime: string,
  cachedResponse: Response | false
): boolean {
  if (!cachedResponse) {
    return true;
  }
  return (
    Date.parse(modifiedTime) >
    parseInt(cachedResponse.headers.get('X-Timestamp') ?? '0')
  );
}
