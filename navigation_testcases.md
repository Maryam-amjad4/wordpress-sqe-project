# Navigation Test Cases

## Test File: navigation.cy.js

---

### Test Case No: TC1
**Test Case Name:** Load Dashboard Home Page

**Test Scenario:** Verify that the WordPress Dashboard home page loads successfully.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Dashboard home page (/wp-admin/index.php)
3. Verify URL contains "/wp-admin"
4. Verify page body content (#wpbody-content) is visible
5. Verify page heading contains "Dashboard"
6. Verify admin bar (#wpadminbar) is visible

**Expected Result:** Dashboard home page loads successfully with correct URL, page content is visible, heading displays "Dashboard", and admin bar is present.

---

### Test Case No: TC2
**Test Case Name:** Access Dashboard Updates Page

**Test Scenario:** Verify that the Dashboard Updates page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Updates page (/wp-admin/update-core.php)
3. Verify URL contains "/wp-admin/update-core.php"
4. Verify page body content (#wpbody-content) is visible
5. Verify page heading contains "Update"

**Expected Result:** Updates page loads successfully with correct URL and displays "Update" heading.

---

### Test Case No: TC3
**Test Case Name:** Navigate to All Posts Page

**Test Scenario:** Verify that the All Posts page can be accessed and loads properly.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to All Posts page (/wp-admin/edit.php)
3. Verify URL contains "/wp-admin/edit.php"
4. Verify page heading contains "Posts"
5. Verify page body content (#wpbody-content) is visible

**Expected Result:** All Posts page loads successfully with correct URL and displays "Posts" heading.

---

### Test Case No: TC4
**Test Case Name:** Navigate to Add Post Page

**Test Scenario:** Verify that the Add New Post page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add New Post page (/wp-admin/post-new.php)
3. Verify URL contains "/wp-admin/post-new.php"
4. Verify page body is visible

**Expected Result:** Add New Post page loads successfully with correct URL and page content is visible.

---

### Test Case No: TC5
**Test Case Name:** Navigate to Categories Page

**Test Scenario:** Verify that the Categories page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Categories page (/wp-admin/edit-tags.php?taxonomy=category)
3. Verify URL contains "/wp-admin/edit-tags.php?taxonomy=category"
4. Verify page heading contains "Categories"

**Expected Result:** Categories page loads successfully with correct URL and displays "Categories" heading.

---

### Test Case No: TC6
**Test Case Name:** Navigate to Tags Page

**Test Scenario:** Verify that the Tags page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Tags page (/wp-admin/edit-tags.php?taxonomy=post_tag)
3. Verify URL contains "/wp-admin/edit-tags.php?taxonomy=post_tag"
4. Verify page heading contains "Tags"

**Expected Result:** Tags page loads successfully with correct URL and displays "Tags" heading.

---

### Test Case No: TC7
**Test Case Name:** Navigate to Media Library

**Test Scenario:** Verify that the Media Library page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Media Library page (/wp-admin/upload.php)
3. Verify URL contains "/wp-admin/upload.php"
4. Verify page heading contains "Media"

**Expected Result:** Media Library page loads successfully with correct URL and displays "Media" heading.

---

### Test Case No: TC8
**Test Case Name:** Navigate to Add Media Page

**Test Scenario:** Verify that the Add Media (Upload) page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add Media page (/wp-admin/media-new.php)
3. Verify URL contains "/wp-admin/media-new.php"
4. Verify page heading contains "Upload"

**Expected Result:** Add Media page loads successfully with correct URL and displays "Upload" heading.

---

### Test Case No: TC9
**Test Case Name:** Navigate to All Pages

**Test Scenario:** Verify that the All Pages listing page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to All Pages (/wp-admin/edit.php?post_type=page)
3. Verify URL contains "/wp-admin/edit.php?post_type=page"
4. Verify page heading contains "Pages"

**Expected Result:** All Pages page loads successfully with correct URL and displays "Pages" heading.

---

### Test Case No: TC10
**Test Case Name:** Navigate to Add Page

**Test Scenario:** Verify that the Add New Page editor can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add New Page (/wp-admin/post-new.php?post_type=page)
3. Verify URL contains "/wp-admin/post-new.php?post_type=page"
4. Verify page body is visible

**Expected Result:** Add New Page editor loads successfully with correct URL and page content is visible.

---

### Test Case No: TC11
**Test Case Name:** Navigate to Comments Page

**Test Scenario:** Verify that the Comments management page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Comments page (/wp-admin/edit-comments.php)
3. Verify URL contains "/wp-admin/edit-comments.php"
4. Verify page heading contains "Comments"

**Expected Result:** Comments page loads successfully with correct URL and displays "Comments" heading.

---

### Test Case No: TC12
**Test Case Name:** Navigate to Themes Page

**Test Scenario:** Verify that the Themes page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Themes page (/wp-admin/themes.php)
3. Verify URL contains "/wp-admin/themes.php"
4. Verify page heading contains "Themes"

**Expected Result:** Themes page loads successfully with correct URL and displays "Themes" heading.

---

### Test Case No: TC13
**Test Case Name:** Navigate to Site Editor

**Test Scenario:** Verify that the Site Editor can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Site Editor (/wp-admin/site-editor.php)
3. Verify URL contains "/wp-admin/site-editor.php"
4. Verify page body is visible

**Expected Result:** Site Editor loads successfully with correct URL and page content is visible (may redirect to specific editor view).

---

### Test Case No: TC14
**Test Case Name:** Navigate to Plugins Page

**Test Scenario:** Verify that the Plugins management page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Plugins page (/wp-admin/plugins.php)
3. Verify URL contains "/wp-admin/plugins.php"
4. Verify page heading contains "Plugins"

**Expected Result:** Plugins page loads successfully with correct URL and displays "Plugins" heading.

---

### Test Case No: TC15
**Test Case Name:** Navigate to Add Plugins Page

**Test Scenario:** Verify that the Add Plugins page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add Plugins page (/wp-admin/plugin-install.php)
3. Verify URL contains "/wp-admin/plugin-install.php"
4. Verify page heading contains "Add Plugins"

**Expected Result:** Add Plugins page loads successfully with correct URL and displays "Add Plugins" heading.

---

### Test Case No: TC16
**Test Case Name:** Navigate to All Users Page

**Test Scenario:** Verify that the All Users management page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to All Users page (/wp-admin/users.php)
3. Verify URL contains "/wp-admin/users.php"
4. Verify page heading contains "Users"

**Expected Result:** All Users page loads successfully with correct URL and displays "Users" heading.

---

### Test Case No: TC17
**Test Case Name:** Navigate to Add New User Page

**Test Scenario:** Verify that the Add New User page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add New User page (/wp-admin/user-new.php)
3. Verify URL contains "/wp-admin/user-new.php"
4. Verify page body is visible

**Expected Result:** Add New User page loads successfully with correct URL and page content is visible.

---

### Test Case No: TC18
**Test Case Name:** Navigate to Profile Page

**Test Scenario:** Verify that the user Profile page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Profile page (/wp-admin/profile.php)
3. Verify URL contains "/wp-admin/profile.php"
4. Verify page heading contains "Profile"

**Expected Result:** Profile page loads successfully with correct URL and displays "Profile" heading.

---

### Test Case No: TC19
**Test Case Name:** Navigate to Tools Page

**Test Scenario:** Verify that the Tools page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Tools page (/wp-admin/tools.php)
3. Verify URL contains "/wp-admin/tools.php"
4. Verify page heading contains "Tools"

**Expected Result:** Tools page loads successfully with correct URL and displays "Tools" heading.

---

### Test Case No: TC20
**Test Case Name:** Navigate to Import Page

**Test Scenario:** Verify that the Import page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Import page (/wp-admin/import.php)
3. Verify URL contains "/wp-admin/import.php"
4. Verify page heading contains "Import"

**Expected Result:** Import page loads successfully with correct URL and displays "Import" heading.

---

### Test Case No: TC21
**Test Case Name:** Navigate to Export Page

**Test Scenario:** Verify that the Export page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Export page (/wp-admin/export.php)
3. Verify URL contains "/wp-admin/export.php"
4. Verify page heading contains "Export"

**Expected Result:** Export page loads successfully with correct URL and displays "Export" heading.

---

### Test Case No: TC22
**Test Case Name:** Navigate to Site Health Page

**Test Scenario:** Verify that the Site Health page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Site Health page (/wp-admin/site-health.php)
3. Verify URL contains "/wp-admin/site-health.php"
4. Verify page heading contains "Site Health"

**Expected Result:** Site Health page loads successfully with correct URL and displays "Site Health" heading.

---

### Test Case No: TC23
**Test Case Name:** Navigate to Export Personal Data Page

**Test Scenario:** Verify that the Export Personal Data page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Export Personal Data page (/wp-admin/export-personal-data.php)
3. Verify URL contains "/wp-admin/export-personal-data.php"
4. Verify page heading contains "Export Personal Data"

**Expected Result:** Export Personal Data page loads successfully with correct URL and displays "Export Personal Data" heading.

---

### Test Case No: TC24
**Test Case Name:** Navigate to Erase Personal Data Page

**Test Scenario:** Verify that the Erase Personal Data page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Erase Personal Data page (/wp-admin/erase-personal-data.php)
3. Verify URL contains "/wp-admin/erase-personal-data.php"
4. Verify page heading contains "Erase Personal Data"

**Expected Result:** Erase Personal Data page loads successfully with correct URL and displays "Erase Personal Data" heading.

---

### Test Case No: TC25
**Test Case Name:** Navigate to General Settings

**Test Scenario:** Verify that the General Settings page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to General Settings page (/wp-admin/options-general.php)
3. Verify URL contains "/wp-admin/options-general.php"
4. Verify page heading contains "General Settings"

**Expected Result:** General Settings page loads successfully with correct URL and displays "General Settings" heading.

---

### Test Case No: TC26
**Test Case Name:** Navigate to Writing Settings

**Test Scenario:** Verify that the Writing Settings page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Writing Settings page (/wp-admin/options-writing.php)
3. Verify URL contains "/wp-admin/options-writing.php"
4. Verify page heading contains "Writing Settings"

**Expected Result:** Writing Settings page loads successfully with correct URL and displays "Writing Settings" heading.

---

### Test Case No: TC27
**Test Case Name:** Navigate to Reading Settings

**Test Scenario:** Verify that the Reading Settings page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Reading Settings page (/wp-admin/options-reading.php)
3. Verify URL contains "/wp-admin/options-reading.php"
4. Verify page heading contains "Reading Settings"

**Expected Result:** Reading Settings page loads successfully with correct URL and displays "Reading Settings" heading.

---

### Test Case No: TC28
**Test Case Name:** Navigate to Discussion Settings

**Test Scenario:** Verify that the Discussion Settings page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Discussion Settings page (/wp-admin/options-discussion.php)
3. Verify URL contains "/wp-admin/options-discussion.php"
4. Verify page heading contains "Discussion Settings"

**Expected Result:** Discussion Settings page loads successfully with correct URL and displays "Discussion Settings" heading.

---

### Test Case No: TC29
**Test Case Name:** Navigate to Media Settings

**Test Scenario:** Verify that the Media Settings page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Media Settings page (/wp-admin/options-media.php)
3. Verify URL contains "/wp-admin/options-media.php"
4. Verify page heading contains "Media Settings"

**Expected Result:** Media Settings page loads successfully with correct URL and displays "Media Settings" heading.

---

### Test Case No: TC30
**Test Case Name:** Navigate to Permalinks Settings

**Test Scenario:** Verify that the Permalink Settings page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Permalinks Settings page (/wp-admin/options-permalink.php)
3. Verify URL contains "/wp-admin/options-permalink.php"
4. Verify page heading contains "Permalink Settings"

**Expected Result:** Permalink Settings page loads successfully with correct URL and displays "Permalink Settings" heading.

---

### Test Case No: TC31
**Test Case Name:** Navigate to Privacy Settings

**Test Scenario:** Verify that the Privacy Settings page can be accessed.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Privacy Settings page (/wp-admin/options-privacy.php)
3. Verify URL contains "/wp-admin/options-privacy.php"
4. Verify page heading contains "Privacy"

**Expected Result:** Privacy Settings page loads successfully with correct URL and displays heading containing "Privacy".

---

### Test Case No: TC32
**Test Case Name:** Verify Admin Menu Sidebar is Present

**Test Scenario:** Verify that the WordPress admin menu sidebar displays with all major menu items.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to WordPress admin dashboard
3. Verify admin menu (#adminmenu) is visible
4. Verify Dashboard menu item (#menu-dashboard) is visible
5. Verify Posts menu item (#menu-posts) is visible
6. Verify Media menu item (#menu-media) is visible
7. Verify Pages menu item (#menu-pages) is visible
8. Verify Comments menu item (#menu-comments) is visible
9. Verify Appearance menu item (#menu-appearance) is visible
10. Verify Plugins menu item (#menu-plugins) is visible
11. Verify Users menu item (#menu-users) is visible
12. Verify Tools menu item (#menu-tools) is visible
13. Verify Settings menu item (#menu-settings) is visible

**Expected Result:** Admin menu sidebar is visible and displays all major menu items (Dashboard, Posts, Media, Pages, Comments, Appearance, Plugins, Users, Tools, Settings).

---

### Test Case No: TC33
**Test Case Name:** Verify Admin Bar is Present

**Test Scenario:** Verify that the WordPress admin bar (toolbar) is displayed at the top of admin pages.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to WordPress admin dashboard
3. Verify admin bar (#wpadminbar) is visible
4. Verify WordPress logo menu item (#wp-admin-bar-wp-logo) is visible
5. Verify Site name menu item (#wp-admin-bar-site-name) is visible
6. Verify My Account menu item (#wp-admin-bar-my-account) is visible

**Expected Result:** Admin bar is visible at the top of the page and displays key elements (WordPress logo, Site name, My Account).

---

**Total Test Cases: 33**
