# User Management Test Cases

## Test File: user.cy.js

---

## User List Page

### Test Case No: TC1
**Test Case Name:** Display Users List Page

**Test Scenario:** Verify that the Users list page loads successfully with all required elements.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Users page (http://localhost:8082/wp-admin/users.php)
3. Verify page heading contains "Users"
4. Verify users table (table.users) is visible

**Expected Result:** Users list page loads successfully with heading "Users" and the users table is displayed.

---

### Test Case No: TC2
**Test Case Name:** Navigate to Add User Page

**Test Scenario:** Verify that users can navigate to the Add User page from the Users list.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Users page
3. Locate and click "Add User" button (a.page-title-action)
4. Verify URL includes "/wp-admin/user-new.php"
5. Verify page heading contains "Add User"

**Expected Result:** User is navigated to Add User page with correct URL and "Add User" heading is displayed.

---

### Test Case No: TC3
**Test Case Name:** View User Profile

**Test Scenario:** Verify that users can view a user profile from the users list.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Users page
3. Hover over the first user row in the table
4. Click the "View" link (span.view > a) with force option
5. Verify URL matches pattern with author parameter (?author=\d+)

**Expected Result:** User profile is displayed and URL contains the author parameter.

---

### Test Case No: TC4
**Test Case Name:** Navigate to Edit Profile

**Test Scenario:** Verify that users can navigate to edit profile page from the users list.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Users page
3. Hover over the first user row in the table
4. Click the "Edit" link (span.edit > a) with force option
5. Verify URL includes "/wp-admin/profile.php"

**Expected Result:** User is navigated to the profile edit page with correct URL.

---

## Add New User

### Test Case No: TC5
**Test Case Name:** Display Add User Form

**Test Scenario:** Verify that the Add User form displays all required fields.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add User page (http://localhost:8082/wp-admin/user-new.php)
3. Verify create user form (#createuser) is visible
4. Verify username field (#user_login) is visible
5. Verify email field (#email) is visible
6. Verify first name field (#first_name) is visible
7. Verify last name field (#last_name) is visible

**Expected Result:** Add User form is displayed with all required fields (username, email, first name, last name) visible.

---

### Test Case No: TC6
**Test Case Name:** Create New User with All Fields

**Test Scenario:** Verify that users can create a new user account with all fields populated.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add User page
3. Generate unique timestamp for username and email
4. Clear and type username in username field
5. Clear and type email in email field
6. Clear and type "Test" in first name field
7. Clear and type "User" in last name field
8. Clear and type "http://example.com" in URL field
9. Click password generation button (button.wp-generate-pw)
10. Verify password field (#pass1) is visible
11. Wait for password generation and strength check
12. Uncheck "send notification" checkbox (#send_user_notification)
13. Click Create User button (#createusersub)
14. Verify URL includes "users.php"

**Expected Result:** New user is created successfully with all fields populated and user is redirected to Users list page.

---

### Test Case No: TC7
**Test Case Name:** Select User Role

**Test Scenario:** Verify that users can select a role when creating a new user.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add User page
3. Locate role dropdown (#role)
4. Select "editor" from the role dropdown
5. Verify role dropdown has value "editor"

**Expected Result:** User role can be selected and dropdown shows the selected value "editor".

---

## Edit User Profile

### Test Case No: TC8
**Test Case Name:** Display Profile Form

**Test Scenario:** Verify that the user profile edit form displays all required fields.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page (http://localhost:8082/wp-admin/profile.php)
3. Verify profile form (#your-profile) is visible
4. Verify first name field (#first_name) is visible
5. Verify last name field (#last_name) is visible
6. Verify email field (#email) is visible

**Expected Result:** Profile edit form is displayed with all required fields (first name, last name, email) visible.

---

### Test Case No: TC9
**Test Case Name:** Update Profile Information

**Test Scenario:** Verify that users can update their profile information.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Clear and type "Updated" in first name field
4. Clear and type "Name" in last name field
5. Clear and type "Updated bio" in description/bio field
6. Click Save Changes button (#submit)
7. Verify URL includes "profile.php"

**Expected Result:** Profile information is updated successfully and user remains on profile page.

---

### Test Case No: TC10
**Test Case Name:** Change Admin Color Scheme

**Test Scenario:** Verify that users can change the admin color scheme.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Select the "Modern" color scheme radio button (#admin_color_modern)
4. Verify "Modern" color scheme radio button is checked

**Expected Result:** Admin color scheme can be changed to "Modern" and the selection is reflected in the checked state.

---

### Test Case No: TC11
**Test Case Name:** Update Display Name

**Test Scenario:** Verify that users can update their display name.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Select option at index 1 from display name dropdown (#display_name)
4. Click Save Changes button (#submit)

**Expected Result:** Display name is updated successfully and changes are saved.

---

### Test Case No: TC12
**Test Case Name:** Change Language Preference

**Test Scenario:** Verify that users can change their language preference.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Select "site-default" from locale dropdown (#locale)
4. Verify locale dropdown has value "site-default"

**Expected Result:** Language preference can be changed to "site-default" and the selection is reflected in the dropdown value.

---

## User Actions

### Test Case No: TC13
**Test Case Name:** Search for Users

**Test Scenario:** Verify that users can search for specific users in the users list.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Users page
3. Type "admin" in the user search input field (#user-search-input)
4. Click Search Users button (#search-submit)
5. Verify URL includes "s=admin" parameter

**Expected Result:** User search is executed successfully and URL contains the search parameter with "admin".

---

### Test Case No: TC14
**Test Case Name:** Change User Role via Bulk Action

**Test Scenario:** Verify that users can change user roles using bulk actions.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Users page
3. Check the user checkbox (#user_1)
4. Select "editor" from new role dropdown (#new_role)
5. Click Change button (#changeit)

**Expected Result:** User role is changed to "editor" successfully using the bulk action interface.

---

### Test Case No: TC15
**Test Case Name:** Access Bulk Actions Dropdown

**Test Scenario:** Verify that the bulk actions dropdown is accessible and functional.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Users page
3. Verify bulk action selector dropdown (#bulk-action-selector-top) is visible
4. Select "delete" from bulk action selector dropdown
5. Verify bulk action selector has value "delete"

**Expected Result:** Bulk actions dropdown is visible, functional, and can be set to different actions like "delete".

---

## Profile Settings

### Test Case No: TC16
**Test Case Name:** Toggle Toolbar Visibility

**Test Scenario:** Verify that users can toggle the visibility of the admin toolbar.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Verify toolbar visibility checkbox (#admin_bar_front) is visible
4. Check the toolbar visibility checkbox
5. Verify toolbar visibility checkbox is checked

**Expected Result:** Toolbar visibility setting can be toggled and checkbox reflects the checked state.

---

### Test Case No: TC17
**Test Case Name:** Toggle Syntax Highlighting

**Test Scenario:** Verify that the syntax highlighting toggle is available.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Verify syntax highlighting checkbox (#syntax_highlighting) is visible

**Expected Result:** Syntax highlighting toggle checkbox is visible in the profile settings.

---

### Test Case No: TC18
**Test Case Name:** Toggle Keyboard Shortcuts

**Test Scenario:** Verify that the keyboard shortcuts toggle is available.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Verify keyboard shortcuts checkbox (#comment_shortcuts) is visible

**Expected Result:** Keyboard shortcuts toggle checkbox is visible in the profile settings.

---

### Test Case No: TC19
**Test Case Name:** Update Biographical Info

**Test Scenario:** Verify that users can update their biographical information.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Clear and type "This is a test biography" in description field (#description)
4. Verify description field has value "This is a test biography"

**Expected Result:** Biographical info field accepts text input and displays the entered value correctly.

---

### Test Case No: TC20
**Test Case Name:** Update Website URL

**Test Scenario:** Verify that users can update their website URL in profile.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Clear and type "https://example.com" in URL field (#url)
4. Verify URL field has value "https://example.com"

**Expected Result:** Website URL field accepts input and displays the entered URL correctly.

---

## Password Management

### Test Case No: TC21
**Test Case Name:** Show Password Generation Button

**Test Scenario:** Verify that the password generation button is displayed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Verify password generation button (button.wp-generate-pw) is visible
4. Verify button contains text "Set New Password"

**Expected Result:** Password generation button is visible and displays "Set New Password" text.

---

### Test Case No: TC22
**Test Case Name:** Generate New Password

**Test Scenario:** Verify that users can generate a new password.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Click password generation button (button.wp-generate-pw)
4. Verify password field (#pass1) is visible
5. Verify password hide/show button (button.wp-hide-pw) is visible

**Expected Result:** Clicking password generation button reveals password field and hide/show toggle button.

---

### Test Case No: TC23
**Test Case Name:** Show Password Strength Indicator

**Test Scenario:** Verify that password strength indicator is displayed when generating password.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Click password generation button
4. Verify password strength result element (#pass-strength-result) exists

**Expected Result:** Password strength indicator element is present when password generation is activated.

---

## User Navigation

### Test Case No: TC24
**Test Case Name:** Access Profile from Admin Bar

**Test Scenario:** Verify that users can access their profile from the admin bar.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Users page
3. Hover over "My Account" in admin bar (#wp-admin-bar-my-account)
4. Wait for submenu animation (300ms)
5. Click user info link in submenu (#wp-admin-bar-user-info a) with force option
6. Verify URL includes "/wp-admin/profile.php"

**Expected Result:** User profile can be accessed from admin bar and correct profile page is displayed.

---

### Test Case No: TC25
**Test Case Name:** Navigate Between User Pages

**Test Scenario:** Verify that users can navigate between different user management pages.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to All Users page (http://localhost:8082/wp-admin/users.php)
3. Verify heading contains "Users"
4. Navigate to Add User page (http://localhost:8082/wp-admin/user-new.php)
5. Verify heading contains "Add User"
6. Navigate to Profile page (http://localhost:8082/wp-admin/profile.php)
7. Verify heading contains "Profile"

**Expected Result:** User can successfully navigate between All Users, Add User, and Profile pages with correct headings displayed on each page.

---

## Form Validation

### Test Case No: TC26
**Test Case Name:** Have Required Fields Marked

**Test Scenario:** Verify that required fields are properly marked in the Add User form.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add User page
3. Verify username label (label[for="user_login"]) contains "required" text
4. Verify email label (label[for="email"]) contains "required" text

**Expected Result:** Required fields (username and email) are marked with "required" text in their labels.

---

### Test Case No: TC27
**Test Case Name:** Validate Email Format

**Test Scenario:** Verify that email field has proper HTML5 validation type.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add User page
3. Verify email field (#email) has attribute type set to "email"

**Expected Result:** Email field has HTML5 type attribute set to "email" for browser validation.

---

### Test Case No: TC28
**Test Case Name:** Validate URL Format

**Test Scenario:** Verify that URL field has proper HTML5 validation type.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add User page
3. Verify URL field (#url) has attribute type set to "url"

**Expected Result:** URL field has HTML5 type attribute set to "url" for browser validation.

---

## User Table Features

### Test Case No: TC29
**Test Case Name:** Display User Table Headers

**Test Scenario:** Verify that the users table displays correct column headers.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Users page
3. Verify Username column header (table.users thead th#username) contains "Username"
4. Verify Email column header (table.users thead th#email) contains "Email"
5. Verify Role column header (table.users thead th#role) contains "Role"

**Expected Result:** Users table displays all required column headers: Username, Email, and Role.

---

### Test Case No: TC30
**Test Case Name:** Show User Row Actions

**Test Scenario:** Verify that row actions are available for each user in the table.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Users page
3. Locate first user row in the table
4. Verify row actions element (.row-actions) exists within the row

**Expected Result:** Row actions are present for each user in the users table.

---

### Test Case No: TC31
**Test Case Name:** Display User Count

**Test Scenario:** Verify that the total user count is displayed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Users page
3. Verify user count display element (.displaying-num) is visible

**Expected Result:** Total user count is displayed on the users list page.

---

## UI Elements Verification

### Test Case No: TC32
**Test Case Name:** Display Profile Picture Section

**Test Scenario:** Verify that the profile picture section is displayed in user profile.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Verify profile picture image (.user-profile-picture img) is visible

**Expected Result:** Profile picture section with image is visible in the user profile.

---

### Test Case No: TC33
**Test Case Name:** Show Account Management Section

**Test Scenario:** Verify that the Account Management section is displayed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Verify heading (h2) containing "Account Management" is visible

**Expected Result:** Account Management section heading is visible in the profile page.

---

### Test Case No: TC34
**Test Case Name:** Display Session Management

**Test Scenario:** Verify that session management controls are displayed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Verify user sessions wrapper (.user-sessions-wrap) exists
4. Verify destroy sessions button (#destroy-sessions) is visible

**Expected Result:** Session management section with destroy sessions button is present in the profile.

---

### Test Case No: TC35
**Test Case Name:** Show Personal Options Section

**Test Scenario:** Verify that the Personal Options section is displayed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Verify heading (h2) containing "Personal Options" is visible

**Expected Result:** Personal Options section heading is visible in the profile page.

---

### Test Case No: TC36
**Test Case Name:** Display Contact Info Section

**Test Scenario:** Verify that the Contact Info section is displayed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page
3. Verify heading (h2) containing "Contact Info" is visible

**Expected Result:** Contact Info section heading is visible in the profile page.

---

**Total Test Cases: 36**
