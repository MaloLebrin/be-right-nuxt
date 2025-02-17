import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/')
})

test('Load landing page', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'BeRight: Révolutionnez votre gestion des droits à l\'image' })).toBeVisible()
  await expect(page.getByTestId('commencer-home-button')).toBeVisible()
  await expect(page.getByTestId('solutions-home-link-header')).toBeVisible()
})

test('click on links redirect on right page with section solution', async ({ page }) => {
  const solutionsLink = page.getByTestId('solutions-home-link-header')
  await expect(solutionsLink).toBeVisible()
  await solutionsLink.click()
  await expect(page).toHaveURL('http://localhost:3000/#Solution')
})

test('click on links redirect on right page login', async ({ page }) => {
  const commencerLink = page.getByTestId('commencer-home-button')
  await expect(commencerLink).toBeVisible()
  await commencerLink.click()
  await expect(page).toHaveURL('http://localhost:3000/login')
})

test('Newletter input have validation', async ({ page }) => {
  const button = page.getByTestId('newletter-submit-button')

  await expect(button).toBeVisible()
  await expect(button).toBeDisabled()

  const input = page.getByLabel('email')
  await input.fill('albus@poudlard.com')
  await expect(input).toHaveValue('albus@poudlard.com')
  await expect(button).toBeEnabled()
})
