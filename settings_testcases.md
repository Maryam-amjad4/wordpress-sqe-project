# Settings Test Cases

## Test File: settings.cy.js

---

## General Settings

### Test Case No: TC1
**Test Case Name:** Update Site Title and Tagline

**Test Scenario:** Verify that users can update the site title and tagline in General Settings.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to General Settings page (http://localhost:8082/wp-admin/options-general.php)
3. Locate the site title field (#blogname)
4. Clear the site title field
5. Type "Test Site" in the site title field
6. Locate the tagline field (#blogdescription)
7. Clear the tagline field
8. Type "Test Tagline" in the tagline field
9. Click the Save Changes button (#submit)
10. Verify "Settings saved" message is visible

**Expected Result:** Site title is updated to "Test Site", tagline is updated to "Test Tagline", and "Settings saved" confirmation message appears.

---

### Test Case No: TC2
**Test Case Name:** Update Administration Email

**Test Scenario:** Verify that users can update the administration email address in General Settings.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to General Settings page
3. Locate the administration email field (#new_admin_email)
4. Clear the administration email field
5. Type "test@example.com" in the email field
6. Click the Save Changes button (#submit)
7. Verify "Settings saved" message is visible

**Expected Result:** Administration email is updated to "test@example.com" and "Settings saved" confirmation message appears.

---

### Test Case No: TC3
**Test Case Name:** Change Timezone

**Test Scenario:** Verify that users can change the site timezone in General Settings.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to General Settings page
3. Locate the timezone dropdown (#timezone_string)
4. Select "America/New_York" from the timezone dropdown
5. Click the Save Changes button (#submit)
6. Verify "Settings saved" message is visible

**Expected Result:** Timezone is changed to "America/New_York" and "Settings saved" confirmation message appears.

---

## Writing Settings

### Test Case No: TC4
**Test Case Name:** Update Default Post Category

**Test Scenario:** Verify that users can update the default post category in Writing Settings.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Writing Settings page (http://localhost:8082/wp-admin/options-writing.php)
3. Locate the default post category dropdown (#default_category)
4. Select category option "1" from the dropdown
5. Click the Save Changes button (#submit)
6. Verify "Settings saved" message is visible

**Expected Result:** Default post category is updated to the selected category and "Settings saved" confirmation message appears.

---

### Test Case No: TC5
**Test Case Name:** Update Default Post Format

**Test Scenario:** Verify that users can update the default post format in Writing Settings.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Writing Settings page
3. Locate the default post format dropdown (#default_post_format)
4. Select format option "0" (Standard) from the dropdown
5. Click the Save Changes button (#submit)
6. Verify "Settings saved" message is visible

**Expected Result:** Default post format is updated to "Standard" and "Settings saved" confirmation message appears.

---

## Reading Settings

### Test Case No: TC6
**Test Case Name:** Update Posts Per Page

**Test Scenario:** Verify that users can update the number of posts displayed per page in Reading Settings.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Reading Settings page (http://localhost:8082/wp-admin/options-reading.php)
3. Locate the posts per page field (#posts_per_page)
4. Clear the posts per page field
5. Type "15" in the posts per page field
6. Click the Save Changes button (#submit)
7. Verify "Settings saved" message is visible

**Expected Result:** Posts per page is updated to 15 and "Settings saved" confirmation message appears.

---

### Test Case No: TC7
**Test Case Name:** Toggle Search Engine Visibility

**Test Scenario:** Verify that users can toggle search engine visibility setting in Reading Settings.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Reading Settings page
3. Locate the search engine visibility checkbox (#blog_public)
4. Check the search engine visibility checkbox
5. Click the Save Changes button (#submit)
6. Verify "Settings saved" message is visible

**Expected Result:** Search engine visibility setting is enabled and "Settings saved" confirmation message appears.

---

### Test Case No: TC8
**Test Case Name:** Update RSS Feed Items

**Test Scenario:** Verify that users can update the number of items shown in RSS feeds in Reading Settings.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Reading Settings page
3. Locate the RSS feed items field (#posts_per_rss)
4. Clear the RSS feed items field
5. Type "15" in the RSS feed items field
6. Click the Save Changes button (#submit)
7. Verify "Settings saved" message is visible

**Expected Result:** RSS feed items is updated to 15 and "Settings saved" confirmation message appears.

---

## Discussion Settings

### Test Case No: TC9
**Test Case Name:** Toggle Default Comment Settings

**Test Scenario:** Verify that users can toggle default comment settings in Discussion Settings.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Discussion Settings page (http://localhost:8082/wp-admin/options-discussion.php)
3. Locate the default comment status checkbox (#default_comment_status)
4. Check the default comment status checkbox
5. Click the Save Changes button (#submit)
6. Verify "Settings saved" message is visible

**Expected Result:** Default comment status is enabled and "Settings saved" confirmation message appears.

---

### Test Case No: TC10
**Test Case Name:** Require Name and Email for Comments

**Test Scenario:** Verify that users can enable the requirement for name and email in comments.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Discussion Settings page
3. Locate the require name and email checkbox (#require_name_email)
4. Check the require name and email checkbox
5. Click the Save Changes button (#submit)
6. Verify "Settings saved" message is visible

**Expected Result:** Name and email requirement for comments is enabled and "Settings saved" confirmation message appears.

---

### Test Case No: TC11
**Test Case Name:** Enable Threaded Comments

**Test Scenario:** Verify that users can enable threaded (nested) comments with specified depth level.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Discussion Settings page
3. Locate the threaded comments checkbox (#thread_comments)
4. Check the threaded comments checkbox
5. Locate the comment thread depth dropdown (#thread_comments_depth)
6. Select "5" from the depth dropdown
7. Click the Save Changes button (#submit)
8. Verify "Settings saved" message is visible

**Expected Result:** Threaded comments are enabled with depth level 5 and "Settings saved" confirmation message appears.

---

### Test Case No: TC12
**Test Case Name:** Toggle Avatar Display

**Test Scenario:** Verify that users can toggle the display of avatars in comments.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Discussion Settings page
3. Locate the show avatars checkbox (#show_avatars)
4. Check the show avatars checkbox
5. Click the Save Changes button (#submit)
6. Verify "Settings saved" message is visible

**Expected Result:** Avatar display is enabled and "Settings saved" confirmation message appears.

---

## Media Settings

### Test Case No: TC13
**Test Case Name:** Update Thumbnail Dimensions

**Test Scenario:** Verify that users can update the default thumbnail image dimensions in Media Settings.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Media Settings page (http://localhost:8082/wp-admin/options-media.php)
3. Locate the thumbnail width field (#thumbnail_size_w)
4. Clear the thumbnail width field
5. Type "200" in the thumbnail width field
6. Locate the thumbnail height field (#thumbnail_size_h)
7. Clear the thumbnail height field
8. Type "200" in the thumbnail height field
9. Click the Save Changes button (#submit)
10. Verify "Settings saved" message is visible

**Expected Result:** Thumbnail dimensions are updated to 200x200 pixels and "Settings saved" confirmation message appears.

---

### Test Case No: TC14
**Test Case Name:** Update Medium Image Size

**Test Scenario:** Verify that users can update the default medium image dimensions in Media Settings.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Media Settings page
3. Locate the medium size width field (#medium_size_w)
4. Clear the medium size width field
5. Type "400" in the medium size width field
6. Locate the medium size height field (#medium_size_h)
7. Clear the medium size height field
8. Type "400" in the medium size height field
9. Click the Save Changes button (#submit)
10. Verify "Settings saved" message is visible

**Expected Result:** Medium image dimensions are updated to 400x400 pixels and "Settings saved" confirmation message appears.

---

### Test Case No: TC15
**Test Case Name:** Toggle Upload Folder Organization

**Test Scenario:** Verify that users can toggle the organization of uploads into year/month folders.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Media Settings page
3. Locate the upload folder organization checkbox (#uploads_use_yearmonth_folders)
4. Check the upload folder organization checkbox
5. Click the Save Changes button (#submit)
6. Verify "Settings saved" message is visible

**Expected Result:** Upload folder organization by year/month is enabled and "Settings saved" confirmation message appears.

---

## Permalink Settings

### Test Case No: TC16
**Test Case Name:** Select Post Name Permalink Structure

**Test Scenario:** Verify that users can select the post name permalink structure.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Permalink Settings page (http://localhost:8082/wp-admin/options-permalink.php)
3. Locate the post name permalink radio button (#permalink-input-post-name)
4. Check the post name permalink radio button
5. Click the Save Changes button (#submit)
6. Verify "Permalink structure updated" message is visible

**Expected Result:** Permalink structure is changed to post name format and "Permalink structure updated" confirmation message appears.

---

### Test Case No: TC17
**Test Case Name:** Select Day and Name Permalink Structure

**Test Scenario:** Verify that users can select the day and name permalink structure.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Permalink Settings page
3. Locate the day and name permalink radio button (#permalink-input-day-name)
4. Check the day and name permalink radio button
5. Click the Save Changes button (#submit)
6. Verify "Permalink structure updated" message is visible

**Expected Result:** Permalink structure is changed to day and name format and "Permalink structure updated" confirmation message appears.

---

### Test Case No: TC18
**Test Case Name:** Update Category Base

**Test Scenario:** Verify that users can customize the category base slug in permalinks.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Permalink Settings page
3. Locate the category base field (#category_base)
4. Clear the category base field
5. Type "topics" in the category base field
6. Click the Save Changes button (#submit)
7. Verify "Permalink structure updated" message is visible

**Expected Result:** Category base is updated to "topics" and "Permalink structure updated" confirmation message appears.

---

### Test Case No: TC19
**Test Case Name:** Update Tag Base

**Test Scenario:** Verify that users can customize the tag base slug in permalinks.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Permalink Settings page
3. Locate the tag base field (#tag_base)
4. Clear the tag base field
5. Type "tags" in the tag base field
6. Click the Save Changes button (#submit)
7. Verify "Permalink structure updated" message is visible

**Expected Result:** Tag base is updated to "tags" and "Permalink structure updated" confirmation message appears.

---

### Test Case No: TC20
**Test Case Name:** Set Custom Permalink Structure

**Test Scenario:** Verify that users can set a custom permalink structure with custom format.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Permalink Settings page
3. Locate the custom structure radio button (#custom_selection)
4. Check the custom structure radio button
5. Locate the permalink structure field (#permalink_structure)
6. Clear the permalink structure field
7. Type "/%year%/%postname%/" in the permalink structure field
8. Click the Save Changes button (#submit)
9. Verify "Permalink structure updated" message is visible

**Expected Result:** Custom permalink structure is set to "/%year%/%postname%/" and "Permalink structure updated" confirmation message appears.

---

**Total Test Cases: 20**
