<?php
/**
 * PHPUnit Bootstrap File for WordPress Tests
 * 
 * This file initializes the testing environment for WordPress.
 * It loads WordPress core files and sets up the test database.
 * 
 * Note: For WordPress tests to work, you need either:
 * 1. WordPress running via Docker and WordPress core files accessible
 * 2. wp-phpunit package installed via Composer
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    // Try to load WordPress from Docker volume or wp-phpunit
    $possible_paths = [
        __DIR__ . '/../../wordpress/wp-load.php',  // If WordPress is mounted in Docker
        __DIR__ . '/../vendor/wp-phpunit/wp-phpunit/includes/bootstrap.php', // wp-phpunit
        getenv('WORDPRESS_PATH') . '/wp-load.php', // Environment variable
    ];
    
    $wordpress_loaded = false;
    
    foreach ($possible_paths as $path) {
        if ($path && file_exists($path)) {
            // For wp-load.php
            if (strpos($path, 'wp-load.php') !== false) {
                require_once $path;
                $wordpress_loaded = true;
                break;
            }
            // For wp-phpunit bootstrap
            elseif (strpos($path, 'wp-phpunit') !== false) {
                // This will be handled by wp-phpunit's bootstrap
                define('WP_TESTS_DIR', dirname($path));
                require_once $path;
                $wordpress_loaded = true;
                break;
            }
        }
    }
    
    // If WordPress is not loaded via files, try to connect to Docker WordPress
    if (!$wordpress_loaded) {
        // Check if we're in a Docker environment
        // In Docker, WordPress functions might be available via a test environment
        // For now, we'll define minimal WordPress constants to allow tests to run
        // Note: Tests that actually call WordPress functions will need WordPress loaded
        
        // Define minimal constants if WordPress isn't available
        if (!defined('ABSPATH')) {
            // These tests may need WordPress to be running
            // Users should ensure WordPress is accessible or use wp-phpunit
        }
    }
}

// Include test helper functions
if (file_exists(__DIR__ . '/helpers/test-helpers.php')) {
    require_once __DIR__ . '/helpers/test-helpers.php';
}

