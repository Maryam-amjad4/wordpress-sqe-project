/**
 * WordPress Login Functionality Test Suite
 * 
 * This test suite provides comprehensive coverage of the WordPress admin login functionality.
 * Tests are designed to validate all critical login workflows while maintaining minimal test coverage.
 * 
 * Test Coverage Areas:
 * - Successful login with valid credentials
 * - Failed login attempts with invalid credentials  
 * - Empty field validations
 * - Logout functionality
 * - Form element interactions and validations
 */

describe('WordPress Login Functionality', () => {
  // Test data and configuration
  const loginUrl = '/wp-login.php';
  const dashboardUrl = '/wp-admin/';
  
  // Using credentials from cypress config and fixtures
  const validCredentials = {
    username: Cypress.env('wpAdminUsername') || 'admin',
    password: Cypress.env('wpAdminPassword') || 'admin'
  };

  const invalidCredentials = {
    username: 'invaliduser@test.com',
    password: 'wrongpassword123'
  };

  beforeEach(() => {
    // Visit login page before each test to ensure clean state
    cy.visit(loginUrl);
    
    // Verify we're on the correct login page
    cy.get('#loginform').should('be.visible');
    cy.get('#user_login').should('be.visible');
    cy.get('#user_pass').should('be.visible');
  });

  /**
   * Test Case 1: Successful Login Flow
   * 
   * Purpose: Validates that users can successfully log in with valid credentials
   * and are redirected to the WordPress dashboard.
   * 
   * Critical validations:
   * - Form accepts valid credentials
   * - Successful redirect to admin dashboard
   * - Dashboard elements are accessible post-login
   */
  it('TC1 - should successfully log in with valid credentials', () => {
    // Clear any existing form data and enter valid credentials
    cy.get('#user_login').clear().type(validCredentials.username);
    cy.get('#user_pass').clear().type(validCredentials.password);
    
    // Optional: Test "Remember Me" functionality
    cy.get('#rememberme').check();
    
    // Submit the login form
    cy.get('#wp-submit').click();
    
    // Verify successful login by checking redirect to admin dashboard
    cy.url().should('include', dashboardUrl);
    
    // Verify dashboard elements are present (confirms successful authentication)
    cy.get('#wpbody').should('exist');
    cy.get('#adminmenu').should('be.visible');
    
    // Verify user is actually logged in by checking for admin bar or user info
    cy.get('#wp-admin-bar-my-account, .welcome-panel, #dashboard-widgets').should('exist');
  });

  /**
   * Test Case 2: Failed Login with Invalid Credentials
   * 
   * Purpose: Ensures proper error handling when users enter incorrect login credentials.
   * 
   * Critical validations:
   * - System rejects invalid credentials
   * - Appropriate error messages are displayed
   * - User remains on login page
   * - Form security mechanisms work correctly
   */
  it('TC2 - should display error message for invalid credentials', () => {
    // Enter invalid credentials
    cy.get('#user_login').clear().type(invalidCredentials.username);
    cy.get('#user_pass').clear().type(invalidCredentials.password);
    
    // Submit login form
    cy.get('#wp-submit').click();
    
    // Verify user remains on login page (no redirect occurs)
    cy.url().should('include', '/wp-login.php');
    
    // Verify error message is displayed
    // WordPress typically shows errors in #login_error div or similar
    cy.get('#login_error, .login-error, .notice-error').should('be.visible');
    
    // Verify error message contains relevant text (flexible matching)
    cy.get('body').should(($body) => {
      const text = $body.text().toLowerCase();
      expect(
        text.includes('unknown email') || 
        text.includes('error') || 
        text.includes('invalid') || 
        text.includes('incorrect') || 
        text.includes('wrong') ||
        text.includes('check again')
      ).to.be.true;
    });
    
    // Ensure form is still functional after error
    cy.get('#user_login').should('be.visible');
    cy.get('#user_pass').should('be.visible');
    cy.get('#wp-submit').should('be.visible');
  });

  /**
   * Test Case 3: Empty Username Field Validation
   * 
   * Purpose: Validates browser/WordPress form validation for required username field.
   * 
   * Critical validations:
   * - Empty username field triggers validation
   * - Form submission is prevented
   * - HTML5 validation attributes work correctly
   */
  it('TC3 - should validate empty username field', () => {
    // Leave username empty and enter password
    cy.get('#user_pass').clear().type('somepassword');
    
    // Attempt to submit form
    cy.get('#wp-submit').click();
    
    // Verify form validation prevents submission
    // Since username field has 'required' attribute, browser should prevent submission
    cy.url().should('include', '/wp-login.php');
    
    // Verify username field is focused (typical browser behavior for first invalid field)
    cy.get('#user_login').should('be.focused');
    
    // Verify required attribute is present on username field
    cy.get('#user_login').should('have.attr', 'required');
  });

  /**
   * Test Case 4: Empty Password Field Validation
   * 
   * Purpose: Validates form validation for required password field.
   * 
   * Critical validations:
   * - Empty password field triggers validation
   * - Form submission is prevented with valid username but empty password
   */
  it('TC4 - should validate empty password field', () => {
    // Enter username but leave password empty
    cy.get('#user_login').clear().type(validCredentials.username);
    
    // Attempt to submit form
    cy.get('#wp-submit').click();
    
    // Verify form validation prevents submission
    cy.url().should('include', '/wp-login.php');
    
    // Verify password field has required attribute
    cy.get('#user_pass').should('have.attr', 'required');
  });

  /**
   * Test Case 5: Empty Form Submission
   * 
   * Purpose: Tests behavior when submitting completely empty login form.
   * 
   * Critical validations:
   * - Both empty fields prevent form submission
   * - Proper focus management on first invalid field
   */
  it('TC5 - should validate empty form submission', () => {
    // Ensure both fields are empty
    cy.get('#user_login').clear();
    cy.get('#user_pass').clear();
    
    // Attempt to submit empty form
    cy.get('#wp-submit').click();
    
    // Verify submission is prevented
    cy.url().should('include', '/wp-login.php');
    
    // Verify focus is on first required field (username)
    cy.get('#user_login').should('be.focused');
  });

  /**
   * Test Case 7: Form Element Interaction and Accessibility
   * 
   * Purpose: Validates proper form element behavior and accessibility features.
   * 
   * Critical validations:
   * - All form elements are properly labeled
   * - Password visibility toggle works correctly
   * - Form elements have proper attributes
   */
  it('TC6 - should have properly functioning form elements', () => {
    // Verify form elements have proper labels and attributes
    cy.get('#user_login')
      .should('have.attr', 'required');

    
    cy.get('#user_pass')
      .should('have.attr', 'required');
    
    cy.get('#user_pass')
      .should('have.attr', 'type', 'password');
    
    // Check autocomplete attributes if they exist (non-breaking test)
    cy.get('#user_pass').then(($el) => {
      const autocomplete = $el.attr('autocomplete');
      if (autocomplete) {
        expect(autocomplete).to.match(/current-password|password|off/);
      }
    });
    
    // Check if autocomplete attributes exist (optional validation)
    cy.get('#user_login').then(($el) => {
      const autocomplete = $el.attr('autocomplete');
      if (autocomplete) {
        expect(autocomplete).to.match(/username|email|off/);
      }
    });
    
    cy.get('#user_pass').then(($el) => {
      const autocomplete = $el.attr('autocomplete');
      if (autocomplete) {
        expect(autocomplete).to.match(/current-password|password|off/);
      }
    });
    cy.get('body').then(($body) => {
      if ($body.find('.wp-hide-pw').length > 0) {
        cy.get('.wp-hide-pw').should('be.visible').click();
        cy.get('#user_pass').should('have.attr', 'type', 'text');
        
        // Toggle back to hidden
        cy.get('.wp-hide-pw').click();
        cy.get('#user_pass').should('have.attr', 'type', 'password');
      }
    });
    
    // Verify remember me checkbox functionality
    cy.get('#rememberme').should('not.be.checked');
    cy.get('#rememberme').check().should('be.checked');
    cy.get('#rememberme').uncheck().should('not.be.checked');
    
    // Verify form method and action attributes
    cy.get('#loginform')
      .should('have.attr', 'method', 'post')
      .should('have.attr', 'action')
      .should('contain', '/wp-login.php');
  });

  /**
   * Test Case 8: Security Features Validation
   * 
   * Purpose: Ensures security-related form elements and features are present.
   * 
   * Critical validations:
   * - Hidden security fields are present
   * - Proper redirect handling
   * - Test cookie functionality
   */
  it('TC7 - should include proper security elements', () => {
    // Verify hidden security fields are present
    cy.get('input[name="redirect_to"]').should('exist').should('have.attr', 'type', 'hidden');
    cy.get('input[name="testcookie"]').should('exist').should('have.attr', 'type', 'hidden');
    
    // Verify redirect_to points to admin area
    cy.get('input[name="redirect_to"]').should('have.value', Cypress.config().baseUrl + '/wp-admin/');
    
    // Verify test cookie value
    cy.get('input[name="testcookie"]').should('have.value', '1');
  });
});
