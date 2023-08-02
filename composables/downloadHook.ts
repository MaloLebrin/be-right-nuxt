import { useUiStore } from '~~/store/ui/uiStore'

export default function downloadHook() {
  const { $api } = useNuxtApp()
  const { IncLoading, DecLoading } = useUiStore()

  async function downloadAnswer(answerID: number) {
    IncLoading()
    const res = await $api().get(`answer/download/?ids=${answerID}`, true)

    console.log(res, '<==== res')
    const fileName = ''
    const content = ''
    const mimeType = 'application/pdf'

    // saveAs(
    //   new Blob([Uint8Array.from(atob(content), c => c.charCodeAt(0))], {
    //     type: mimeType,
    //   }),
    //   fileName,
    // )
    DecLoading()
  }

  return {
    downloadAnswer,
  }
}
