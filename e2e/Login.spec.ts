import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/login')
})

test('button to submit form login is disabled by default', async ({ page }) => {
  await expect(page).toHaveTitle(/Se connecter | Be Right/)
  await expect(page.getByRole('heading', { name: 'Connectez vous sur' })).toBeVisible()

  const submitButton = page.getByTestId('login-submit-button')
  await expect(submitButton).toBeVisible()
  await expect(submitButton).toBeDisabled()

  const inputEmail = page.getByLabel('email')
  await inputEmail.fill('albus@poudlard.com')
  await expect(inputEmail).toHaveValue('albus@poudlard.com')

  await expect(submitButton).toBeDisabled()

  const inputPassword = page.locator('#password')
  await page.fill('#password', 'password')
  await expect(inputPassword).toHaveValue('password')
  await expect(submitButton).toBeEnabled()
})
