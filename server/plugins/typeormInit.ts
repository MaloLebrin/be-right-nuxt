import AppSource from '../config/dataSource'

export default defineNitroPlugin(async () => {
  await AppSource.initialize()

  console.log(AppSource.isInitialized, '<==== AppSource.isInitialized')
})
