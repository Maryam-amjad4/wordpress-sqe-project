# Backend Testing - PHPUnit Tests

This directory contains PHPUnit tests for WordPress backend functionality.

## Test Structure

```
tests/
├── unit/                  # Unit tests for individual functions/classes
│   ├── UserTest.php       # User authentication and management tests
│   ├── PostTest.php       # Post CRUD operation tests
│   └── DatabaseTest.php   # Database query tests
├── integration/           # Integration tests
│   ├── APITest.php        # REST API endpoint tests
│   └── AuthenticationTest.php  # Authentication flow tests
├── helpers/               # Test helper functions
│   └── test-helpers.php   # Common utility functions
├── bootstrap.php          # PHPUnit bootstrap file
└── README.md              # This file
```

## Prerequisites

1. **PHPUnit**: Should be installed via Composer (`composer install`)
2. **WordPress**: WordPress must be running (via Docker) or WordPress core files must be accessible
3. **Database**: Test database configured (see phpunit.xml for database settings)

## Configuration

### Database Configuration

Edit `phpunit.xml` to configure your test database:

```xml
<env name="WP_TESTS_DB_NAME" value="wordpress_test"/>
<env name="WP_TESTS_DB_USER" value="wordpress"/>
<env name="WP_TESTS_DB_PASSWORD" value="wordpress"/>
<env name="WP_TESTS_DB_HOST" value="localhost"/>
```

### WordPress Setup

For tests to work properly, you need WordPress available. Options:

1. **Docker Setup** (Recommended):
   ```bash
   docker-compose up -d
   ```
   WordPress will be available at http://localhost:8082

2. **wp-phpunit** (Alternative):
   The `wp-phpunit` package is included in `composer.json`. It provides WordPress test framework.

## Running Tests

### Run All Tests
```bash
./vendor/bin/phpunit
```

### Run Specific Test Suite
```bash
# Unit tests only
./vendor/bin/phpunit --testsuite "Unit Tests"

# Integration tests only
./vendor/bin/phpunit --testsuite "Integration Tests"
```

### Run Specific Test File
```bash
./vendor/bin/phpunit tests/unit/UserTest.php
```

### Run Specific Test Method
```bash
./vendor/bin/phpunit --filter test_user_authentication_with_valid_credentials
```

### Generate Coverage Report
```bash
composer test:coverage
# or
./vendor/bin/phpunit --coverage-html coverage
```

Coverage report will be generated in `coverage/` directory.

## Test Cases Covered

### Unit Tests

#### UserTest.php
- ✅ TC-BE-001: User Authentication - Login (Valid Credentials)
- ✅ TC-BE-002: User Authentication - Invalid Credentials
- User creation, retrieval, deletion
- Password hashing and verification

#### PostTest.php
- ✅ TC-BE-003: Post Creation - Create New Post
- ✅ TC-BE-004: Post Update - Edit Existing Post
- ✅ TC-BE-005: Post Deletion - Delete Post
- Post retrieval, status validation, excerpt handling

#### DatabaseTest.php
- ✅ TC-BE-008: Database Query - Retrieve Posts
- WP_Query functionality
- Post status filtering
- Query performance testing
- Direct database queries

### Integration Tests

#### AuthenticationTest.php
- Complete login/logout flows
- Session management
- User capabilities
- Multiple login attempts
- Different user roles

#### APITest.php
- ✅ TC-BE-006: REST API - Get Posts Endpoint
- ✅ TC-BE-007: REST API - Create Post via API
- Single post retrieval
- Post updates via API
- Post deletion via API
- API authentication
- Pagination
- Error handling

## Writing New Tests

### Test Class Structure

```php
<?php
namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class MyTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        // Setup test data
    }

    protected function tearDown(): void
    {
        // Cleanup test data
        parent::tearDown();
    }

    public function test_something()
    {
        // Test implementation
        $this->assertTrue(true);
    }
}
```

### Best Practices

1. **Isolation**: Each test should be independent and not rely on other tests
2. **Cleanup**: Always clean up test data in `tearDown()`
3. **Assertions**: Use appropriate assertion methods
4. **Naming**: Use descriptive test method names that explain what is being tested
5. **Test Data**: Create fresh test data in `setUp()` rather than reusing

## Troubleshooting

### Tests Fail to Load WordPress Functions

**Issue**: `Call to undefined function wp_insert_post()`

**Solution**: 
- Ensure WordPress is running via Docker
- Or ensure wp-phpunit is properly installed: `composer install`
- Check that bootstrap.php can locate WordPress files

### Database Connection Errors

**Issue**: `Error establishing a database connection`

**Solution**:
- Verify Docker containers are running: `docker-compose ps`
- Check database credentials in `phpunit.xml`
- Ensure database is accessible from test environment

### Tests Run but Fail

**Issue**: Tests execute but assertions fail

**Solution**:
- Check test output for specific error messages
- Verify test data is being created correctly
- Ensure WordPress functions are working as expected
- Check if WordPress is properly initialized

## CI/CD Integration

These tests are designed to run in CI/CD pipelines. The test configuration in `phpunit.xml` is optimized for automated environments.

For GitHub Actions, tests will run automatically when configured in `.github/workflows/ci.yml`.

## Test Coverage Goals

- **Unit Tests**: 70%+ coverage on critical paths
- **Integration Tests**: All critical user flows covered
- **API Tests**: All REST API endpoints covered

## Notes

- Tests use isolated test data to prevent interference
- Each test creates its own users/posts and cleans up after
- Tests are designed to run in any order (test isolation)
- Some tests require WordPress to be fully initialized

