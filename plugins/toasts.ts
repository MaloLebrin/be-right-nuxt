import Toast, { POSITION } from 'vue-toastification'
// import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 10000,
    shareAppContext: true,
    hideProgressBar: true,
    icon: false,
  })
})
