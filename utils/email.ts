export function emailSuggestion(basicEmail: string) {
  if (!basicEmail || !isCompleteEmail(basicEmail)) {
    return null
  }
  const domainExt = basicEmail.split('@').pop()
  if (!isHalfEmail(`@${domainExt}`)) {
    return null
  }
  return `@${domainExt}`
}

export function isHalfEmail(email: string) {
  return email?.match(
    /^@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  )
}

export function isCompleteEmail(email: string) {
  return email?.match(
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  )
}
