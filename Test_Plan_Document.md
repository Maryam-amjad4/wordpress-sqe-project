//phase 2 report

# Test Plan Document
## WordPress CI/CD Quality Engineering Project

**Document Version:** 1.0  
**Date:** November 30, 2025  
**Prepared By:** Member 1  
**Project:** WordPress CI/CD Quality Engineering Project  
**Phase:** Phase 2 - Test Plan Development

---

## 1. Introduction

### 1.1 Purpose
This document describes the test plan for the WordPress CI/CD Quality Engineering Project. It outlines the testing strategy, scope, approach, and resources required to ensure comprehensive quality assurance of WordPress application through automated and manual testing.

### 1.2 Scope
This test plan covers:
- Functional testing (Backend and Frontend)
- Non-functional testing (Performance, Security, Accessibility)
- Unit testing
- Integration testing
- API testing

### 1.3 Document Structure
This document follows IEEE 829 Standard for Software Test Documentation and includes:
- Test Objectives
- Test Scope
- Test Techniques
- Test Tools
- Test Environment
- Test Cases
- Test Data

---

## 2. Test Objectives

### 2.1 Primary Objectives
- Verify WordPress core functionality works correctly
- Ensure user authentication and authorization are secure
- Validate CRUD operations for posts and pages
- Test REST API endpoints for proper functionality
- Verify database operations and data integrity
- Test frontend user interface and user interactions
- Validate non-functional requirements (performance, security, accessibility)

### 2.2 Success Criteria
- All critical test cases pass
- Test coverage of at least 70% for critical paths
- No critical or high-severity bugs in production
- All automated tests integrated into CI/CD pipeline

---

## 3. Test Scope

### 3.1 In Scope

#### 3.1.1 Functional Testing

**Backend (White-box Testing):**
- User authentication functions (login, logout, password reset)
- Post CRUD operations (Create, Read, Update, Delete)
- Page CRUD operations (Create, Read, Update, Delete)
- Database queries and operations
- WordPress hooks and filters
- REST API endpoints
- Plugin/Theme activation and deactivation

**Frontend (Black-box Testing):**
- User login/logout functionality
- Post creation, editing, and deletion
- Page creation, editing, and deletion
- User registration process
- Comment submission and management
- Navigation between pages
- Search functionality
- Admin dashboard access and functionality

#### 3.1.2 Non-Functional Testing
- **Performance Testing:**
  - Page load times
  - Response times for API endpoints
  - Database query performance
  
- **Security Testing:**
  - SQL injection vulnerabilities
  - Cross-site scripting (XSS) vulnerabilities
  - Authentication and authorization security
  - Input validation
  
- **Accessibility Testing:**
  - WCAG 2.1 compliance
  - Keyboard navigation
  - Screen reader compatibility

#### 3.1.3 Integration Testing
- REST API integration
- Database integration
- WordPress core integration with plugins/themes

### 3.2 Out of Scope
- Third-party plugin testing (except default plugins)
- Theme customization testing
- Multi-site WordPress configuration
- WordPress core code modification testing

---

## 4. Test Techniques

### 4.1 Manual Testing
- Exploratory testing
- Usability testing
- Accessibility testing
- Security testing (manual penetration testing)

### 4.2 Automated Testing
- Unit testing (PHPUnit)
- Integration testing (PHPUnit)
- End-to-end testing (Cypress)
- API testing (PHPUnit/Postman)
- Performance testing (automated tools)

### 4.3 Test Approach
- **White-box Testing:** For backend functions, database operations, and API endpoints
- **Black-box Testing:** For frontend user interface and user interactions
- **Gray-box Testing:** For integration between frontend and backend

---

## 5. Test Tools

### 5.1 Backend Testing Tools
- **PHPUnit:** Unit and integration testing for PHP/WordPress
- **WordPress Testing Framework:** wp-phpunit for WordPress-specific testing
- **Composer:** Dependency management for PHP packages

### 5.2 Frontend Testing Tools
- **Cypress:** End-to-end testing for frontend functionality
- **Node.js/npm:** Package management for frontend testing tools

### 5.3 API Testing Tools
- **PHPUnit:** REST API endpoint testing
- **Postman/Newman:** API testing and automation (optional)

### 5.4 Performance Testing Tools
- **Browser DevTools:** Performance profiling
- **WordPress Performance Plugins:** For performance monitoring

### 5.5 Security Testing Tools
- **OWASP ZAP:** Security vulnerability scanning (optional)
- **Manual Security Testing:** SQL injection, XSS testing

### 5.6 Accessibility Testing Tools
- **WAVE:** Web accessibility evaluation
- **axe DevTools:** Accessibility testing
- **Manual Testing:** Keyboard navigation, screen reader testing

---

## 6. Test Environment

### 6.1 Local Development Environment
- **Platform:** Docker Desktop (Windows)
- **WordPress:** Latest version running on Docker
- **Database:** MySQL 8.0
- **PHP Version:** 7.4+ or 8.0+
- **Web Server:** Apache (via Docker)
- **URL:** http://localhost:8082
- **phpMyAdmin:** http://localhost:8081

### 6.2 Staging Environment
- **Platform:** Cloud-based (AWS/Azure free tier) or local
- **Configuration:** Similar to production environment
- **Purpose:** Pre-production testing

### 6.3 Production Environment
- **Platform:** Cloud-based deployment
- **Purpose:** Final validation before release

### 6.4 Test Data Environment
- Separate test database
- Test user accounts (admin, editor, author, subscriber)
- Test posts and pages
- Test media files

---

## 7. Test Cases

### 7.1 Backend Test Cases (White-box Testing)

#### TC-BE-001: User Authentication - Login
- **Objective:** Verify user can login with valid credentials
- **Preconditions:** User account exists in database
- **Test Steps:**
  1. Call `wp_authenticate()` function with valid username and password
  2. Verify authentication succeeds
  3. Verify user session is created
- **Expected Result:** User is authenticated and session is established
- **Priority:** High

#### TC-BE-002: User Authentication - Invalid Credentials
- **Objective:** Verify login fails with invalid credentials
- **Preconditions:** User account exists
- **Test Steps:**
  1. Call `wp_authenticate()` with invalid password
  2. Verify authentication fails
  3. Verify error message is returned
- **Expected Result:** Authentication fails with appropriate error
- **Priority:** High

#### TC-BE-003: Post Creation - Create New Post
- **Objective:** Verify new post can be created via WordPress functions
- **Preconditions:** User is logged in with author/editor/admin role
- **Test Steps:**
  1. Call `wp_insert_post()` with post data
  2. Verify post is created in database
  3. Verify post ID is returned
- **Expected Result:** Post is successfully created with valid ID
- **Priority:** High

#### TC-BE-004: Post Update - Edit Existing Post
- **Objective:** Verify existing post can be updated
- **Preconditions:** Post exists in database
- **Test Steps:**
  1. Call `wp_update_post()` with modified data
  2. Verify post is updated in database
  3. Verify updated content is saved correctly
- **Expected Result:** Post is successfully updated
- **Priority:** High

#### TC-BE-005: Post Deletion - Delete Post
- **Objective:** Verify post can be deleted
- **Preconditions:** Post exists in database
- **Test Steps:**
  1. Call `wp_delete_post()` with post ID
  2. Verify post is removed from database
  3. Verify post is moved to trash or permanently deleted
- **Expected Result:** Post is successfully deleted
- **Priority:** High

#### TC-BE-006: REST API - Get Posts Endpoint
- **Objective:** Verify REST API returns posts correctly
- **Preconditions:** Posts exist in database
- **Test Steps:**
  1. Send GET request to `/wp-json/wp/v2/posts`
  2. Verify response status is 200
  3. Verify response contains post data in JSON format
- **Expected Result:** API returns posts in JSON format
- **Priority:** High

#### TC-BE-007: REST API - Create Post via API
- **Objective:** Verify post can be created via REST API
- **Preconditions:** Valid authentication token
- **Test Steps:**
  1. Send POST request to `/wp-json/wp/v2/posts` with post data
  2. Verify response status is 201
  3. Verify post is created in database
- **Expected Result:** Post is created via API
- **Priority:** High

#### TC-BE-008: Database Query - Retrieve Posts
- **Objective:** Verify database queries retrieve correct data
- **Preconditions:** Posts exist in database
- **Test Steps:**
  1. Execute `WP_Query` to retrieve posts
  2. Verify correct posts are returned
  3. Verify query performance is acceptable
- **Expected Result:** Posts are retrieved correctly and efficiently
- **Priority:** Medium

#### TC-BE-009: WordPress Hooks - Action Hook Execution
- **Objective:** Verify WordPress action hooks execute correctly
- **Preconditions:** Hook is registered
- **Test Steps:**
  1. Trigger action that fires hook
  2. Verify hook callback is executed
  3. Verify hook executes in correct order
- **Expected Result:** Action hook executes as expected
- **Priority:** Medium

#### TC-BE-010: WordPress Filters - Filter Application
- **Objective:** Verify WordPress filters modify data correctly
- **Preconditions:** Filter is registered
- **Test Steps:**
  1. Apply filter to data
  2. Verify data is modified as expected
  3. Verify filter priority is respected
- **Expected Result:** Filter modifies data correctly
- **Priority:** Medium

### 7.2 Frontend Test Cases (Black-box Testing)

#### TC-FE-001: User Login - Valid Credentials
- **Objective:** Verify user can login through web interface
- **Preconditions:** User account exists
- **Test Steps:**
  1. Navigate to login page
  2. Enter valid username and password
  3. Click "Log In" button
  4. Verify redirect to admin dashboard
- **Expected Result:** User is logged in and redirected to dashboard
- **Priority:** High

#### TC-FE-002: User Login - Invalid Credentials
- **Objective:** Verify login fails with invalid credentials
- **Preconditions:** User account exists
- **Test Steps:**
  1. Navigate to login page
  2. Enter invalid password
  3. Click "Log In" button
  4. Verify error message is displayed
- **Expected Result:** Error message displayed, user not logged in
- **Priority:** High

#### TC-FE-003: User Logout
- **Objective:** Verify user can logout
- **Preconditions:** User is logged in
- **Test Steps:**
  1. Click logout link/button
  2. Verify user is logged out
  3. Verify redirect to login page
- **Expected Result:** User is logged out successfully
- **Priority:** High

#### TC-FE-004: Create New Post - Web Interface
- **Objective:** Verify new post can be created via admin interface
- **Preconditions:** User is logged in with author/editor/admin role
- **Test Steps:**
  1. Navigate to Posts > Add New
  2. Enter post title and content
  3. Click "Publish" button
  4. Verify post is published
  5. Verify post appears in posts list
- **Expected Result:** Post is created and published successfully
- **Priority:** High

#### TC-FE-005: Edit Existing Post
- **Objective:** Verify existing post can be edited
- **Preconditions:** Post exists, user has edit permissions
- **Test Steps:**
  1. Navigate to Posts > All Posts
  2. Click "Edit" on existing post
  3. Modify post content
  4. Click "Update" button
  5. Verify changes are saved
- **Expected Result:** Post is updated successfully
- **Priority:** High

#### TC-FE-006: Delete Post
- **Objective:** Verify post can be deleted
- **Preconditions:** Post exists, user has delete permissions
- **Test Steps:**
  1. Navigate to Posts > All Posts
  2. Click "Trash" on post
  3. Verify post is moved to trash
  4. Navigate to Trash
  5. Click "Delete Permanently"
  6. Verify post is deleted
- **Expected Result:** Post is deleted successfully
- **Priority:** High

#### TC-FE-007: Create New Page
- **Objective:** Verify new page can be created
- **Preconditions:** User is logged in with editor/admin role
- **Test Steps:**
  1. Navigate to Pages > Add New
  2. Enter page title and content
  3. Click "Publish" button
  4. Verify page is published
- **Expected Result:** Page is created successfully
- **Priority:** High

#### TC-FE-008: Edit Existing Page
- **Objective:** Verify existing page can be edited
- **Preconditions:** Page exists, user has edit permissions
- **Test Steps:**
  1. Navigate to Pages > All Pages
  2. Click "Edit" on existing page
  3. Modify page content
  4. Click "Update" button
  5. Verify changes are saved
- **Expected Result:** Page is updated successfully
- **Priority:** High

#### TC-FE-009: Delete Page
- **Objective:** Verify page can be deleted
- **Preconditions:** Page exists, user has delete permissions
- **Test Steps:**
  1. Navigate to Pages > All Pages
  2. Click "Trash" on page
  3. Verify page is moved to trash
  4. Permanently delete from trash
  5. Verify page is deleted
- **Expected Result:** Page is deleted successfully
- **Priority:** High

#### TC-FE-010: User Registration
- **Objective:** Verify new user can register
- **Preconditions:** User registration is enabled
- **Test Steps:**
  1. Navigate to registration page
  2. Fill in registration form (username, email, password)
  3. Submit form
  4. Verify user account is created
  5. Verify confirmation email/notification
- **Expected Result:** User account is created successfully
- **Priority:** Medium

#### TC-FE-011: Comment Submission
- **Objective:** Verify user can submit comment on post
- **Preconditions:** Post exists and comments are enabled
- **Test Steps:**
  1. Navigate to post page
  2. Scroll to comment section
  3. Enter comment text
  4. Submit comment
  5. Verify comment is submitted (pending approval or published)
- **Expected Result:** Comment is submitted successfully
- **Priority:** Medium

#### TC-FE-012: Navigation - Menu Navigation
- **Objective:** Verify navigation menu works correctly
- **Preconditions:** Navigation menu is configured
- **Test Steps:**
  1. Navigate to website homepage
  2. Click on menu items
  3. Verify correct pages are loaded
  4. Verify navigation is consistent
- **Expected Result:** Navigation works correctly
- **Priority:** Medium

#### TC-FE-013: Search Functionality
- **Objective:** Verify search returns relevant results
- **Preconditions:** Posts/pages exist with searchable content
- **Test Steps:**
  1. Navigate to search page or use search widget
  2. Enter search keyword
  3. Submit search
  4. Verify relevant results are displayed
- **Expected Result:** Search returns relevant results
- **Priority:** Medium

#### TC-FE-014: Admin Dashboard Access
- **Objective:** Verify admin dashboard is accessible
- **Preconditions:** User is logged in with admin role
- **Test Steps:**
  1. Login as admin
  2. Verify dashboard loads
  3. Verify all admin sections are accessible
  4. Verify dashboard widgets display correctly
- **Expected Result:** Admin dashboard is fully accessible
- **Priority:** High

### 7.3 Non-Functional Test Cases

#### TC-NF-001: Performance - Page Load Time
- **Objective:** Verify page load time is acceptable
- **Preconditions:** WordPress site is running
- **Test Steps:**
  1. Navigate to homepage
  2. Measure page load time using browser DevTools
  3. Verify load time is under 3 seconds
- **Expected Result:** Page loads within acceptable time (< 3 seconds)
- **Priority:** Medium

#### TC-NF-002: Performance - API Response Time
- **Objective:** Verify API endpoints respond quickly
- **Preconditions:** REST API is accessible
- **Test Steps:**
  1. Send request to `/wp-json/wp/v2/posts`
  2. Measure response time
  3. Verify response time is under 1 second
- **Expected Result:** API responds within acceptable time (< 1 second)
- **Priority:** Medium

#### TC-NF-003: Security - SQL Injection Prevention
- **Objective:** Verify SQL injection attacks are prevented
- **Preconditions:** WordPress is running
- **Test Steps:**
  1. Attempt SQL injection in login form (e.g., `' OR '1'='1`)
  2. Verify attack is prevented
  3. Verify no database errors occur
- **Expected Result:** SQL injection is prevented
- **Priority:** High

#### TC-NF-004: Security - XSS Prevention
- **Objective:** Verify XSS attacks are prevented
- **Preconditions:** WordPress is running
- **Test Steps:**
  1. Attempt to inject script in comment/post content (e.g., `<script>alert('XSS')</script>`)
  2. Verify script is sanitized/escaped
  3. Verify no script execution occurs
- **Expected Result:** XSS attacks are prevented
- **Priority:** High

#### TC-NF-005: Security - Authentication Security
- **Objective:** Verify authentication is secure
- **Preconditions:** User accounts exist
- **Test Steps:**
  1. Attempt brute force login
  2. Verify rate limiting is in place
  3. Verify account lockout after failed attempts
- **Expected Result:** Authentication is secure against brute force
- **Priority:** High

#### TC-NF-006: Accessibility - Keyboard Navigation
- **Objective:** Verify site is navigable via keyboard
- **Preconditions:** WordPress site is accessible
- **Test Steps:**
  1. Navigate site using only keyboard (Tab, Enter, Arrow keys)
  2. Verify all interactive elements are accessible
  3. Verify focus indicators are visible
- **Expected Result:** Site is fully keyboard navigable
- **Priority:** Medium

#### TC-NF-007: Accessibility - WCAG Compliance
- **Objective:** Verify site meets WCAG 2.1 Level AA standards
- **Preconditions:** WordPress site is accessible
- **Test Steps:**
  1. Run WAVE accessibility tool
  2. Verify color contrast ratios meet standards
  3. Verify alt text is present for images
  4. Verify proper heading structure
- **Expected Result:** Site meets WCAG 2.1 Level AA standards
- **Priority:** Medium

---

## 8. Test Data

### 8.1 User Accounts
- **Admin User:**
  - Username: `admin`
  - Password: `[Test Password]`
  - Role: Administrator
  
- **Editor User:**
  - Username: `editor`
  - Password: `[Test Password]`
  - Role: Editor
  
- **Author User:**
  - Username: `author`
  - Password: `[Test Password]`
  - Role: Author
  
- **Subscriber User:**
  - Username: `subscriber`
  - Password: `[Test Password]`
  - Role: Subscriber

### 8.2 Test Posts
- Published posts (various categories)
- Draft posts
- Scheduled posts
- Trashed posts

### 8.3 Test Pages
- Published pages
- Draft pages
- Private pages

### 8.4 Test Comments
- Approved comments
- Pending comments
- Spam comments

### 8.5 Test Media
- Images (various formats: JPG, PNG, GIF)
- Documents (PDF, DOC)

---

## 9. Test Schedule

### 9.1 Test Phases
1. **Unit Testing:** Week 4-5
2. **Integration Testing:** Week 5-6
3. **System Testing:** Week 6-7
4. **Acceptance Testing:** Week 7-8

### 9.2 Test Execution
- Automated tests run on every commit (CI/CD pipeline)
- Manual tests executed weekly
- Performance tests executed monthly
- Security tests executed before each release

---

## 10. Risks and Mitigation

### 10.1 Risks
- **Risk 1:** Test environment instability
  - **Mitigation:** Use Docker for consistent environment
  
- **Risk 2:** Insufficient test coverage
  - **Mitigation:** Aim for 70%+ coverage on critical paths
  
- **Risk 3:** Test data inconsistency
  - **Mitigation:** Use automated test data setup

### 10.2 Dependencies
- Docker Desktop must be running
- WordPress must be installed and configured
- Test tools (PHPUnit, Cypress) must be installed
- Database must be accessible

---

## 11. Test Deliverables

1. Test Plan Document (this document)
2. Test Cases Document
3. Test Execution Reports
4. Test Coverage Reports
5. Bug Reports
6. Test Summary Report

---

## 12. Approval

**Prepared By:** Member 1  
**Date:** November 30, 2025  
**Status:** Draft

**Approved By:** _________________  
**Date:** _________________

---

## Appendix A: Test Case Template

**Test Case ID:** TC-XXX-XXX  
**Test Case Name:** [Name]  
**Objective:** [What is being tested]  
**Preconditions:** [What must be true before test]  
**Test Steps:** [Detailed steps]  
**Expected Result:** [What should happen]  
**Actual Result:** [What actually happened]  
**Status:** [Pass/Fail/Blocked]  
**Priority:** [High/Medium/Low]  
**Test Data:** [Data used]  
**Test Environment:** [Where test was run]  
**Tester:** [Name]  
**Date:** [Date]

---

**Document End**

