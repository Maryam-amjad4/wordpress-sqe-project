// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to login to WordPress admin
 * Usage: cy.wpLogin('username', 'password')
 */
Cypress.Commands.add('wpLogin', (username, password) => {
  const usernameValue = username || Cypress.env('wpAdminUsername')
  const passwordValue = password || Cypress.env('wpAdminPassword')
  
  cy.visit('/wp-admin')
  cy.get('#user_login', { timeout: 10000 }).type(usernameValue)
  cy.get('#user_pass').type(passwordValue)
  cy.get('#wp-submit').click()
  
  // Wait for admin dashboard to load
  cy.url({ timeout: 10000 }).should('include', '/wp-admin')
  cy.get('#wpadminbar', { timeout: 10000 }).should('be.visible')
})

/**
 * Custom command to logout from WordPress
 * Usage: cy.wpLogout()
 */
Cypress.Commands.add('wpLogout', () => {
  cy.visit('/wp-admin')
  cy.get('#wp-admin-bar-logout a').click({ force: true })
  
  // Alternative method if the above doesn't work
  cy.url().then((url) => {
    if (url.includes('/wp-admin')) {
      cy.visit('/wp-login.php?action=logout')
      cy.get('a').contains('log out').click({ force: true })
    }
  })
})

/**
 * Custom command to navigate to WordPress admin menu item
 * Usage: cy.wpAdminMenu('Posts', 'All Posts')
 */
Cypress.Commands.add('wpAdminMenu', (parentMenu, subMenu = null) => {
  // Hover over parent menu
  cy.contains('#adminmenu', parentMenu).should('be.visible').click({ force: true })
  
  // Click submenu if provided
  if (subMenu) {
    cy.contains('#adminmenu a', subMenu).should('be.visible').click({ force: true })
  }
})

/**
 * Custom command to wait for WordPress editor to load
 * Usage: cy.waitForEditor()
 */
Cypress.Commands.add('waitForEditor', () => {
  // Wait for Gutenberg editor or classic editor
  cy.get('body').then(($body) => {
    if ($body.find('.block-editor').length > 0) {
      // Gutenberg editor
      cy.get('.block-editor', { timeout: 15000 }).should('be.visible')
    } else if ($body.find('#content').length > 0) {
      // Classic editor
      cy.get('#content', { timeout: 15000 }).should('be.visible')
    }
  })
})

/**
 * Custom command to create a post via admin interface
 * Usage: cy.createPost('Title', 'Content')
 */
Cypress.Commands.add('createPost', (title, content) => {
  cy.visit('/wp-admin/post-new.php')
  cy.waitForEditor()
  
  // Handle Gutenberg editor
  cy.get('body').then(($body) => {
    if ($body.find('.block-editor').length > 0) {
      // Gutenberg: Add title
      cy.get('.editor-post-title__input', { timeout: 10000 }).type(title)
      
      // Gutenberg: Add content
      if (content) {
        cy.get('.block-editor-default-block-appender__content').click()
        cy.get('[data-type="core/paragraph"]').last().type(content)
      }
    } else {
      // Classic editor
      cy.get('#title').type(title)
      if (content) {
        cy.get('#content').type(content)
      }
    }
  })
})

/**
 * Custom command to save/publish a post
 * Usage: cy.publishPost()
 */
Cypress.Commands.add('publishPost', () => {
  cy.get('body').then(($body) => {
    if ($body.find('.block-editor').length > 0) {
      // Gutenberg: Click publish button
      cy.get('.editor-post-publish-button', { timeout: 10000 }).click({ force: true })
      cy.get('.editor-post-publish-panel__header-publish-button button').click({ force: true })
      // Wait for success message
      cy.contains('Published', { timeout: 10000 }).should('be.visible')
    } else {
      // Classic editor
      cy.get('#publish').click({ force: true })
      cy.contains('Post published', { timeout: 10000 }).should('be.visible')
    }
  })
})

/**
 * Custom command to search for content
 * Usage: cy.wpSearch('search term')
 */
Cypress.Commands.add('wpSearch', (searchTerm) => {
  cy.get('#wp-admin-bar-search').then(($search) => {
    if ($search.length > 0) {
      // Admin bar search
      cy.get('#wp-admin-bar-search a').click()
      cy.get('#adminbar-search-input').type(searchTerm + '{enter}')
    } else {
      // Frontend search
      cy.get('input[name="s"]').first().type(searchTerm + '{enter}')
    }
  })
})

