<?php
/**
 * Test Helper Functions
 * 
 * Common utility functions for WordPress tests
 */

if (!function_exists('create_test_user')) {
    /**
     * Create a test user with specified role
     *
     * @param string $username Username for the test user
     * @param string $email Email for the test user
     * @param string $role User role (subscriber, author, editor, administrator)
     * @return int|WP_Error User ID on success, WP_Error on failure
     */
    function create_test_user($username = 'testuser', $email = 'test@example.com', $role = 'subscriber') {
        $user_id = wp_create_user($username, 'testpass123', $email);
        
        if (!is_wp_error($user_id)) {
            $user = new WP_User($user_id);
            $user->set_role($role);
        }
        
        return $user_id;
    }
}

if (!function_exists('delete_test_user')) {
    /**
     * Delete a test user by ID
     *
     * @param int $user_id User ID to delete
     * @return bool True on success, false on failure
     */
    function delete_test_user($user_id) {
        if (!is_multisite()) {
            return wp_delete_user($user_id);
        } else {
            return wpmu_delete_user($user_id);
        }
    }
}

if (!function_exists('create_test_post')) {
    /**
     * Create a test post
     *
     * @param array $args Post arguments
     * @return int|WP_Error Post ID on success, WP_Error on failure
     */
    function create_test_post($args = array()) {
        $defaults = array(
            'post_title' => 'Test Post',
            'post_content' => 'This is a test post content.',
            'post_status' => 'publish',
            'post_author' => 1,
            'post_type' => 'post'
        );
        
        $post_data = wp_parse_args($args, $defaults);
        return wp_insert_post($post_data);
    }
}

if (!function_exists('delete_test_post')) {
    /**
     * Delete a test post by ID
     *
     * @param int $post_id Post ID to delete
     * @param bool $force_delete Whether to bypass trash and force deletion
     * @return WP_Post|false|null Post object on success, false or null on failure
     */
    function delete_test_post($post_id, $force_delete = true) {
        return wp_delete_post($post_id, $force_delete);
    }
}

if (!function_exists('set_wp_die_handler')) {
    /**
     * Set a custom handler for wp_die() calls during testing
     *
     * @param callable $handler Custom handler function
     * @return callable Previous handler
     */
    function set_wp_die_handler($handler) {
        return tests_add_filter('wp_die_handler', $handler);
    }
}

