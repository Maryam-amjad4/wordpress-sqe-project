describe('WordPress User Management', () => {
  const baseUrl = 'http://localhost:8082';
  const username = 'sqeproject'; 
  const password = '12345678ABC1'; 
  
  beforeEach(() => {
    // Login before each test
    cy.session('wpLogin', () => {
      cy.visit(`${baseUrl}/wp-login.php`);
      cy.get('#user_login').clear().type(username, { delay: 50 });
      cy.get('#user_pass').clear().type(password, { delay: 50 });
      cy.get('#wp-submit').click();
      cy.url().should('include', '/wp-admin', { timeout: 10000 });
    });
    
    // Visit users page after login
    cy.visit(`${baseUrl}/wp-admin/users.php`);
  });

  describe('User List Page', () => {
    it('TC1 - should display users list page', () => {
      cy.get('h1.wp-heading-inline').should('contain', 'Users');
      cy.get('table.users').should('be.visible');
    });

    it('TC2 - should navigate to add user page', () => {
      cy.get('a.page-title-action').contains('Add User').click();
      cy.url().should('include', '/wp-admin/user-new.php');
      cy.get('h1#add-new-user').should('contain', 'Add User');
    });

    it('TC3 - should view user profile', () => {
      cy.get('table.users tbody tr').first().trigger('mouseover');
      cy.get('span.view > a').first().click({ force: true });
      cy.url().should('match', /\?author=\d+/);
    });

    it('TC4 - should navigate to edit profile', () => {
      cy.get('table.users tbody tr').first().trigger('mouseover');
      cy.get('span.edit > a').first().click({ force: true });
      cy.url().should('include', '/wp-admin/profile.php');
    });
  });

  describe('Add New User', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/wp-admin/user-new.php`);
    });

    it('TC5 - should display add user form', () => {
      cy.get('#createuser').should('be.visible');
      cy.get('#user_login').should('be.visible');
      cy.get('#email').should('be.visible');
      cy.get('#first_name').should('be.visible');
      cy.get('#last_name').should('be.visible');
    });

    it('TC6 - should create new user with all fields', () => {
      const timestamp = Date.now();
      const username = `testuser${timestamp}`;
      const email = `test${timestamp}@example.com`;

      cy.get('#user_login').clear().type(username, { delay: 50 });
      cy.get('#email').clear().type(email, { delay: 50 });
      cy.get('#first_name').clear().type('Test', { delay: 50 });
      cy.get('#last_name').clear().type('User', { delay: 50 });
      cy.get('#url').clear().type('http://example.com', { delay: 50 });
      
      // Handle password - use auto-generated strong password
      cy.get('button.wp-generate-pw').click();
      cy.get('#pass1').should('be.visible');
      cy.wait(1000); // Wait for password generation and strength check
      
      // Uncheck "send notification" to speed up the process
      cy.get('#send_user_notification').uncheck();
      
      cy.get('#createusersub').click();
      cy.url().should('include', 'users.php', { timeout: 10000 });
    });

    it('TC7 - should select user role', () => {
      cy.get('#role').select('editor');
      cy.get('#role').should('have.value', 'editor');
    });
  });

  describe('Edit User Profile', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/wp-admin/profile.php`);
    });

    it('TC8 - should display profile form', () => {
      cy.get('#your-profile').should('be.visible');
      cy.get('#first_name').should('be.visible');
      cy.get('#last_name').should('be.visible');
      cy.get('#email').should('be.visible');
    });

    it('TC9 - should update profile information', () => {
      cy.get('#first_name').clear().type('Updated');
      cy.get('#last_name').clear().type('Name');
      cy.get('#description').clear().type('Updated bio');
      cy.get('#submit').click();
      cy.url().should('include', 'profile.php');
    });

    it('TC10 - should change admin color scheme', () => {
      cy.get('#admin_color_modern').check();
      cy.get('#admin_color_modern').should('be.checked');
    });

    it('TC11 - should update display name', () => {
      cy.get('#display_name').select(1);
      cy.get('#submit').click();
    });

    it('TC12 - should change language preference', () => {
      cy.get('#locale').select('site-default');
      cy.get('#locale').should('have.value', 'site-default');
    });
  });

  describe('User Actions', () => {
    it('TC13 - should search for users', () => {
      cy.get('#user-search-input').type('admin');
      cy.get('#search-submit').click();
      cy.url().should('include', 's=admin');
    });

    it('TC14 - should change user role via bulk action', () => {
      cy.get('#user_1').check();
      cy.get('#new_role').select('editor');
      cy.get('#changeit').click();
    });

    it('TC15 - should access bulk actions dropdown', () => {
      cy.get('#bulk-action-selector-top').should('be.visible');
      cy.get('#bulk-action-selector-top').select('delete');
      cy.get('#bulk-action-selector-top').should('have.value', 'delete');
    });
  });

  describe('Profile Settings', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/wp-admin/profile.php`);
    });

    it('TC16 - should toggle toolbar visibility', () => {
      cy.get('#admin_bar_front').should('be.visible');
      cy.get('#admin_bar_front').check();
      cy.get('#admin_bar_front').should('be.checked');
    });

    it('TC17 - should toggle syntax highlighting', () => {
      cy.get('#syntax_highlighting').should('be.visible');
    });

    it('TC18 - should toggle keyboard shortcuts', () => {
      cy.get('#comment_shortcuts').should('be.visible');
    });

    it('TC19 - should update biographical info', () => {
      cy.get('#description').clear().type('This is a test biography');
      cy.get('#description').should('have.value', 'This is a test biography');
    });

    it('TC20 - should update website URL', () => {
      cy.get('#url').clear().type('https://example.com');
      cy.get('#url').should('have.value', 'https://example.com');
    });
  });

  describe('Password Management', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/wp-admin/profile.php`);
    });

    it('TC21 - should show password generation button', () => {
      cy.get('button.wp-generate-pw').should('be.visible');
      cy.get('button.wp-generate-pw').should('contain', 'Set New Password');
    });

    it('TC22 - should generate new password', () => {
      cy.get('button.wp-generate-pw').click();
      cy.get('#pass1').should('be.visible');
      cy.get('button.wp-hide-pw').should('be.visible');
    });

    it('TC23 - should show password strength indicator', () => {
      cy.get('button.wp-generate-pw').click();
      cy.get('#pass-strength-result').should('exist');
    });
  });

  describe('User Navigation', () => {
    it('TC24 - should access profile from admin bar', () => {
      cy.get('#wp-admin-bar-my-account').trigger('mouseover');
      cy.wait(300); // Wait for submenu animation
      cy.get('#wp-admin-bar-user-info a').click({ force: true });
      cy.url().should('include', '/wp-admin/profile.php');
    });

    it('TC25 - should navigate between user pages', () => {
      // All Users
      cy.visit(`${baseUrl}/wp-admin/users.php`);
      cy.get('h1').should('contain', 'Users');
      
      // Add User
      cy.visit(`${baseUrl}/wp-admin/user-new.php`);
      cy.get('h1').should('contain', 'Add User');
      
      // Profile
      cy.visit(`${baseUrl}/wp-admin/profile.php`);
      cy.get('h1').should('contain', 'Profile');
    });
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/wp-admin/user-new.php`);
    });

    it('TC26 - should have required fields marked', () => {
      cy.get('label[for="user_login"]').should('contain', 'required');
      cy.get('label[for="email"]').should('contain', 'required');
    });

    it('TC27 - should validate email format', () => {
      cy.get('#email').should('have.attr', 'type', 'email');
    });

    it('TC28 - should validate URL format', () => {
      cy.get('#url').should('have.attr', 'type', 'url');
    });
  });

  describe('User Table Features', () => {
    it('TC29 - should display user table headers', () => {
      cy.get('table.users thead th#username').should('contain', 'Username');
      cy.get('table.users thead th#email').should('contain', 'Email');
      cy.get('table.users thead th#role').should('contain', 'Role');
    });

    it('TC30 - should show user row actions', () => {
      cy.get('table.users tbody tr').first().within(() => {
        cy.get('.row-actions').should('exist');
      });
    });

    it('TC31 - should display user count', () => {
      cy.get('.displaying-num').should('be.visible');
    });
  });

  describe('UI Elements Verification', () => {
    beforeEach(() => {
      cy.visit(`${baseUrl}/wp-admin/profile.php`);
    });

    it('TC32 - should display profile picture section', () => {
      cy.get('.user-profile-picture img').should('be.visible');
    });

    it('TC33 - should show account management section', () => {
      cy.get('h2').contains('Account Management').should('be.visible');
    });

    it('TC34 - should display session management', () => {
      cy.get('.user-sessions-wrap').should('exist');
      cy.get('#destroy-sessions').should('be.visible');
    });

    it('TC35 - should show personal options section', () => {
      cy.get('h2').contains('Personal Options').should('be.visible');
    });

    it('TC36 - should display contact info section', () => {
      cy.get('h2').contains('Contact Info').should('be.visible');
    });
  });
});
