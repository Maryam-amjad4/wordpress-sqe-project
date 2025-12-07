/**
 * WordPress Admin Navigation Test Suite
 * 
 * Basic navigation tests for WordPress admin panel.
 * Tests only verify that pages can be accessed and load properly.
 * Does not test detailed functionality within each page.
 * 
 * Test Coverage:
 * - Dashboard navigation to all major admin sections
 * - Basic page loading verification
 * - URL routing validation
 */

describe('WordPress Admin Navigation - Basic Page Access', () => {
  beforeEach(() => {
    // Handle uncaught exceptions from WordPress/Gutenberg
    cy.on('uncaught:exception', (err, runnable) => {
      // Ignore specific WordPress/Gutenberg errors
      if (err.message.includes('Cannot destructure property') || 
          err.message.includes('documentElement') ||
          err.message.includes('wp-polyfill')) {
        return false
      }
      // Don't fail on other JavaScript errors from WordPress
      return false
    })
    
    // Clear any existing session first
    cy.clearCookies()
    cy.clearLocalStorage()
    
    // Manual login with hardcoded credentials to ensure they work
    cy.visit('/wp-login.php')
    cy.get('#user_login', { timeout: 10000 }).should('be.visible').clear().type('sqeproject')
    cy.get('#user_pass', { timeout: 10000 }).should('be.visible').clear().type('12345678ABC1')
    cy.get('#wp-submit').should('be.visible').click()
    
    // Wait for redirect and verify login success
    cy.url({ timeout: 15000 }).should('not.contain', 'wp-login.php')
    cy.url({ timeout: 10000 }).should('include', '/wp-admin')
    cy.get('#wpadminbar', { timeout: 10000 }).should('be.visible')
  })

  /**
   * DASHBOARD NAVIGATION TEST
   * Verify dashboard loads and basic navigation works
   */
  describe('Dashboard Navigation', () => {
    it('TC1 - Should load Dashboard home page', () => {
      cy.visit('/wp-admin/index.php')
      cy.url().should('include', '/wp-admin')
      
      // Verify page loaded successfully
      cy.get('#wpbody-content').should('be.visible')
      cy.get('h1').should('contain', 'Dashboard')
      
      // Verify admin bar is present
      cy.get('#wpadminbar').should('be.visible')
    })

    it('TC2 - Should access Dashboard Updates page', () => {
      cy.visit('/wp-admin/update-core.php')
      cy.url().should('include', '/wp-admin/update-core.php')
      
      // Verify page loaded
      cy.get('#wpbody-content').should('be.visible')
      cy.get('h1').should('contain', 'Update')
    })
  })

  /**
   * POSTS NAVIGATION TEST
   * Basic navigation to posts-related pages
   */
  describe('Posts Navigation', () => {
    it('TC3 - Should navigate to All Posts page', () => {
      cy.visit('/wp-admin/edit.php')
      cy.url().should('include', '/wp-admin/edit.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Posts')
      
      // Verify page loaded
      cy.get('#wpbody-content').should('be.visible')
    })

    it('TC4 - Should navigate to Add Post page', () => {
      cy.visit('/wp-admin/post-new.php')
      cy.url().should('include', '/wp-admin/post-new.php')
      
      // Just verify page loads, don't test editor functionality
      cy.get('body').should('be.visible')
    })

    it('TC5 - Should navigate to Categories page', () => {
      cy.visit('/wp-admin/edit-tags.php?taxonomy=category')
      cy.url().should('include', '/wp-admin/edit-tags.php?taxonomy=category')
      
      // Verify page title
      cy.get('h1').should('contain', 'Categories')
    })

    it('TC6 - Should navigate to Tags page', () => {
      cy.visit('/wp-admin/edit-tags.php?taxonomy=post_tag')
      cy.url().should('include', '/wp-admin/edit-tags.php?taxonomy=post_tag')
      
      // Verify page title
      cy.get('h1').should('contain', 'Tags')
    })
  })

  /**
   * MEDIA NAVIGATION TEST
   * Basic navigation to media pages
   */
  describe('Media Navigation', () => {
    it('TC7 - Should navigate to Media Library', () => {
      cy.visit('/wp-admin/upload.php')
      cy.url().should('include', '/wp-admin/upload.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Media')
    })

    it('TC8 - Should navigate to Add Media page', () => {
      cy.visit('/wp-admin/media-new.php')
      cy.url().should('include', '/wp-admin/media-new.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Upload')
    })
  })

  /**
   * PAGES NAVIGATION TEST
   * Basic navigation to pages section
   */
  describe('Pages Navigation', () => {
    it('TC9 - Should navigate to All Pages', () => {
      cy.visit('/wp-admin/edit.php?post_type=page')
      cy.url().should('include', '/wp-admin/edit.php?post_type=page')
      
      // Verify page title
      cy.get('h1').should('contain', 'Pages')
    })

    it('TC10 - Should navigate to Add Page', () => {
      cy.visit('/wp-admin/post-new.php?post_type=page')
      cy.url().should('include', '/wp-admin/post-new.php?post_type=page')
      
      // Just verify page loads
      cy.get('body').should('be.visible')
    })
  })

  /**
   * COMMENTS NAVIGATION TEST
   */
  describe('Comments Navigation', () => {
    it('TC11 - Should navigate to Comments page', () => {
      cy.visit('/wp-admin/edit-comments.php')
      cy.url().should('include', '/wp-admin/edit-comments.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Comments')
    })
  })

  /**
   * APPEARANCE NAVIGATION TEST
   */
  describe('Appearance Navigation', () => {
    it('TC12 - Should navigate to Themes page', () => {
      cy.visit('/wp-admin/themes.php')
      cy.url().should('include', '/wp-admin/themes.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Themes')
    })

    it('TC13 - Should navigate to Site Editor', () => {
      cy.visit('/wp-admin/site-editor.php')
      cy.url().should('include', '/wp-admin/site-editor.php')
      
      // Just verify page loads (may redirect)
      cy.get('body').should('be.visible')
    })
  })

  /**
   * PLUGINS NAVIGATION TEST
   */
  describe('Plugins Navigation', () => {
    it('TC14 - Should navigate to Plugins page', () => {
      cy.visit('/wp-admin/plugins.php')
      cy.url().should('include', '/wp-admin/plugins.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Plugins')
    })

    it('TC15 - Should navigate to Add Plugins page', () => {
      cy.visit('/wp-admin/plugin-install.php')
      cy.url().should('include', '/wp-admin/plugin-install.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Add Plugins')
    })
  })

  /**
   * USERS NAVIGATION TEST
   */
  describe('Users Navigation', () => {
    it('TC16 - Should navigate to All Users page', () => {
      cy.visit('/wp-admin/users.php')
      cy.url().should('include', '/wp-admin/users.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Users')
    })

    it('TC17 - Should navigate to Add New User page', () => {
      cy.visit('/wp-admin/user-new.php')
      cy.url().should('include', '/wp-admin/user-new.php')
      
      // Verify page loads
      cy.get('body').should('be.visible')
    })

    it('TC18 - Should navigate to Profile page', () => {
      cy.visit('/wp-admin/profile.php')
      cy.url().should('include', '/wp-admin/profile.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Profile')
    })
  })

  /**
   * TOOLS NAVIGATION TEST
   */
  describe('Tools Navigation', () => {
    it('TC19 - Should navigate to Tools page', () => {
      cy.visit('/wp-admin/tools.php')
      cy.url().should('include', '/wp-admin/tools.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Tools')
    })

    it('TC20 - Should navigate to Import page', () => {
      cy.visit('/wp-admin/import.php')
      cy.url().should('include', '/wp-admin/import.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Import')
    })

    it('TC21 - Should navigate to Export page', () => {
      cy.visit('/wp-admin/export.php')
      cy.url().should('include', '/wp-admin/export.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Export')
    })

    it('TC22 - Should navigate to Site Health page', () => {
      cy.visit('/wp-admin/site-health.php')
      cy.url().should('include', '/wp-admin/site-health.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Site Health')
    })

    it('TC23 - Should navigate to Export Personal Data page', () => {
      cy.visit('/wp-admin/export-personal-data.php')
      cy.url().should('include', '/wp-admin/export-personal-data.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Export Personal Data')
    })

    it('TC24 - Should navigate to Erase Personal Data page', () => {
      cy.visit('/wp-admin/erase-personal-data.php')
      cy.url().should('include', '/wp-admin/erase-personal-data.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Erase Personal Data')
    })
  })

  /**
   * SETTINGS NAVIGATION TEST
   */
  describe('Settings Navigation', () => {
    it('TC25 - Should navigate to General Settings', () => {
      cy.visit('/wp-admin/options-general.php')
      cy.url().should('include', '/wp-admin/options-general.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'General Settings')
    })

    it('TC26 - Should navigate to Writing Settings', () => {
      cy.visit('/wp-admin/options-writing.php')
      cy.url().should('include', '/wp-admin/options-writing.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Writing Settings')
    })

    it('TC27 - Should navigate to Reading Settings', () => {
      cy.visit('/wp-admin/options-reading.php')
      cy.url().should('include', '/wp-admin/options-reading.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Reading Settings')
    })

    it('TC28 - Should navigate to Discussion Settings', () => {
      cy.visit('/wp-admin/options-discussion.php')
      cy.url().should('include', '/wp-admin/options-discussion.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Discussion Settings')
    })

    it('TC29 - Should navigate to Media Settings', () => {
      cy.visit('/wp-admin/options-media.php')
      cy.url().should('include', '/wp-admin/options-media.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Media Settings')
    })

    it('TC30 - Should navigate to Permalinks Settings', () => {
      cy.visit('/wp-admin/options-permalink.php')
      cy.url().should('include', '/wp-admin/options-permalink.php')
      
      // Verify page title
      cy.get('h1').should('contain', 'Permalink Settings')
    })

    it('TC31 - Should navigate to Privacy Settings', () => {
      cy.visit('/wp-admin/options-privacy.php')
      cy.url().should('include', '/wp-admin/options-privacy.php')
      
      // Verify page title contains "Privacy"
      cy.get('h1').should('contain', 'Privacy')
    })
  })

  /**
   * ADMIN MENU NAVIGATION TEST
   * Verify the main admin menu is functional
   */
  describe('Admin Menu Navigation', () => {
    it('TC32 - Should verify admin menu sidebar is present', () => {
      cy.visit('/wp-admin')
      
      // Verify admin menu exists
      cy.get('#adminmenu').should('be.visible')
      
      // Verify key menu items are present
      cy.get('#menu-dashboard').should('be.visible')
      cy.get('#menu-posts').should('be.visible')
      cy.get('#menu-media').should('be.visible')
      cy.get('#menu-pages').should('be.visible')
      cy.get('#menu-comments').should('be.visible')
      cy.get('#menu-appearance').should('be.visible')
      cy.get('#menu-plugins').should('be.visible')
      cy.get('#menu-users').should('be.visible')
      cy.get('#menu-tools').should('be.visible')
      cy.get('#menu-settings').should('be.visible')
    })

    it('TC33 - Should verify admin bar is present', () => {
      cy.visit('/wp-admin')
      
      // Verify admin bar
      cy.get('#wpadminbar').should('be.visible')
      
      // Verify key admin bar elements
      cy.get('#wp-admin-bar-wp-logo').should('be.visible')
      cy.get('#wp-admin-bar-site-name').should('be.visible')
      cy.get('#wp-admin-bar-my-account').should('be.visible')
    })
  })
})

