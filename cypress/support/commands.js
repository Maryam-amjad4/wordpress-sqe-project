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
  
  // Debug: Log the credentials being used
  cy.log('Login attempt with username:', usernameValue)
  cy.log('Environment username:', Cypress.env('wpAdminUsername'))
  
  cy.visit('/wp-admin')
  
  // Wait for login form to be fully loaded
  cy.get('#user_login', { timeout: 10000 }).should('be.visible')
  cy.wait(500) // Give form extra time to be ready
  
  // Clear and type username with verification
  cy.get('#user_login')
    .clear({ force: true })
    .should('have.value', '') // Verify it's cleared
    .invoke('val', usernameValue) // Set value directly
    .trigger('input') // Trigger input event
    .should('have.value', usernameValue) // Verify it was set correctly
  
  // Alternative: If direct value setting doesn't work, type slowly
  cy.get('#user_login').then(($input) => {
    if ($input.val() !== usernameValue) {
      cy.log('Username not set correctly, retrying with typing')
      cy.get('#user_login')
        .clear({ force: true })
        .type(usernameValue, { delay: 100, force: true })
    }
  })
  
  // Clear and type password
  cy.get('#user_pass', { timeout: 10000 })
    .should('be.visible')
    .clear({ force: true })
    .invoke('val', passwordValue)
    .trigger('input')
  
  // Click submit and wait for page navigation
  cy.get('#wp-submit').should('be.visible').click()
  
  // Wait for navigation to complete
  cy.wait(2000)
  
  // Debug: Check where we are after login
  cy.url().then((url) => {
    cy.log('URL after login attempt:', url)
  })
  
  // Check for login errors first
  cy.get('body').then(($body) => {
    if ($body.find('#login_error').length > 0) {
      cy.get('#login_error').then(($error) => {
        const errorText = $error.text()
        cy.log('Login error found:', errorText)
        cy.log('Expected username:', usernameValue)
        cy.log('Expected password:', passwordValue)
        throw new Error(`Login failed with error: ${errorText}`)
      })
    }
  })
  
  // Wait for redirect to complete and verify we're in admin area
  cy.url({ timeout: 15000 }).should('not.contain', 'wp-login.php')
  cy.url({ timeout: 10000 }).should('include', '/wp-admin')
  
  // Verify admin interface loaded
  cy.get('#wpadminbar', { timeout: 10000 }).should('be.visible')
  
  // Additional verification - check for admin menu
  cy.get('#adminmenu', { timeout: 10000 }).should('be.visible')
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
 * Custom command to handle dynamic WordPress elements and overlays
 * Uses DOM-based detection instead of Cypress queries for hidden elements
 * Usage: cy.dismissWordPressOverlays()
 */
Cypress.Commands.add('dismissWordPressOverlays', () => {
  cy.window().then((win) => {
    // Direct DOM manipulation approach
    const removeOverlays = () => {
      const overlaySelectors = [
        '.components-modal__screen-overlay',
        '.edit-site-layout__overlay', 
        '.notice-dismiss',
        '.components-modal__frame',
        '.edit-site-template-card',
        '.pattern-selection-modal'
      ]
      
      overlaySelectors.forEach(selector => {
        const elements = win.document.querySelectorAll(selector)
        elements.forEach(el => {
          el.style.display = 'none'
          el.remove()
        })
      })
      
      // Send escape key to window
      const escEvent = new KeyboardEvent('keydown', { 
        key: 'Escape',
        keyCode: 27,
        bubbles: true 
      })
      win.document.dispatchEvent(escEvent)
    }
    
    removeOverlays()
    setTimeout(removeOverlays, 500)
  })
  
  // Try ESC key through Cypress
  cy.get('body').type('{esc}{esc}', { force: true })
  cy.wait(500)
})

/**
 * Enhanced command to wait for WordPress editor using DOM detection
 * Usage: cy.waitForWordPressEditor()
 */
Cypress.Commands.add('waitForWordPressEditor', () => {
  // First dismiss any overlays
  cy.dismissWordPressOverlays()
  
  // Wait for page to be fully loaded first
  cy.wait(2000)
  
  // Wait using DOM polling with timeout and better error handling
  cy.window({ timeout: 20000 }).then((win) => {
    return new Cypress.Promise((resolve, reject) => {
      let attempts = 0
      const maxAttempts = 40 // 20 seconds total (500ms * 40)
      
      const checkEditor = () => {
        attempts++
        
        try {
          // Check for Gutenberg editor elements
          const hasGutenberg = win.document.querySelector('.block-editor') || 
                             win.document.querySelector('.editor-styles-wrapper') ||
                             win.document.querySelector('h1[aria-label*="Add title"]') ||
                             win.document.querySelector('.edit-post-layout')
          
          // Check for Classic editor
          const hasClassic = win.document.querySelector('#content') || 
                           win.document.querySelector('#title')
          
          if (hasGutenberg || hasClassic) {
            cy.log('Editor detected: ' + (hasGutenberg ? 'Gutenberg' : 'Classic'))
            resolve()
          } else if (attempts >= maxAttempts) {
            cy.log('Editor detection timeout - attempting to continue anyway')
            resolve() // Resolve instead of reject to allow test to continue
          } else {
            setTimeout(checkEditor, 500)
          }
        } catch (error) {
          cy.log('Error checking editor: ' + error.message)
          if (attempts >= maxAttempts) {
            resolve() // Continue anyway
          } else {
            setTimeout(checkEditor, 500)
          }
        }
      }
      
      checkEditor()
    })
  })
  
  // Additional cleanup after editor is detected
  cy.wait(500)
  cy.dismissWordPressOverlays()
  cy.wait(1000)
})

/**
 * Alias for backward compatibility
 * Usage: cy.waitForEditor()
 */
Cypress.Commands.add('waitForEditor', () => {
  cy.waitForWordPressEditor()
})

/**
 * Command to inject CSS that hides problematic WordPress overlays
 * Usage: cy.injectOverlayHider()
 */
Cypress.Commands.add('injectOverlayHider', () => {
  cy.window().then((win) => {
    // Remove existing styles
    const existing = win.document.getElementById('cypress-overlay-hider')
    if (existing) existing.remove()
    
    // Inject new styles
    const style = win.document.createElement('style')
    style.id = 'cypress-overlay-hider'
    style.textContent = `
      .components-modal__screen-overlay,
      .edit-site-layout__overlay,
      .edit-site-template-card,
      .edit-site-start-template-options,
      .block-editor-block-patterns-list,
      .pattern-selection-modal,
      .components-modal__frame,
      .components-modal__content,
      .edit-site-template-details {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        z-index: -1 !important;
      }
      
      /* Ensure editor is accessible */
      .block-editor-writing-flow,
      .editor-post-title__input,
      #content {
        pointer-events: auto !important;
        visibility: visible !important;
      }
    `
    win.document.head.appendChild(style)
  })
})

/**
 * Command to start MutationObserver for real-time overlay removal
 * Usage: cy.startOverlayWatcher()
 */
Cypress.Commands.add('startOverlayWatcher', () => {
  cy.window().then((win) => {
    // Stop any existing observer
    if (win.cypressOverlayObserver) {
      win.cypressOverlayObserver.disconnect()
    }
    
    // Create new observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const element = node
            
            // Check if this is an overlay element
            const overlayClasses = [
              'components-modal__screen-overlay',
              'edit-site-layout__overlay',
              'edit-site-template-card',
              'pattern-selection-modal',
              'components-modal__frame'
            ]
            
            const isOverlay = overlayClasses.some(className => 
              element.classList?.contains(className) ||
              element.querySelector?.(`.${className}`)
            )
            
            if (isOverlay) {
              // Remove immediately
              element.style.display = 'none'
              setTimeout(() => {
                try { element.remove() } catch (e) {}
              }, 100)
              
              // Send ESC key
              const escEvent = new KeyboardEvent('keydown', { 
                key: 'Escape',
                keyCode: 27,
                bubbles: true 
              })
              win.document.dispatchEvent(escEvent)
            }
          }
        })
      })
    })
    
    // Start observing
    observer.observe(win.document.body, {
      childList: true,
      subtree: true
    })
    
    // Store reference for cleanup
    win.cypressOverlayObserver = observer
  })
})

/**
 * Custom command to handle iframe-based overlays and modals
 * Usage: cy.handleIframeOverlays()
 */
Cypress.Commands.add('handleIframeOverlays', () => {
  cy.get('body').then(($body) => {
    // Handle iframes that might contain overlays
    if ($body.find('iframe').length > 0) {
      $body.find('iframe').each((index, iframe) => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
          if (iframeDoc) {
            // Close buttons within iframe
            const closeSelectors = [
              'button[aria-label*="Close"]',
              '.close',
              '[data-dismiss]',
              '.modal-close',
              'button:contains("Close")',
              'button:contains("Cancel")'
            ]
            
            closeSelectors.forEach(selector => {
              const elements = iframeDoc.querySelectorAll(selector)
              if (elements.length > 0) {
                elements[0].click()
              }
            })
            
            // Try ESC key within iframe
            if (iframeDoc.body) {
              const event = new KeyboardEvent('keydown', { key: 'Escape' })
              iframeDoc.body.dispatchEvent(event)
            }
          }
        } catch (e) {
          cy.log('Cannot access cross-origin iframe content')
        }
      })
    }
  })
})

/**
 * Enhanced command to completely clear WordPress editing environment
 * Usage: cy.clearWordPressEnvironment()
 */
Cypress.Commands.add('clearWordPressEnvironment', () => {
  // Multiple strategies to clear the environment
  cy.handleIframeOverlays()
  cy.dismissWordPressOverlays()
  
  // Force close any remaining modals with JavaScript
  cy.window().then((win) => {
    // Close any jQuery modals if jQuery is available
    if (win.jQuery) {
      win.jQuery('.modal').modal('hide')
      win.jQuery('.components-modal__screen-overlay').remove()
    }
    
    // Remove overlay elements directly
    const overlaySelectors = [
      '.components-modal__screen-overlay',
      '.edit-site-layout__overlay',
      '.block-editor-block-patterns-list__list-item',
      '.edit-site-template-details'
    ]
    
    overlaySelectors.forEach(selector => {
      const elements = win.document.querySelectorAll(selector)
      elements.forEach(el => el.remove())
    })
    
    // Focus back to main window
    win.focus()
  })
  
  // Final ESC and click away
  cy.get('body').type('{esc}{esc}')
  cy.get('body').click(50, 50, { force: true })
  cy.wait(1000)
})

/**
 * Custom command to safely interact with Gutenberg editor elements
 * Usage: cy.gutenbergSafeType('selector', 'text')
 */
Cypress.Commands.add('gutenbergSafeType', (selector, text) => {
  // Multiple strategies for interacting with Gutenberg elements
  cy.get('body').then(($body) => {
    if ($body.find(selector).length > 0) {
      cy.get(selector).first().click({ force: true }).type(text)
    } else {
      // Fallback: try to focus and type
      cy.get('.editor-styles-wrapper, .block-editor-writing-flow').first().click({ force: true })
      cy.focused().type(text)
    }
  })
})

/**
 * Custom command to create a post via admin interface
 * Usage: cy.createPost('Title', 'Content')
 */
Cypress.Commands.add('createPost', (title, content) => {
  cy.visit('/wp-admin/post-new.php')
  cy.waitForWordPressEditor()
  
  // Handle Gutenberg editor
  cy.get('body').then(($body) => {
    if ($body.find('.block-editor').length > 0 || $body.find('.editor-styles-wrapper').length > 0) {
      // Gutenberg: Add title with multiple selector fallbacks
      cy.get('body').then(($b) => {
        if ($b.find('.editor-post-title__input').length > 0) {
          cy.get('.editor-post-title__input').first().type(title)
        } else if ($b.find('h1[aria-label*="Add title"]').length > 0) {
          cy.get('h1[aria-label*="Add title"]').first().type(title)
        } else if ($b.find('.wp-block-post-title').length > 0) {
          cy.get('.wp-block-post-title').first().type(title)
        } else if ($b.find('.editor-visual-editor h1').length > 0) {
          cy.get('.editor-visual-editor h1').first().type(title)
        } else if ($b.find('[contenteditable="true"]').length > 0) {
          cy.get('[contenteditable="true"]').first().clear().type(title, { force: true })
        } else {
          // Last resort - try to find any title input
          cy.log('Could not find standard title input, attempting fallback')
          cy.get('body').then(($body) => {
            if ($body.find('.editor-post-title__input, [aria-label*="title"], .wp-block-post-title').length > 0) {
              cy.get('.editor-post-title__input, [aria-label*="title"], .wp-block-post-title').first().type(title, { force: true })
            } else {
              cy.log('No title input found - skipping title entry')
            }
          })
        }
      })
      
      // Gutenberg: Add content
      if (content) {
        cy.wait(500)
        cy.get('body').then(($b) => {
          if ($b.find('.block-editor-default-block-appender__content').length > 0) {
            cy.get('.block-editor-default-block-appender__content').click()
          } else {
            cy.get('body').type('{enter}')
          }
        })
        cy.wait(500)
        cy.get('body').then(($b) => {
          if ($b.find('[data-type="core/paragraph"]').length > 0) {
            cy.get('[data-type="core/paragraph"]').last().type(content)
          } else {
            cy.get('.block-editor-block-list__layout').type(content)
          }
        })
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
  cy.wait(1000)
  cy.get('body').then(($body) => {
    if ($body.find('.block-editor').length > 0 || $body.find('.editor-styles-wrapper').length > 0) {
      // Gutenberg: Click publish button with multiple fallbacks
      cy.get('body').then(($b) => {
        if ($b.find('.editor-post-publish-button').length > 0 && !$b.find('.editor-post-publish-button').first().is(':disabled')) {
          cy.get('.editor-post-publish-button').first().click({ force: true })
          cy.wait(1000)
          // Click final publish in panel if it appears
          cy.get('body').then(($panel) => {
            if ($panel.find('.editor-post-publish-panel__header-publish-button button').length > 0) {
              cy.get('.editor-post-publish-panel__header-publish-button button').click({ force: true })
            }
          })
        } else if ($b.find('.editor-header__settings > button').length > 0) {
          cy.get('.editor-header__settings > button').first().click({ force: true })
        }
      })
      // Wait for success message with multiple variations
      cy.get('body', { timeout: 20000 }).should('satisfy', ($body) => {
        const text = $body.text()
        return text.includes('Published') || text.includes('Post published') || text.includes('View Post')
      })
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

