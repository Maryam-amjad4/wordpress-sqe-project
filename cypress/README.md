# Frontend Testing - Cypress E2E Tests

This directory contains Cypress end-to-end tests for WordPress frontend functionality.

## Test Structure

```
cypress/
├── e2e/                    # End-to-end test files
│   ├── login.cy.js         # User login/logout tests
│   ├── posts.cy.js         # Post CRUD operations tests
│   ├── pages.cy.js         # Page management tests
│   └── navigation.cy.js    # Navigation and search tests
├── fixtures/               # Test data fixtures
│   ├── example.json
│   └── test-data.json
├── support/                # Support files and custom commands
│   ├── e2e.js             # Global configuration
│   └── commands.js        # Custom Cypress commands
├── videos/                 # Test execution videos (generated)
├── screenshots/            # Failure screenshots (generated)
└── README.md              # This file
```

## Prerequisites

1. **Node.js and npm**: Required for Cypress
2. **WordPress**: WordPress must be running (via Docker at http://localhost:8082)
3. **Admin Account**: WordPress admin account for testing

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Verify Cypress installation**:
   ```bash
   npx cypress verify
   ```

## Configuration

### Update Test Credentials

Edit `cypress.config.js` to update WordPress credentials:

```javascript
env: {
  wpAdminUsername: 'admin',
  wpAdminPassword: 'your_password',
  wpTestUser: 'testuser',
  wpTestPassword: 'testpass123'
}
```

Or set via environment variables:

```bash
export CYPRESS_wpAdminUsername=admin
export CYPRESS_wpAdminPassword=your_password
```

### Update Base URL

If WordPress is running on a different port or URL, update `baseUrl` in `cypress.config.js`:

```javascript
baseUrl: 'http://localhost:8082',
```

## Running Tests

### Open Cypress Test Runner (Interactive Mode)

```bash
npm run test:open
# or
npx cypress open
```

This opens the Cypress Test Runner where you can:
- Select and run individual tests
- Watch tests execute in real-time
- Debug tests with browser DevTools
- See detailed test output

### Run Tests in Headless Mode (CI/CD)

```bash
npm test
# or
npm run test:headless
# or
npx cypress run
```

This runs all tests headlessly and generates:
- Test results in terminal
- Videos in `cypress/videos/`
- Screenshots on failure in `cypress/screenshots/`

### Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

### Run Tests in Specific Browser

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

## Test Cases Covered

### login.cy.js
- ✅ TC-FE-001: User Login - Valid Credentials
- ✅ TC-FE-002: User Login - Invalid Credentials
- ✅ TC-FE-003: User Logout
- Login session persistence
- Remember Me functionality
- Password recovery link

### posts.cy.js
- ✅ TC-FE-004: Create New Post - Web Interface
- ✅ TC-FE-005: Edit Existing Post
- ✅ TC-FE-006: Delete Post
- Draft post creation
- Frontend post viewing
- Permanent post deletion

### pages.cy.js
- ✅ TC-FE-007: Create New Page
- ✅ TC-FE-008: Edit Existing Page
- ✅ TC-FE-009: Delete Page
- Draft page creation
- Frontend page viewing
- Permanent page deletion

### navigation.cy.js
- ✅ TC-FE-012: Navigation - Menu Navigation
- ✅ TC-FE-013: Search Functionality
- ✅ TC-FE-014: Admin Dashboard Access
- Admin bar navigation
- Frontend search
- Breadcrumb navigation

## Custom Commands

The tests use custom Cypress commands defined in `cypress/support/commands.js`:

### `cy.wpLogin([username], [password])`
Login to WordPress admin dashboard.

```javascript
cy.wpLogin() // Uses credentials from config
cy.wpLogin('admin', 'password') // Custom credentials
```

### `cy.wpLogout()`
Logout from WordPress.

```javascript
cy.wpLogout()
```

### `cy.wpAdminMenu(parentMenu, subMenu)`
Navigate to admin menu item.

```javascript
cy.wpAdminMenu('Posts', 'All Posts')
cy.wpAdminMenu('Settings')
```

### `cy.waitForEditor()`
Wait for WordPress editor (Gutenberg or Classic) to load.

```javascript
cy.waitForEditor()
```

### `cy.createPost(title, content)`
Create a new post via admin interface.

```javascript
cy.createPost('Post Title', 'Post content')
```

### `cy.publishPost()`
Publish the current post.

```javascript
cy.publishPost()
```

### `cy.wpSearch(searchTerm)`
Perform a search (admin or frontend).

```javascript
cy.wpSearch('search term')
```

## Best Practices

1. **Test Isolation**: Each test is independent and cleans up after itself
2. **Unique Test Data**: Uses timestamps to generate unique titles/content
3. **Editor Compatibility**: Tests work with both Gutenberg and Classic editors
4. **Error Handling**: Includes fallback methods for different WordPress configurations
5. **Wait Strategies**: Uses proper waits instead of fixed delays

## Troubleshooting

### Tests Fail to Connect to WordPress

**Issue**: `cy.visit() failed trying to load: http://localhost:8082`

**Solutions**:
- Verify WordPress is running: `docker-compose ps`
- Check `baseUrl` in `cypress.config.js`
- Ensure Docker container is accessible: `curl http://localhost:8082`

### Login Tests Fail

**Issue**: Login form not found or authentication fails

**Solutions**:
- Verify admin credentials in `cypress.config.js`
- Check if WordPress requires different login endpoint
- Ensure WordPress is fully initialized

### Editor Tests Fail

**Issue**: Cannot find editor elements (Gutenberg/Classic)

**Solutions**:
- Tests automatically detect editor type
- Increase `defaultCommandTimeout` in `cypress.config.js` if needed
- Check if WordPress plugins are interfering with editor

### Search Tests Fail

**Issue**: Search form not found or results not displayed

**Solutions**:
- Verify search is enabled in WordPress
- Check if theme has custom search implementation
- Tests include multiple search selectors as fallback

### Timeout Errors

**Issue**: Tests timeout waiting for elements

**Solutions**:
- Increase timeouts in `cypress.config.js`:
  ```javascript
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,
  ```
- Check if WordPress is slow to respond
- Verify database connection

## CI/CD Integration

Cypress tests can be integrated into CI/CD pipelines:

### GitHub Actions Example

```yaml
- name: Run Cypress tests
  run: |
    npm install
    npm run test:headless
```

### Environment Variables

Set test credentials via environment variables in CI:

```bash
CYPRESS_wpAdminUsername=admin
CYPRESS_wpAdminPassword=${{ secrets.WP_ADMIN_PASSWORD }}
```

## Debugging

### Debug in Test Runner

1. Open Cypress: `npm run test:open`
2. Select test file
3. Click on failed test
4. Use browser DevTools to inspect

### Debug in Headless Mode

1. Enable video recording (enabled by default)
2. Check `cypress/videos/` for execution videos
3. Check `cypress/screenshots/` for failure screenshots

### Console Logging

Add debug logs in tests:

```javascript
cy.log('Debug message')
cy.get('element').then(($el) => {
  cy.log($el.text())
})
```

## Test Data

Test data fixtures are available in `cypress/fixtures/`:

- `test-data.json`: Sample users, posts, and pages data
- `example.json`: Example fixture structure

## Next Steps

1. Run tests: `npm run test:open`
2. Update credentials in `cypress.config.js`
3. Customize tests for your WordPress setup
4. Integrate into CI/CD pipeline

## Notes

- Tests are designed to work with default WordPress installation
- Some tests may need adjustment based on active theme/plugins
- Tests clean up created data, but manual cleanup may be needed occasionally
- Tests support both Gutenberg and Classic editors automatically

