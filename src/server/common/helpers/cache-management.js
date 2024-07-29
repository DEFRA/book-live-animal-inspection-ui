/**
 * Clears the specified cache keys from the request's yar storage.
 *
 * @param {Object} request - The request object containing yar.
 * @param {Array} keys - An array of cache keys to clear.
 */
function clearCacheKeys(request, keys) {
  keys.forEach((key) => {
    request.yar.clear(key)
  })
}

export { clearCacheKeys }
