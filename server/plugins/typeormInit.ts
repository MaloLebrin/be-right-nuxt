import AppSource from '../../typeorm/config/dataSource'

export default defineNitroPlugin(async () => {
  await AppSource.initialize()

  if (AppSource.isInitialized) {
    console.info('🎉 App source is initialized 🎉')
  }
})
