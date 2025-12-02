/**
 * Pages Management Test Cases
 * 
 * Frontend E2E tests for WordPress page CRUD operations
 * 
 * Test Cases Covered:
 * - TC-FE-007: Create New Page
 * - TC-FE-008: Edit Existing Page
 * - TC-FE-009: Delete Page
 */

describe('WordPress Pages Management', () => {
  let testPageTitle

  beforeEach(() => {
    // Login before each test
    cy.wpLogin()
    
    // Generate unique page title for each test
    testPageTitle = `Test Page ${Date.now()}`
  })

  it('TC-FE-007: Should create a new page successfully', () => {
    const pageContent = 'This is the content of the test page created via Cypress E2E test.'

    // Navigate to Add New Page
    cy.visit('/wp-admin/post-new.php?post_type=page')
    
    // Wait for editor to load
    cy.waitForEditor()

    cy.get('body').then(($body) => {
      if ($body.find('.block-editor').length > 0) {
        // Gutenberg Editor
        cy.get('.editor-post-title__input', { timeout: 15000 })
          .should('be.visible')
          .clear()
          .type(testPageTitle)
        
        cy.get('.block-editor-default-block-appender__content', { timeout: 10000 })
          .click()
          .type(pageContent)
        
        cy.get('.editor-post-publish-button', { timeout: 10000 })
          .click()
        
        cy.get('.editor-post-publish-panel__header-publish-button button', { timeout: 10000 })
          .click()
        
        cy.contains('Published', { timeout: 15000 }).should('be.visible')
        
      } else {
        // Classic Editor
        cy.get('#title', { timeout: 10000 })
          .should('be.visible')
          .type(testPageTitle)
        
        cy.get('#content', { timeout: 10000 })
          .should('be.visible')
          .type(pageContent)
        
        cy.get('#publish', { timeout: 10000 })
          .click()
        
        cy.contains('Page published', { timeout: 15000 }).should('be.visible')
      }
    })

    // Verify page was created
    cy.visit('/wp-admin/edit.php?post_type=page')
    cy.get('#post-search-input').type(testPageTitle)
    cy.get('#search-submit').click()
    cy.contains('td', testPageTitle, { timeout: 10000 }).should('be.visible')
  })

  it('TC-FE-008: Should edit an existing page', () => {
    // Create a page first
    const originalTitle = `Original Page ${Date.now()}`
    const originalContent = 'Original page content.'
    const updatedTitle = `Updated Page ${Date.now()}`
    const updatedContent = 'Updated page content with new information.'

    cy.visit('/wp-admin/post-new.php?post_type=page')
    cy.waitForEditor()

    cy.get('body').then(($body) => {
      if ($body.find('.block-editor').length > 0) {
        cy.get('.editor-post-title__input', { timeout: 10000 }).type(originalTitle)
        cy.get('.block-editor-default-block-appender__content').click().type(originalContent)
        cy.get('.editor-post-publish-button').click()
        cy.get('.editor-post-publish-panel__header-publish-button button').click()
        cy.contains('Published', { timeout: 15000 }).should('be.visible')
      } else {
        cy.get('#title', { timeout: 10000 }).type(originalTitle)
        cy.get('#content').type(originalContent)
        cy.get('#publish').click()
        cy.contains('Page published', { timeout: 15000 }).should('be.visible')
      }
    })

    cy.wait(2000)

    // Navigate to All Pages and edit
    cy.visit('/wp-admin/edit.php?post_type=page')
    cy.contains('a', originalTitle, { timeout: 10000 }).click()
    cy.waitForEditor()

    // Edit the page
    cy.get('body').then(($body) => {
      if ($body.find('.block-editor').length > 0) {
        cy.get('.editor-post-title__input', { timeout: 10000 })
          .clear()
          .type(updatedTitle)
        
        cy.get('[data-type="core/paragraph"]').first().click()
        cy.get('[data-type="core/paragraph"]').first().clear().type(updatedContent)
        
        cy.get('.editor-post-publish-button').contains('Update').click({ force: true })
        cy.contains('Updated', { timeout: 10000 }).should('be.visible')
        
      } else {
        cy.get('#title', { timeout: 10000 })
          .clear()
          .type(updatedTitle)
        
        cy.get('#content', { timeout: 10000 })
          .clear()
          .type(updatedContent)
        
        cy.get('#publish').click({ force: true })
        cy.contains('Page updated', { timeout: 10000 }).should('be.visible')
      }
    })

    // Verify page was updated
    cy.visit('/wp-admin/edit.php?post_type=page')
    cy.get('#post-search-input').type(updatedTitle)
    cy.get('#search-submit').click()
    cy.contains('td', updatedTitle, { timeout: 10000 }).should('be.visible')
  })

  it('TC-FE-009: Should delete a page (move to trash)', () => {
    // Create a page first
    const pageTitle = `Page to Delete ${Date.now()}`

    cy.visit('/wp-admin/post-new.php?post_type=page')
    cy.waitForEditor()

    cy.get('body').then(($body) => {
      if ($body.find('.block-editor').length > 0) {
        cy.get('.editor-post-title__input', { timeout: 10000 }).type(pageTitle)
        cy.get('.editor-post-publish-button').click()
        cy.get('.editor-post-publish-panel__header-publish-button button').click()
        cy.contains('Published', { timeout: 15000 }).should('be.visible')
      } else {
        cy.get('#title', { timeout: 10000 }).type(pageTitle)
        cy.get('#publish').click()
        cy.contains('Page published', { timeout: 15000 }).should('be.visible')
      }
    })

    cy.wait(2000)

    // Delete the page
    cy.visit('/wp-admin/edit.php?post_type=page')
    
    // Select page and move to trash
    cy.get('tbody tr').first().find('input[type="checkbox"]').check()
    cy.get('#bulk-action-selector-top').select('trash')
    cy.get('#doaction').click()
    
    // Verify success message
    cy.contains('moved to the Trash', { timeout: 10000 }).should('be.visible')

    // Verify page is in trash
    cy.visit('/wp-admin/edit.php?post_type=page&post_status=trash')
    cy.contains('td', pageTitle, { timeout: 10000 }).should('be.visible')
  })

  it('Should permanently delete a page from trash', () => {
    // Create, publish, and delete a page
    const pageTitle = `Page to Permanently Delete ${Date.now()}`

    cy.visit('/wp-admin/post-new.php?post_type=page')
    cy.waitForEditor()

    cy.get('body').then(($body) => {
      if ($body.find('.block-editor').length > 0) {
        cy.get('.editor-post-title__input', { timeout: 10000 }).type(pageTitle)
        cy.get('.editor-post-publish-button').click()
        cy.get('.editor-post-publish-panel__header-publish-button button').click()
        cy.contains('Published', { timeout: 15000 }).should('be.visible')
      } else {
        cy.get('#title', { timeout: 10000 }).type(pageTitle)
        cy.get('#publish').click()
        cy.contains('Page published', { timeout: 15000 }).should('be.visible')
      }
    })

    cy.wait(2000)

    // Move to trash
    cy.visit('/wp-admin/edit.php?post_type=page')
    cy.get('tbody tr').first().find('input[type="checkbox"]').check()
    cy.get('#bulk-action-selector-top').select('trash')
    cy.get('#doaction').click()
    cy.wait(2000)

    // Navigate to trash and permanently delete
    cy.visit('/wp-admin/edit.php?post_type=page&post_status=trash')
    cy.get('tbody tr').first().find('input[type="checkbox"]').check()
    cy.get('#bulk-action-selector-top').select('delete')
    cy.get('#doaction').click()
    
    // Confirm deletion
    cy.on('window:confirm', (str) => {
      expect(str).to.include('delete')
      return true
    })
    
    // Verify page is deleted
    cy.contains(pageTitle, { timeout: 5000 }).should('not.exist')
  })

  it('Should create a draft page', () => {
    const draftTitle = `Draft Page ${Date.now()}`
    const draftContent = 'This is a draft page.'

    cy.visit('/wp-admin/post-new.php?post_type=page')
    cy.waitForEditor()

    cy.get('body').then(($body) => {
      if ($body.find('.block-editor').length > 0) {
        cy.get('.editor-post-title__input', { timeout: 10000 }).type(draftTitle)
        cy.get('.block-editor-default-block-appender__content').click().type(draftContent)
        cy.get('.editor-post-save-draft').click({ force: true })
        cy.contains('Saved', { timeout: 10000 }).should('be.visible')
      } else {
        cy.get('#title', { timeout: 10000 }).type(draftTitle)
        cy.get('#content').type(draftContent)
        cy.get('#save-post').click({ force: true })
        cy.contains('Draft saved', { timeout: 10000 }).should('be.visible')
      }
    })

    // Verify draft appears
    cy.visit('/wp-admin/edit.php?post_type=page&post_status=draft')
    cy.contains('td', draftTitle, { timeout: 10000 }).should('be.visible')
  })

  it('Should view page on frontend', () => {
    const pageTitle = `Frontend View Page ${Date.now()}`

    cy.visit('/wp-admin/post-new.php?post_type=page')
    cy.waitForEditor()

    cy.get('body').then(($body) => {
      if ($body.find('.block-editor').length > 0) {
        cy.get('.editor-post-title__input', { timeout: 10000 }).type(pageTitle)
        cy.get('.block-editor-default-block-appender__content').click().type('Page content for frontend viewing.')
        cy.get('.editor-post-publish-button').click()
        cy.get('.editor-post-publish-panel__header-publish-button button').click()
        cy.contains('Published', { timeout: 15000 }).should('be.visible')
      } else {
        cy.get('#title', { timeout: 10000 }).type(pageTitle)
        cy.get('#content').type('Page content for frontend viewing.')
        cy.get('#publish').click()
        cy.contains('Page published', { timeout: 15000 }).should('be.visible')
      }
    })

    cy.wait(2000)

    // Get page URL and visit frontend
    cy.visit('/wp-admin/edit.php?post_type=page')
    cy.contains('a', pageTitle, { timeout: 10000 }).then(($link) => {
      const pageUrl = $link.attr('href')
      const pageId = pageUrl.match(/post=(\d+)/)?.[1]
      
      if (pageId) {
        cy.request({
          method: 'GET',
          url: `/wp-json/wp/v2/pages/${pageId}`,
          failOnStatusCode: false
        }).then((response) => {
          if (response.status === 200 && response.body.link) {
            cy.visit(response.body.link)
            cy.contains('h1', pageTitle, { timeout: 10000 }).should('be.visible')
          }
        })
      }
    })
  })
})

