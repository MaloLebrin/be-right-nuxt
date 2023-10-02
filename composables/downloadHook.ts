import { saveAs } from 'file-saver'
import { FetchMethods } from 'helpers/api'
import { useUiStore } from '~~/store/ui/uiStore'

export default function downloadHook() {
  const { $api } = useNuxtApp()
  const { IncLoading, DecLoading } = useUiStore()

  async function downloadAnswer(answerID: number) {
    IncLoading()

    const token = $api().token

    const headers = new Headers({
      Accept: 'application/pdf',
      Authorization: `Bearer ${token || ''}`,
    })
    const res = await fetch(`answer/download/?ids=${answerID}`, {
      headers,
      method: FetchMethods.GET,
    })

    console.log(res, '<==== res')
    const fileName = ''
    const content = ''
    const mimeType = 'application/pdf'

    saveAs(
      new Blob([Uint8Array.from(atob(content), c => c.charCodeAt(0))], {
        type: mimeType,
      }),
      fileName,
    )
    DecLoading()
  }

  return {
    downloadAnswer,
  }
}
