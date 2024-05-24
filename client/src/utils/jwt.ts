export function tokenHasExpired(token: string) {
  if (!token) return true
  const [, payload] = token.split('.')
  const decodedPayload = JSON.parse(atob(payload))
  const now = Date.now() / 1000
  return now >= decodedPayload.exp
}

export function tokenIsAboutToExpire(token: strng) {
  
}
