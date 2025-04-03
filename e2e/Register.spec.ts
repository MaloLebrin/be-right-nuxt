import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/register')
})

test('load register page', async ({ page }) => {
  await expect(page).toHaveURL('http://localhost:3000/register')
})

test('button to submit form login is disabled by default', async ({ page }) => {
  const submitButton = page.getByTestId('register-submit-button')
  await expect(submitButton).toBeVisible()
  await expect(submitButton).toBeDisabled()

  const inputEmail = page.getByLabel('email')
  await inputEmail.fill('albus@poudlard.com')
  await expect(inputEmail).toHaveValue('albus@poudlard.com')

  await expect(submitButton).toBeDisabled()

  const inputFirstName = page.locator('#firstName')
  await inputFirstName.fill('Argus')
  await expect(inputFirstName).toHaveValue('Argus')

  await expect(submitButton).toBeDisabled()

  const inputLastName = page.locator('#firstName')
  await inputLastName.fill('Rusard')
  await expect(inputLastName).toHaveValue('Rusard')

  await expect(submitButton).toBeDisabled()

  const inputPassword = page.locator('#password')
  await inputPassword.fill('password')
  await expect(inputPassword).toHaveValue('password')

  await expect(submitButton).toBeDisabled()

  await inputPassword.fill('Password6!')
  await expect(inputPassword).toHaveValue('Password6!')

  await expect(page.locator('span[role="alert"]')).toBeHidden()
})
