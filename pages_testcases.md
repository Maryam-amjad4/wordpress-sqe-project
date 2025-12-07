# Pages Management Test Cases

## Test File: pages.cy.js

---

### Test Case No: TC1
**Test Case Name:** Display All Pages Listing with Correct Elements

**Test Scenario:** Verify that the All Pages listing page loads successfully with all required UI elements and correct structure.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to All Pages listing (/wp-admin/edit.php?post_type=page)
3. Verify URL contains "edit.php" and "post_type=page"
4. Verify page heading contains "Pages"
5. Verify "Add Page" button is visible in page header
6. Verify filter links (ul.subsubsub) are visible
7. Verify "All" filter link exists and contains "All" text
8. Verify pages table (table.wp-list-table.pages) is visible
9. Verify table column headers exist: Title (#title), Author (#author), Date (#date)
10. Verify bulk action dropdown (#bulk-action-selector-top) is visible
11. Verify Apply button (#doaction) is visible

**Expected Result:** All Pages listing loads successfully with correct URL, page heading "Pages", Add Page button, filter links, table with proper column headers, and bulk action controls are visible.

---

### Test Case No: TC2
**Test Case Name:** Search and Filter Pages Successfully

**Test Scenario:** Verify that users can search and filter pages using the search and filter controls.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to All Pages listing (/wp-admin/edit.php?post_type=page)
3. Verify posts filter form (#posts-filter) is visible
4. Verify search input field (#post-search-input) is visible
5. Verify search submit button (#search-submit) is visible with value "Search Pages"
6. Clear search input and type "Sample"
7. Click the search submit button
8. Verify search results display pages or "No pages found" message
9. Verify date filter dropdown (#filter-by-date) is visible
10. Verify filter submit button (#post-query-submit) is visible with value "Filter"

**Expected Result:** Search functionality works correctly, displaying matching results or appropriate "No pages found" message, and filter controls (date filter and filter button) are present and functional.

---

### Test Case No: TC3
**Test Case Name:** Create New Page Successfully

**Test Scenario:** Verify that users can create a new page using the WordPress editor (Gutenberg or Classic).

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add New Page (/wp-admin/post-new.php?post_type=page)
3. Verify URL contains "post-new.php?post_type=page"
4. Wait for page editor to load completely (3 seconds)
5. Handle any pattern selection dialog that may appear
6. Determine if Gutenberg or Classic editor is active
7. For Gutenberg editor:
   - Close template selection dialog if present
   - Add page title using helper function
   - Add page content using helper function
   - Click Publish button (.editor-post-publish-button)
   - Click final publish button in panel if it appears
   - Verify "Published" confirmation message appears
8. For Classic editor (fallback):
   - Type title in title field (#title)
   - Type content in content field (#content)
   - Click Publish button (#publish)
   - Verify "Page published" message appears
9. Navigate to All Pages listing
10. Search for the newly created page
11. Verify page appears in the listing

**Expected Result:** New page is created successfully with title and content, publish confirmation message appears, and the page is visible in the All Pages listing.

---

### Test Case No: TC4
**Test Case Name:** Edit Existing Page Successfully

**Test Scenario:** Verify that users can edit an existing page and save changes.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Create an initial page with original title and content
3. Navigate to Add New Page and create the page
4. Wait for editor to load and handle pattern selection dialog
5. Add original title and content using appropriate editor (Gutenberg or Classic)
6. Publish the page and verify success
7. Navigate to All Pages listing
8. Find the page by title and click the row-title link to open editor
9. Wait for editor to load (3 seconds)
10. For Gutenberg editor:
    - Clear and update the page title with new text
    - Update the page content with new text
    - Click Update button
    - Verify "Updated" confirmation message appears
11. For Classic editor:
    - Clear and update title field
    - Clear and update content field
    - Click Update button
    - Verify "Page updated" message appears
12. Navigate to All Pages listing
13. Search for the updated page title
14. Verify updated page appears in the listing

**Expected Result:** Existing page is edited successfully, changes are saved, update confirmation message appears, and updated page is visible in the listing with new title.

---

### Test Case No: TC5
**Test Case Name:** Move Page to Trash Using Bulk Actions

**Test Scenario:** Verify that users can move a page to trash using the bulk actions interface.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Create a test page to delete
3. Navigate to Add New Page
4. Handle pattern selection dialog
5. Add page title using appropriate editor
6. Publish the page and verify success
7. Navigate to All Pages listing
8. Search for the specific page to delete
9. Select the page using the checkbox in the first row
10. Select "trash" option from bulk action dropdown (#bulk-action-selector-top)
11. Click Apply button (#doaction)
12. Verify "moved to the Trash" success message appears
13. Navigate to Trash view (/wp-admin/edit.php?post_type=page&post_status=trash)
14. Verify the deleted page appears in Trash listing

**Expected Result:** Page is successfully moved to trash using bulk actions, trash confirmation message appears, and page is visible in the Trash view.

---

### Test Case No: TC6
**Test Case Name:** Create Draft Page Successfully

**Test Scenario:** Verify that users can create and save a page as a draft without publishing.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add New Page (/wp-admin/post-new.php?post_type=page)
3. Wait for editor to load (3 seconds)
4. Handle any pattern selection dialog
5. Determine if Gutenberg or Classic editor is active
6. For Gutenberg editor:
   - Add draft title using helper function
   - Add draft content using helper function
   - Click Save Draft button (.editor-post-save-draft)
   - Verify "Saved" confirmation message appears
7. For Classic editor:
   - Type draft title in title field
   - Type draft content in content field
   - Click Save Draft button (#save-post)
   - Verify "Draft saved" message appears
8. Navigate to Draft pages listing (/wp-admin/edit.php?post_type=page&post_status=draft)
9. Verify draft page appears in the listing
10. Verify "Draft" status indicator is visible

**Expected Result:** Draft page is created successfully, draft saved confirmation appears, and page appears in Draft listing with "Draft" status indicator.

---

### Test Case No: TC7
**Test Case Name:** Create Page with Advanced Gutenberg Editor Features

**Test Scenario:** Verify that users can create a page using advanced Gutenberg editor features and interface elements.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to Add New Page (/wp-admin/post-new.php?post_type=page)
3. Verify URL contains "post-new.php?post_type=page"
4. Wait for editor to load (5 seconds)
5. Close template selection dialog if it appears
6. Wait additional time for full editor load (3 seconds)
7. Add page title using helper function
8. Test editor preview functionality:
   - If preview dropdown exists, click preview dropdown path element
   - Click second preview option button
   - Click third preview option button
9. Test sidebar panel functionality:
   - If pinned items SVG exists, click it
   - Click page settings panel buttons
   - Test radio control options if present
   - Click additional panel buttons
10. Test tab functionality by clicking block tab if present
11. Publish page using header settings button
12. Click publish button twice (as per interface flow)
13. Click final publish button in panel header
14. Navigate to All Pages listing
15. Search for the created page
16. Verify page appears in the listing

**Expected Result:** Page is created successfully using advanced Gutenberg features, editor preview and sidebar panels function correctly, and page is published and visible in the listing.

---

### Test Case No: TC8
**Test Case Name:** Perform Bulk Edit Operations Successfully

**Test Scenario:** Verify that users can perform bulk edit operations on multiple pages simultaneously.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to All Pages with sorting (/wp-admin/edit.php?post_type=page with orderby and order parameters)
3. Wait for page to load (2 seconds)
4. Select multiple pages using checkboxes:
   - If specific checkbox IDs exist, check #cb-select-3 and #cb-select-2
   - Otherwise, select first two available page checkboxes
5. Select "edit" option from bulk action dropdown (#bulk-action-selector-top)
6. Click Apply button (#doaction)
7. Verify bulk edit form (#bulk-edit) becomes visible
8. Test author selection in bulk edit form
9. Test parent page selection dropdown (#bulk_edit_post_parent) - select "No parent" (0)
10. Test template selection - select "default" template
11. Test comment status dropdown - select "open"
12. Test ping status dropdown visibility
13. Test status options by selecting each: publish, private, pending, draft
14. Set final status to "publish"
15. Submit bulk edit by clicking Update button (#bulk_edit)
16. Verify redirect to pages list with correct URL
17. Verify success message or confirmation that bulk edit completed

**Expected Result:** Bulk edit form opens correctly, all bulk edit fields function properly (author, parent, template, comment status, ping status, page status), changes are applied successfully, and user is returned to pages listing with confirmation.

---

### Test Case No: TC9
**Test Case Name:** Use Quick Edit Functionality

**Test Scenario:** Verify that users can access and use the Quick Edit inline editing feature.

**Steps:**
1. Login to WordPress admin with valid credentials
2. Navigate to All Pages listing (/wp-admin/edit.php?post_type=page)
3. Wait for page to load (2 seconds)
4. Hover over the first page row to reveal row actions
5. Wait for row actions to appear (500ms)
6. Scroll Quick Edit button into view
7. Verify Quick Edit button (button.editinline) exists
8. Click Quick Edit button (with force to handle visibility)
9. Wait for inline edit form to load (3 seconds)
10. Verify inline edit form (#inline-edit) appears
11. If form is visible:
    - Verify post title input field (input[name="post_title"]) is visible
    - Verify Cancel button (.button.cancel) is visible
    - Verify Save button (.button.save) is visible
    - Click Cancel button
    - Verify inline edit form closes and is no longer visible
12. If form is not visible, log expected behavior message

**Expected Result:** Quick Edit button appears on row hover, clicking it opens the inline edit form with title input and action buttons (Save, Cancel), and Cancel button successfully closes the form without saving changes.

---

**Total Test Cases: 9**
