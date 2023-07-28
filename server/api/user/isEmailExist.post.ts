import { UserRepository } from '../../database/client'

export default defineEventHandler(async event => {
  const { email } = await readBody<{ email: string }>(event)

  if (!email) {
    return sendError(event, createError({ statusCode: 422, message: 'Paramètres manquants' }))
  }

  const count = await UserRepository.count({
    where: {
      email,
    },
  })

  return {
    success: count === 0,
    message: count > 0 ? 'Cet email n\'est pas disponible' : 'Vous pouvez utiliser cet email',
  }
})
