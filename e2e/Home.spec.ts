import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/')
})

test('Load landing page', async ({ page }) => {
  await expect(page).toHaveTitle(/Accueil | Be Right/)
  await expect(page.getByRole('heading', { name: 'Gérez enfin le droit à l\'image de vos clients facilement !' })).toBeVisible()
  await expect(page.getByTestId('commencer-home-button')).toBeVisible()
  await expect(page.getByTestId('solutions-home-link-header')).toBeVisible()
  await expect(page.getByTestId('pricings-home-link-header')).toBeVisible()
})

test('Newletter input have validation', async ({ page }) => {
  const button = page.getByRole('button', {
    name: 'Prévenez-moi',
  })

  await button.isVisible()

  const input = page.getByLabel('email')
  await input.fill('albus@poudlard.com')
  await expect(input).toHaveValue('albus@poudlard.com')
  // await expect(button).toBeDisabled()
  // await expect(button).toBeVisible()
  // await page.getByRole('button', {
  //   name: 'Prévenez-moi',
  // }).isDisabled()

  // cy.get('button[type=submit]').should('exist')
  // cy.get('button[type=submit]').should('be.disabled')

  // cy.get('#email').should('exist')
  // cy.get('#email').type('albus@poudlard.com')
  // cy.get('#email').should('have.value', 'albus@poudlard.com')

  // cy.get('button[type=submit]').should('be.enabled')
})
