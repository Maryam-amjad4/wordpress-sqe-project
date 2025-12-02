# Test Setup Instructions

## Quick Setup for Running Tests

### Option 1: Using wp-phpunit (Recommended for Local Development)

The project includes `wp-phpunit` which provides WordPress test framework:

1. **Install Dependencies**:
   ```bash
   composer install
   ```

2. **Run Tests**:
   ```bash
   ./vendor/bin/phpunit
   ```

### Option 2: Running Tests in Docker Container

If WordPress is running via Docker, you can run tests inside the container:

1. **Enter the WordPress container**:
   ```bash
   docker exec -it wordpress-sqe bash
   ```

2. **Navigate to project directory** (if mounted) or install dependencies inside container

3. **Run tests**:
   ```bash
   ./vendor/bin/phpunit
   ```

### Option 3: Using Local WordPress Installation

If you have WordPress installed locally:

1. **Set WordPress path**:
   ```bash
   export WORDPRESS_PATH=/path/to/wordpress
   ```

2. **Update phpunit.xml** with correct database credentials

3. **Run tests**:
   ```bash
   ./vendor/bin/phpunit
   ```

## Test Database Setup

Tests require a separate test database. Update `phpunit.xml` with your test database credentials:

```xml
<env name="WP_TESTS_DB_NAME" value="wordpress_test"/>
<env name="WP_TESTS_DB_USER" value="wordpress"/>
<env name="WP_TESTS_DB_PASSWORD" value="wordpress"/>
<env name="WP_TESTS_DB_HOST" value="localhost"/>
```

**Note**: For Docker setup, use `db` as the hostname instead of `localhost` if running tests inside the container.

## Troubleshooting

### WordPress Functions Not Available

If you see errors like "Call to undefined function wp_insert_post()":

1. Ensure WordPress is loaded in bootstrap.php
2. Check that WordPress files are accessible
3. Verify wp-phpunit is properly installed

### Database Connection Issues

1. Verify database is running: `docker-compose ps`
2. Check database credentials in phpunit.xml
3. Ensure test database exists (create it if needed)

### Tests Fail Due to Missing Data

Some tests require WordPress to be set up with initial data. Ensure:
- WordPress is installed and configured
- Database is initialized
- Test users/posts can be created

## Next Steps

After setting up, you can:
- Run all tests: `./vendor/bin/phpunit`
- Run specific test suite: `./vendor/bin/phpunit --testsuite "Unit Tests"`
- Generate coverage: `composer test:coverage`

