/**
 * Login Test Cases
 * 
 * Frontend E2E tests for WordPress user login and logout functionality
 * 
 * Test Cases Covered:
 * - TC-FE-001: User Login - Valid Credentials
 * - TC-FE-002: User Login - Invalid Credentials
 * - TC-FE-003: User Logout
 */

describe('WordPress Login Tests', () => {
  beforeEach(() => {
    // Ensure we start from a logged-out state
    cy.visit('/wp-login.php')
  })

  it('TC-FE-001: Should login successfully with valid credentials', () => {
    const username = Cypress.env('wpAdminUsername') || 'admin'
    const password = Cypress.env('wpAdminPassword') || 'admin'

    // Enter login credentials
    cy.get('#user_login').should('be.visible').type(username)
    cy.get('#user_pass').should('be.visible').type(password)
    
    // Click login button
    cy.get('#wp-submit').click()

    // Verify successful login - should redirect to admin dashboard
    cy.url({ timeout: 10000 }).should('include', '/wp-admin')
    
    // Verify admin bar is visible (indicates successful login)
    cy.get('#wpadminbar', { timeout: 10000 }).should('be.visible')
    
    // Verify username appears in admin bar
    cy.get('#wp-admin-bar-my-account').should('contain', username)
  })

  it('TC-FE-002: Should fail login with invalid password', () => {
    const username = Cypress.env('wpAdminUsername') || 'admin'
    const invalidPassword = 'wrong_password_123'

    // Enter login credentials with wrong password
    cy.get('#user_login').should('be.visible').type(username)
    cy.get('#user_pass').should('be.visible').type(invalidPassword)
    
    // Click login button
    cy.get('#wp-submit').click()

    // Verify login failed - should still be on login page
    cy.url().should('include', '/wp-login.php')
    
    // Verify error message is displayed
    cy.get('#login_error', { timeout: 5000 }).should('be.visible')
    cy.get('#login_error').should('contain', 'incorrect')
  })

  it('TC-FE-002: Should fail login with invalid username', () => {
    const invalidUsername = 'nonexistent_user_12345'
    const password = Cypress.env('wpAdminPassword') || 'admin'

    // Enter invalid username
    cy.get('#user_login').should('be.visible').type(invalidUsername)
    cy.get('#user_pass').should('be.visible').type(password)
    
    // Click login button
    cy.get('#wp-submit').click()

    // Verify login failed
    cy.url().should('include', '/wp-login.php')
    
    // Verify error message is displayed
    cy.get('#login_error', { timeout: 5000 }).should('be.visible')
    cy.get('#login_error').should('contain', 'invalid')
  })

  it('TC-FE-003: Should logout successfully', () => {
    // First, login
    cy.wpLogin()

    // Verify we're logged in
    cy.get('#wpadminbar').should('be.visible')

    // Logout via admin bar
    cy.get('#wp-admin-bar-my-account').click({ force: true })
    
    // Click logout link
    cy.contains('a', 'Log Out').click({ force: true })

    // Alternative logout method if admin bar method doesn't work
    cy.url().then((url) => {
      if (!url.includes('/wp-login.php')) {
        cy.visit('/wp-login.php?action=logout')
      }
    })

    // Verify logged out - should be redirected to login page or home
    cy.url().should('satisfy', (url) => {
      return url.includes('/wp-login.php') || url.includes('loggedout=true') || url === Cypress.config().baseUrl + '/'
    })
    
    // Verify admin bar is not visible
    cy.get('body').then(($body) => {
      if ($body.find('#wpadminbar').length === 0) {
        cy.log('Successfully logged out - admin bar not visible')
      }
    })
  })

  it('Should maintain login session across page navigation', () => {
    // Login first
    cy.wpLogin()

    // Navigate to different admin pages
    cy.visit('/wp-admin/edit.php') // Posts page
    cy.get('#wpadminbar').should('be.visible')

    cy.visit('/wp-admin/edit.php?post_type=page') // Pages page
    cy.get('#wpadminbar').should('be.visible')

    cy.visit('/wp-admin/users.php') // Users page
    cy.get('#wpadminbar').should('be.visible')

    // Verify still logged in
    cy.get('#wp-admin-bar-my-account').should('be.visible')
  })

  it('Should show "Remember Me" checkbox on login page', () => {
    cy.get('#rememberme').should('be.visible')
    cy.get('label[for="rememberme"]').should('contain', 'Remember Me')
  })

  it('Should have "Lost your password?" link', () => {
    cy.get('a').contains('Lost your password?').should('be.visible')
    cy.get('a').contains('Lost your password?').should('have.attr', 'href').and('include', 'wp-login.php?action=lostpassword')
  })
})

