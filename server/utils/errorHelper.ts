import type { H3Event } from 'h3'

export async function sendZodErrorResponse(event: H3Event, errorData: any) {
  const parsedErrors = getMappedZodErrors(errorData)
  return sendError(event, createError({ statusCode: 422, statusMessage: 'Invalid Data Provided', data: parsedErrors }))
}

export function getMappedZodErrors(zodError: any) {
  const errors = new Map<string, { message: string }>()
  JSON.parse(zodError).forEach((zodError: any) => {
    errors.set(zodError.path[0], { message: zodError.message })
  })
  return JSON.stringify(Object.fromEntries(errors))
}
