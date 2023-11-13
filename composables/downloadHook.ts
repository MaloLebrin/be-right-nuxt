import { FetchWrapper } from '~~/helpers/api'
import { useAuthStore } from '~~/store'

export function downloadHook() {
  const { $isProductionMode } = useNuxtApp()
  const authStore = useAuthStore()

  const newAPI = new FetchWrapper({
    baseUrl: $isProductionMode ? import.meta.env.VITE_API_URL as string : import.meta.env.VITE_DEV_API_URL as string,
    token: authStore.getToken || undefined,
    isFileRequest: true,
  })

  async function downloadAnswers(ids: number[]) {
    const { data } = await newAPI.get<{
      fileName: string
      content: string
      mimeType: string
    }>(`answer/downloadTest/?ids=${ids.join(',')}`, true)

    return data
  }
  return {
    downloadAnswers,
  }
}
