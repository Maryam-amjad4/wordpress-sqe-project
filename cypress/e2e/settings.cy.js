describe('WordPress Settings Tests', () => {
  beforeEach(() => {
    // Login before each test - authenticates user session
    cy.wpLogin();
  });

  describe('General Settings', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8082/wp-admin/options-general.php');
    });

    it('TC1 - should update site title and tagline', () => {
      cy.get('#blogname').clear().type('Test Site');
      cy.get('#blogdescription').clear().type('Test Tagline');
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });

    it('TC2 - should update administration email', () => {
      cy.get('#new_admin_email').clear().type('test@example.com');
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });

    it('TC3 - should change timezone', () => {
      cy.get('#timezone_string').select('America/New_York');
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });
  });

  describe('Writing Settings', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8082/wp-admin/options-writing.php');
    });

    it('TC4 - should update default post category', () => {
      cy.get('#default_category').select('1');
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });

    it('TC5 - should update default post format', () => {
      cy.get('#default_post_format').select('0');
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });
  });

  describe('Reading Settings', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8082/wp-admin/options-reading.php');
    });

    it('TC6 - should update posts per page', () => {
      cy.get('#posts_per_page').clear().type('15');
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });

    it('TC7 - should toggle search engine visibility', () => {
      cy.get('#blog_public').check();
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });

    it('TC8 - should update RSS feed items', () => {
      cy.get('#posts_per_rss').clear().type('15');
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });
  });

  describe('Discussion Settings', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8082/wp-admin/options-discussion.php');
    });

    it('TC9 - should toggle default comment settings', () => {
      cy.get('#default_comment_status').check();
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });

    it('TC10 - should require name and email for comments', () => {
      cy.get('#require_name_email').check();
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });

    it('TC11 - should enable threaded comments', () => {
      cy.get('#thread_comments').check();
      cy.get('#thread_comments_depth').select('5');
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });

    it('TC12 - should toggle avatar display', () => {
      cy.get('#show_avatars').check();
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });
  });

  describe('Media Settings', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8082/wp-admin/options-media.php');
    });

    it('TC13 - should update thumbnail dimensions', () => {
      cy.get('#thumbnail_size_w').clear().type('200');
      cy.get('#thumbnail_size_h').clear().type('200');
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });

    it('TC14 - should update medium image size', () => {
      cy.get('#medium_size_w').clear().type('400');
      cy.get('#medium_size_h').clear().type('400');
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });

    it('TC15 - should toggle upload folder organization', () => {
      cy.get('#uploads_use_yearmonth_folders').check();
      cy.get('#submit').click();
      cy.contains('Settings saved').should('be.visible');
    });
  });

  describe('Permalink Settings', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8082/wp-admin/options-permalink.php');
    });

    it('TC16 - should select post name permalink structure', () => {
      cy.get('#permalink-input-post-name').check();
      cy.get('#submit').click();
      cy.contains('Permalink structure updated').should('be.visible');
    });

    it('TC17 - should select day and name permalink structure', () => {
      cy.get('#permalink-input-day-name').check();
      cy.get('#submit').click();
      cy.contains('Permalink structure updated').should('be.visible');
    });

    it('TC18 - should update category base', () => {
      cy.get('#category_base').clear().type('topics');
      cy.get('#submit').click();
      cy.contains('Permalink structure updated').should('be.visible');
    });

    it('TC19 - should update tag base', () => {
      cy.get('#tag_base').clear().type('tags');
      cy.get('#submit').click();
      cy.contains('Permalink structure updated').should('be.visible');
    });

    it('TC20 - should set custom permalink structure', () => {
      cy.get('#custom_selection').check();
      cy.get('#permalink_structure').clear().type('/%year%/%postname%/');
      cy.get('#submit').click();
      cy.contains('Permalink structure updated').should('be.visible');
    });
  });
});
