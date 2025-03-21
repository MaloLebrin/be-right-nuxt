import { FetchWrapper } from '~~/helpers/api'
import { useAuthStore } from '~~/store'

export function downloadHook() {
  const { $isProductionMode, $pinia } = useNuxtApp()
  const authStore = useAuthStore($pinia)

  function composeFileName({
    answerIds,
    eventName,
    employeeName,
  }: {
    answerIds: number[]
    eventName: string
    employeeName?: string
  }): string {
    if (answerIds.length > 1 || !employeeName) {
      return `droits-images-${eventName}.pdf`
    }
    return `droits-images-${employeeName}.pdf`
  }

  async function downloadAnswers({
    answerIds,
    eventName,
    employeeName,
  }: {
    answerIds: number[]
    eventName: string
    employeeName?: string
  }) {
    if ($isProductionMode) {
      const { data } = await useFetch<{ fileName: string; content: string }>('/api/pdf/answer', {
        method: 'post',
        body: {
          token: authStore.token,
          answerIds,
          fileName: composeFileName({
            answerIds,
            eventName,
            employeeName,
          }),
        },
      })
      return data.value
    } else {
      return downloadAnswerUseApi(answerIds)
    }
  }

  async function downloadAnswerUseApi(ids: number[]) {
    const newAPI = new FetchWrapper({
      baseUrl: $isProductionMode ? import.meta.env.VITE_API_URL as string : import.meta.env.VITE_DEV_API_URL as string,
      token: authStore.getToken || undefined,
      isFileRequest: true,
    })

    const { data } = await newAPI.get<{
      fileName: string
      content: string
      mimeType: string
    }>(`answer/download/?ids=${ids.join(',')}`, true)

    return data
  }

  return {
    downloadAnswers,
  }
}
