import puppeteer from 'puppeteer-core'

export default defineEventHandler(async event => {
  console.time('pdf')
  const { token, answerIds, fileName } = await readBody<{
    token: string
    answerIds: number[]
    fileName: string
  }>(event)

  const API_KEY = process.env.BROWSERLESS_API_KEY
  if (!API_KEY) {
    throw createError({ statusCode: 422, statusMessage: 'PDFs indiponibles' })
  }

  if (!answerIds || answerIds.length === 0) {
    throw createError({ statusCode: 422, statusMessage: 'Aucun document à télécharger' })
  }

  const browser = await puppeteer.connect({
    browserWSEndpoint: `https://chrome.browserless.io/pdf?token=${API_KEY}`,
  })

  const URL = `${process.env.VITE_API_URL}answer/view/?ids=${answerIds.join(',')}`

  const page = await browser.newPage()

  await page.setExtraHTTPHeaders({
    authorization: `Bearer ${token}`,
  })

  await page.goto(URL, { waitUntil: 'networkidle0' })

  const pdf = await page.pdf({
    format: 'A4',
  })

  await browser.close()
  console.timeEnd('pdf')

  return {
    fileName,
    content: pdf.toString('base64'),
  }
})
