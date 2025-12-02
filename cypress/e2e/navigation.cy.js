/**
 * Navigation and Search Test Cases
 * 
 * Frontend E2E tests for WordPress navigation and search functionality
 * 
 * Test Cases Covered:
 * - TC-FE-012: Navigation - Menu Navigation
 * - TC-FE-013: Search Functionality
 * - TC-FE-014: Admin Dashboard Access
 */

describe('WordPress Navigation and Search', () => {
  beforeEach(() => {
    // Login before each test
    cy.wpLogin()
  })

  it('TC-FE-012: Should navigate between admin menu items', () => {
    // Navigate to Dashboard
    cy.visit('/wp-admin')
    cy.url().should('include', '/wp-admin')
    cy.get('#wpadminbar').should('be.visible')

    // Navigate to Posts
    cy.visit('/wp-admin/edit.php')
    cy.url().should('include', '/wp-admin/edit.php')
    cy.get('h1').should('contain', 'Posts')

    // Navigate to Pages
    cy.visit('/wp-admin/edit.php?post_type=page')
    cy.url().should('include', '/wp-admin/edit.php?post_type=page')
    cy.get('h1').should('contain', 'Pages')

    // Navigate to Media
    cy.visit('/wp-admin/upload.php')
    cy.url().should('include', '/wp-admin/upload.php')
    cy.get('h1').should('contain', 'Media')

    // Navigate to Comments
    cy.visit('/wp-admin/edit-comments.php')
    cy.url().should('include', '/wp-admin/edit-comments.php')
    cy.get('h1').should('contain', 'Comments')

    // Navigate to Users
    cy.visit('/wp-admin/users.php')
    cy.url().should('include', '/wp-admin/users.php')
    cy.get('h1').should('contain', 'Users')

    // Navigate to Settings
    cy.visit('/wp-admin/options-general.php')
    cy.url().should('include', '/wp-admin/options-general.php')
    cy.get('h1').should('contain', 'General')
  })

  it('TC-FE-013: Should search for posts in admin', () => {
    // Create a test post first
    const searchTerm = `SearchTest${Date.now()}`
    
    cy.visit('/wp-admin/post-new.php')
    cy.waitForEditor()

    cy.get('body').then(($body) => {
      if ($body.find('.block-editor').length > 0) {
        cy.get('.editor-post-title__input', { timeout: 10000 }).type(`Test Post for Search - ${searchTerm}`)
        cy.get('.editor-post-publish-button').click()
        cy.get('.editor-post-publish-panel__header-publish-button button').click()
        cy.contains('Published', { timeout: 15000 }).should('be.visible')
      } else {
        cy.get('#title', { timeout: 10000 }).type(`Test Post for Search - ${searchTerm}`)
        cy.get('#publish').click()
        cy.contains('Post published', { timeout: 15000 }).should('be.visible')
      }
    })

    cy.wait(2000)

    // Navigate to Posts and search
    cy.visit('/wp-admin/edit.php')
    
    // Use search box
    cy.get('#post-search-input', { timeout: 10000 })
      .should('be.visible')
      .type(searchTerm)
    
    cy.get('#search-submit').click()

    // Verify search results
    cy.url().should('include', `s=${searchTerm}`)
    cy.contains('td', searchTerm, { timeout: 10000 }).should('be.visible')
  })

  it('TC-FE-013: Should search for pages in admin', () => {
    const searchTerm = `PageSearch${Date.now()}`

    // Create a test page
    cy.visit('/wp-admin/post-new.php?post_type=page')
    cy.waitForEditor()

    cy.get('body').then(($body) => {
      if ($body.find('.block-editor').length > 0) {
        cy.get('.editor-post-title__input', { timeout: 10000 }).type(`Test Page for Search - ${searchTerm}`)
        cy.get('.editor-post-publish-button').click()
        cy.get('.editor-post-publish-panel__header-publish-button button').click()
        cy.contains('Published', { timeout: 15000 }).should('be.visible')
      } else {
        cy.get('#title', { timeout: 10000 }).type(`Test Page for Search - ${searchTerm}`)
        cy.get('#publish').click()
        cy.contains('Page published', { timeout: 15000 }).should('be.visible')
      }
    })

    cy.wait(2000)

    // Search for the page
    cy.visit('/wp-admin/edit.php?post_type=page')
    cy.get('#post-search-input', { timeout: 10000 }).type(searchTerm)
    cy.get('#search-submit').click()

    // Verify search results
    cy.url().should('include', `s=${searchTerm}`)
    cy.contains('td', searchTerm, { timeout: 10000 }).should('be.visible')
  })

  it('TC-FE-013: Should perform frontend search', () => {
    // Create a test post first
    const searchKeyword = `FrontendSearch${Date.now()}`

    cy.visit('/wp-admin/post-new.php')
    cy.waitForEditor()

    cy.get('body').then(($body) => {
      if ($body.find('.block-editor').length > 0) {
        cy.get('.editor-post-title__input', { timeout: 10000 }).type(`Post Title ${searchKeyword}`)
        cy.get('.block-editor-default-block-appender__content').click().type(`Post content with keyword: ${searchKeyword}`)
        cy.get('.editor-post-publish-button').click()
        cy.get('.editor-post-publish-panel__header-publish-button button').click()
        cy.contains('Published', { timeout: 15000 }).should('be.visible')
      } else {
        cy.get('#title', { timeout: 10000 }).type(`Post Title ${searchKeyword}`)
        cy.get('#content').type(`Post content with keyword: ${searchKeyword}`)
        cy.get('#publish').click()
        cy.contains('Post published', { timeout: 15000 }).should('be.visible')
      }
    })

    cy.wait(3000) // Wait for post to be indexed

    // Visit frontend and search
    cy.visit('/')
    
    // Look for search form (can be in header, sidebar, or widget)
    cy.get('body').then(($body) => {
      // Try different possible search input selectors
      const searchSelectors = [
        'input[name="s"]',
        '.search-form input[type="search"]',
        '#searchform input',
        'form.search-form input',
        'input[placeholder*="Search"]',
        'input[placeholder*="search"]'
      ]

      let searchFound = false
      for (const selector of searchSelectors) {
        if ($body.find(selector).length > 0) {
          cy.get(selector).first().type(searchKeyword + '{enter}')
          searchFound = true
          break
        }
      }

      // If no search form found, try direct search URL
      if (!searchFound) {
        cy.visit(`/?s=${searchKeyword}`)
      }
    })

    // Verify search results page
    cy.url().should('satisfy', (url) => {
      return url.includes('s=') || url.includes('search')
    })

    // Verify search results contain the keyword
    cy.get('body', { timeout: 10000 }).should('contain', searchKeyword)
  })

  it('TC-FE-014: Should access admin dashboard', () => {
    // Visit dashboard
    cy.visit('/wp-admin')
    
    // Verify dashboard loads
    cy.url().should('include', '/wp-admin')
    cy.get('#wpadminbar', { timeout: 10000 }).should('be.visible')
    
    // Verify dashboard elements are present
    cy.get('#wpbody-content', { timeout: 10000 }).should('be.visible')
    
    // Verify welcome panel or dashboard widgets
    cy.get('body').then(($body) => {
      // Dashboard might have welcome panel or widgets
      const hasContent = $body.find('#dashboard-widgets').length > 0 || 
                         $body.find('.welcome-panel').length > 0 ||
                         $body.find('#dashboard-widgets-wrap').length > 0
      
      expect(hasContent).to.be.true
    })
  })

  it('TC-FE-014: Should access all admin sections from dashboard', () => {
    cy.visit('/wp-admin')

    // Test quick access links
    cy.get('body').then(($body) => {
      // Check for common dashboard quick links
      const quickLinks = [
        { text: 'Posts', url: '/wp-admin/edit.php' },
        { text: 'Pages', url: '/wp-admin/edit.php?post_type=page' },
        { text: 'Media', url: '/wp-admin/upload.php' },
        { text: 'Comments', url: '/wp-admin/edit-comments.php' }
      ]

      quickLinks.forEach(link => {
        if ($body.find(`a:contains("${link.text}")`).length > 0) {
          cy.contains('a', link.text).click({ force: true })
          cy.url({ timeout: 10000 }).should('include', link.url)
          cy.go('back')
        }
      })
    })
  })

  it('Should navigate using admin bar', () => {
    // Verify admin bar is visible
    cy.get('#wpadminbar', { timeout: 10000 }).should('be.visible')

    // Test admin bar navigation
    cy.get('#wp-admin-bar-site-name').should('be.visible')
    cy.get('#wp-admin-bar-my-account').should('be.visible')

    // Click site name to go to frontend
    cy.get('#wp-admin-bar-site-name a').first().then(($link) => {
      const href = $link.attr('href')
      if (href && !href.includes('/wp-admin')) {
        cy.get('#wp-admin-bar-site-name a').first().click()
        cy.url().should('not.include', '/wp-admin')
        
        // Verify still logged in (admin bar should be visible on frontend)
        cy.get('#wpadminbar').should('be.visible')
        
        // Navigate back to admin
        cy.visit('/wp-admin')
      }
    })
  })

  it('Should handle navigation breadcrumbs', () => {
    // Navigate to a sub-page
    cy.visit('/wp-admin/edit.php')
    
    // Create a post and edit it
    cy.contains('a', 'Add New').click()
    cy.waitForEditor()

    // Verify we can navigate back
    cy.get('body').then(($body) => {
      // Look for back/cancel links
      if ($body.find('a').text().includes('All Posts') || $body.find('a').text().includes('Cancel')) {
        cy.contains('a', 'All Posts').click({ force: true })
        cy.url().should('include', '/wp-admin/edit.php')
      }
    })
  })

  it('Should perform search with no results', () => {
    const nonExistentTerm = `NonExistentTerm${Date.now()}12345`

    // Search in admin
    cy.visit('/wp-admin/edit.php')
    cy.get('#post-search-input', { timeout: 10000 }).type(nonExistentTerm)
    cy.get('#search-submit').click()

    // Verify "no results" message
    cy.get('body', { timeout: 10000 }).should('satisfy', ($body) => {
      return $body.text().includes('No posts found') || 
             $body.text().includes('No results') ||
             $body.text().includes('not found')
    })
  })
})

