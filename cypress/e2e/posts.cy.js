/**
 * Posts Management Test Cases
 * 
 * Frontend E2E tests for WordPress post CRUD operations
 * 
 * Test Cases Covered:
 * - TC-FE-004: Create New Post - Web Interface
 * - TC-FE-005: Edit Existing Post
 * - TC-FE-006: Delete Post
 */

describe('WordPress Posts Management', () => {
  let testPostTitle
  let testPostId

  beforeEach(() => {
    // Login before each test
    cy.wpLogin()
    
    // Generate unique post title for each test
    testPostTitle = `Test Post ${Date.now()}`
  })

  afterEach(() => {
    // Cleanup: Delete test posts after each test
    if (testPostId) {
      cy.request({
        method: 'DELETE',
        url: `/wp-json/wp/v2/posts/${testPostId}?force=true`,
        headers: {
          'Authorization': 'Basic ' + btoa(`${Cypress.env('wpAdminUsername')}:${Cypress.env('wpAdminPassword')}`)
        },
        failOnStatusCode: false
      })
    }
  })

  it('TC-FE-004: Should create a new post successfully', () => {
    const postContent = 'This is the content of the test post created via Cypress E2E test.'

    // Navigate to Add New Post page
    cy.visit('/wp-admin/post-new.php')
    
    // Wait for editor to load
    cy.waitForEditor()

    // Check which editor is being used (Gutenberg or Classic)
    cy.get('body').then(($body) => {
      if ($body.find('.block-editor').length > 0) {
        // Gutenberg Editor
        cy.log('Using Gutenberg editor')
        
        // Enter post title
        cy.get('.editor-post-title__input', { timeout: 15000 })
          .should('be.visible')
          .clear()
          .type(testPostTitle)
        
        // Add content
        cy.get('.block-editor-default-block-appender__content', { timeout: 10000 })
          .click()
          .type(postContent)
        
        // Publish the post
        cy.get('.editor-post-publish-button', { timeout: 10000 })
          .should('be.visible')
          .click()
        
        // Confirm publish
        cy.get('.editor-post-publish-panel__header-publish-button button', { timeout: 10000 })
          .should('be.visible')
          .click()
        
        // Wait for publish confirmation
        cy.contains('Published', { timeout: 15000 }).should('be.visible')
        
      } else {
        // Classic Editor
        cy.log('Using Classic editor')
        
        // Enter post title
        cy.get('#title', { timeout: 10000 })
          .should('be.visible')
          .type(testPostTitle)
        
        // Switch to text editor if needed
        cy.get('body').then(($body) => {
          if ($body.find('#content-tmce').length > 0) {
            cy.get('#content-tmce').click()
          }
        })
        
        // Enter content
        cy.get('#content', { timeout: 10000 })
          .should('be.visible')
          .type(postContent)
        
        // Publish the post
        cy.get('#publish', { timeout: 10000 })
          .should('be.visible')
          .click()
        
        // Wait for publish confirmation
        cy.contains('Post published', { timeout: 15000 }).should('be.visible')
      }
    })

    // Verify post was created - navigate to All Posts
    cy.visit('/wp-admin/edit.php')
    
    // Search for the post
    cy.get('#post-search-input').type(testPostTitle)
    cy.get('#search-submit').click()
    
    // Verify post appears in the list
    cy.contains('td', testPostTitle, { timeout: 10000 }).should('be.visible')
  })

  it('TC-FE-005: Should edit an existing post', () => {
    // First, create a post to edit
    const originalTitle = `Original Post ${Date.now()}`
    const originalContent = 'Original post content.'
    const updatedTitle = `Updated Post ${Date.now()}`
    const updatedContent = 'Updated post content with new information.'

    cy.createPost(originalTitle, originalContent)
    cy.publishPost()

    // Wait a moment for post to be saved
    cy.wait(2000)

    // Navigate to All Posts
    cy.visit('/wp-admin/edit.php')
    
    // Find and click on the post
    cy.contains('a', originalTitle, { timeout: 10000 }).click()

    // Wait for editor to load
    cy.waitForEditor()

    // Edit the post
    cy.get('body').then(($body) => {
      if ($body.find('.block-editor').length > 0) {
        // Gutenberg: Update title
        cy.get('.editor-post-title__input', { timeout: 10000 })
          .clear()
          .type(updatedTitle)
        
        // Gutenberg: Update content
        cy.get('[data-type="core/paragraph"]').first().click()
        cy.get('[data-type="core/paragraph"]').first().clear().type(updatedContent)
        
        // Update the post
        cy.get('.editor-post-publish-button').contains('Update').click({ force: true })
        cy.contains('Updated', { timeout: 10000 }).should('be.visible')
        
      } else {
        // Classic: Update title
        cy.get('#title', { timeout: 10000 })
          .clear()
          .type(updatedTitle)
        
        // Classic: Update content
        cy.get('#content', { timeout: 10000 })
          .clear()
          .type(updatedContent)
        
        // Update the post
        cy.get('#publish').click({ force: true })
        cy.contains('Post updated', { timeout: 10000 }).should('be.visible')
      }
    })

    // Verify post was updated - navigate back to All Posts
    cy.visit('/wp-admin/edit.php')
    cy.get('#post-search-input').type(updatedTitle)
    cy.get('#search-submit').click()
    
    // Verify updated post appears
    cy.contains('td', updatedTitle, { timeout: 10000 }).should('be.visible')
  })

  it('TC-FE-006: Should delete a post (move to trash)', () => {
    // Create a post first
    cy.createPost(`Post to Delete ${Date.now()}`, 'This post will be deleted.')
    cy.publishPost()
    cy.wait(2000)

    // Navigate to All Posts
    cy.visit('/wp-admin/edit.php')
    
    // Find the post row
    cy.get('body').then(($body) => {
      // Try to find post by title
      cy.get('tbody tr').contains('Post to Delete').parent('tr').within(() => {
        // Hover over the row to show actions
        cy.get('a.submitdelete').invoke('show').click({ force: true })
      })
    })

    // Alternative method: Select post checkbox and bulk delete
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr').length > 0) {
        // Select first post checkbox
        cy.get('tbody tr').first().find('input[type="checkbox"]').check()
        
        // Select "Move to Trash" from bulk actions
        cy.get('#bulk-action-selector-top').select('trash')
        
        // Click Apply button
        cy.get('#doaction').click()
        
        // Verify success message
        cy.contains('moved to the Trash', { timeout: 10000 }).should('be.visible')
      }
    })
  })

  it('Should permanently delete a post from trash', () => {
    // First, create and delete a post
    const postTitle = `Post to Permanently Delete ${Date.now()}`
    
    cy.createPost(postTitle, 'This post will be permanently deleted.')
    cy.publishPost()
    cy.wait(2000)

    // Delete it (move to trash)
    cy.visit('/wp-admin/edit.php')
    cy.get('tbody tr').first().find('input[type="checkbox"]').check()
    cy.get('#bulk-action-selector-top').select('trash')
    cy.get('#doaction').click()
    cy.wait(2000)

    // Navigate to Trash
    cy.visit('/wp-admin/edit.php?post_status=trash')
    
    // Select the post and permanently delete
    cy.get('tbody tr').first().find('input[type="checkbox"]').check()
    cy.get('#bulk-action-selector-top').select('delete')
    cy.get('#doaction').click()
    
    // Confirm deletion
    cy.on('window:confirm', (str) => {
      expect(str).to.include('delete')
      return true
    })
    
    // Verify post is deleted
    cy.contains(postTitle, { timeout: 5000 }).should('not.exist')
  })

  it('Should create a draft post', () => {
    const draftTitle = `Draft Post ${Date.now()}`
    const draftContent = 'This is a draft post.'

    cy.visit('/wp-admin/post-new.php')
    cy.waitForEditor()

    cy.get('body').then(($body) => {
      if ($body.find('.block-editor').length > 0) {
        // Gutenberg
        cy.get('.editor-post-title__input', { timeout: 10000 }).type(draftTitle)
        cy.get('.block-editor-default-block-appender__content').click().type(draftContent)
        
        // Save as draft (Gutenberg auto-saves as draft)
        cy.get('.editor-post-save-draft').click({ force: true })
        cy.contains('Saved', { timeout: 10000 }).should('be.visible')
        
      } else {
        // Classic
        cy.get('#title', { timeout: 10000 }).type(draftTitle)
        cy.get('#content').type(draftContent)
        
        // Save draft button
        cy.get('#save-post').click({ force: true })
        cy.contains('Draft saved', { timeout: 10000 }).should('be.visible')
      }
    })

    // Verify draft appears in All Posts
    cy.visit('/wp-admin/edit.php?post_status=draft')
    cy.contains('td', draftTitle, { timeout: 10000 }).should('be.visible')
  })

  it('Should view post on frontend', () => {
    const postTitle = `Frontend View Post ${Date.now()}`

    cy.createPost(postTitle, 'Content to view on frontend.')
    cy.publishPost()
    cy.wait(2000)

    // Get post URL and visit it
    cy.visit('/wp-admin/edit.php')
    cy.contains('a', postTitle, { timeout: 10000 }).then(($link) => {
      const postUrl = $link.attr('href')
      
      // Extract post ID and construct frontend URL
      const postId = postUrl.match(/post=(\d+)/)?.[1]
      
      if (postId) {
        cy.request({
          method: 'GET',
          url: `/wp-json/wp/v2/posts/${postId}`,
          failOnStatusCode: false
        }).then((response) => {
          if (response.status === 200 && response.body.link) {
            cy.visit(response.body.link)
            
            // Verify post is displayed on frontend
            cy.contains('h1', postTitle, { timeout: 10000 }).should('be.visible')
            cy.contains('Content to view on frontend').should('be.visible')
          }
        })
      }
    })
  })
})

