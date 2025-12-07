# Login Functionality Test Cases

## Test File: login.cy.js

---

### Test Case No: TC1
**Test Case Name:** Successfully Log In with Valid Credentials

**Test Scenario:** Verify that users can successfully log in to WordPress admin with valid credentials and are redirected to the dashboard.

**Steps:**
1. Navigate to the WordPress login page (/wp-login.php)
2. Verify login form is visible (#loginform)
3. Clear the username field and enter valid username
4. Clear the password field and enter valid password
5. Check the "Remember Me" checkbox (#rememberme)
6. Click the Submit button (#wp-submit)
7. Verify URL redirects to admin dashboard (/wp-admin/)
8. Verify dashboard body element (#wpbody) exists
9. Verify admin menu (#adminmenu) is visible
10. Verify user authentication elements are present (#wp-admin-bar-my-account, .welcome-panel, or #dashboard-widgets)

**Expected Result:** User successfully logs in with valid credentials, is redirected to the WordPress admin dashboard, and all dashboard elements are visible confirming successful authentication.

---

### Test Case No: TC2
**Test Case Name:** Display Error Message for Invalid Credentials

**Test Scenario:** Verify that the system displays appropriate error messages when users attempt to log in with invalid credentials.

**Steps:**
1. Navigate to the WordPress login page
2. Verify login form is visible
3. Clear the username field and enter invalid username
4. Clear the password field and enter invalid password
5. Click the Submit button
6. Verify URL remains on login page (/wp-login.php)
7. Verify error message container is visible (#login_error, .login-error, or .notice-error)
8. Verify error message text contains relevant keywords (unknown email, error, invalid, incorrect, wrong, or check again)
9. Verify login form elements are still visible and functional
10. Verify username field is visible
11. Verify password field is visible
12. Verify submit button is visible

**Expected Result:** System rejects invalid credentials, displays appropriate error message, user remains on login page, and login form remains functional for retry.

---

### Test Case No: TC3
**Test Case Name:** Validate Empty Username Field

**Test Scenario:** Verify that form validation prevents submission when username field is empty.

**Steps:**
1. Navigate to the WordPress login page
2. Verify login form is visible
3. Leave username field empty
4. Enter a password in the password field
5. Click the Submit button
6. Verify URL remains on login page (/wp-login.php)
7. Verify username field receives focus (browser validation behavior)
8. Verify username field has 'required' attribute

**Expected Result:** Browser/WordPress form validation prevents submission when username field is empty, and focus is placed on the empty required username field.

---

### Test Case No: TC4
**Test Case Name:** Validate Empty Password Field

**Test Scenario:** Verify that form validation prevents submission when password field is empty.

**Steps:**
1. Navigate to the WordPress login page
2. Verify login form is visible
3. Enter a valid username in the username field
4. Leave password field empty
5. Click the Submit button
6. Verify URL remains on login page (/wp-login.php)
7. Verify password field has 'required' attribute

**Expected Result:** Form validation prevents submission when password field is empty even with valid username entered, and password field is identified as required.

---

### Test Case No: TC5
**Test Case Name:** Validate Empty Form Submission

**Test Scenario:** Verify that form validation prevents submission when both username and password fields are empty.

**Steps:**
1. Navigate to the WordPress login page
2. Verify login form is visible
3. Clear the username field (ensure it's empty)
4. Clear the password field (ensure it's empty)
5. Click the Submit button
6. Verify URL remains on login page (/wp-login.php)
7. Verify focus is placed on the first required field (username)

**Expected Result:** Form validation prevents submission when both fields are empty, and focus is automatically placed on the first required field (username).

---

### Test Case No: TC6
**Test Case Name:** Properly Functioning Form Elements

**Test Scenario:** Verify that all login form elements function correctly and have proper attributes for accessibility and functionality.

**Steps:**
1. Navigate to the WordPress login page
2. Verify login form is visible
3. Verify username field (#user_login) has 'required' attribute
4. Verify password field (#user_pass) has 'required' attribute
5. Verify password field has type attribute set to 'password'
6. Check if password field has proper autocomplete attribute (current-password, password, or off)
7. Check if username field has proper autocomplete attribute (username, email, or off)
8. If password visibility toggle exists (.wp-hide-pw), verify it works:
   - Click toggle button to show password
   - Verify password field type changes to 'text'
   - Click toggle button again to hide password
   - Verify password field type changes back to 'password'
9. Verify "Remember Me" checkbox (#rememberme) is initially unchecked
10. Check the "Remember Me" checkbox and verify it's checked
11. Uncheck the "Remember Me" checkbox and verify it's unchecked
12. Verify login form (#loginform) has method attribute set to 'post'
13. Verify login form has action attribute containing '/wp-login.php'

**Expected Result:** All form elements have proper attributes, labels, and functionality including password visibility toggle, remember me checkbox, and correct form method and action attributes.

---

### Test Case No: TC7
**Test Case Name:** Include Proper Security Elements

**Test Scenario:** Verify that login form includes necessary security elements and hidden fields.

**Steps:**
1. Navigate to the WordPress login page
2. Verify login form is visible
3. Verify redirect_to hidden input field exists with type 'hidden'
4. Verify testcookie hidden input field exists with type 'hidden'
5. Verify redirect_to field value points to admin area (baseUrl + '/wp-admin/')
6. Verify testcookie field has value '1'

**Expected Result:** Login form includes all required security fields (redirect_to and testcookie) with correct attributes and values for proper security handling and redirect functionality.

---

**Total Test Cases: 7**
