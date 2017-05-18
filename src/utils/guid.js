let seed = 0

export function guid () {
  return Date.now() + '_' + (seed++)
}

export function isUuid (uuid) {
  let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i
  return pattern.test(uuid)
}
