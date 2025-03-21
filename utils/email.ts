import { uniq } from '@antfu/utils'
import type {  EmployeeType } from '~~/types'

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

export function multipleEmailSuggestions({
  firstName,
  lastName,
  email,
}: Pick<EmployeeType, 'email' | 'firstName' | 'lastName'>) {
  const suffix = emailSuggestion(email)

  if (!email || !suffix) {
    return []
  }

  if (!firstName && !lastName) {
    return [suffix]
  }

  const first = firstName.toLocaleLowerCase()
  const last = lastName.toLocaleLowerCase()

  const suggestionWithSeperator = ['.', '', '-'].map(sperator =>
    `${first}${sperator}${last}${suffix}`)

  return uniq([
    ...suggestionWithSeperator,
    `${Array.from(first)[0]}${last}${suffix}`,
    `${first}${suffix}`,
    `${last}${suffix}`,
  ])
}
