# Posts Management Test Cases

## Test File: posts.cy.js

---

### Test Case No: TC1
**Test Case Name:** Load All Posts Page with Correct Elements

**Test Scenario:** Verify that the All Posts page loads successfully with all required UI elements.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to Posts listing page (/wp-admin/edit.php)
3. Verify the page URL contains "/wp-admin/edit.php"
4. Check for page heading "Posts"
5. Verify "Add Post" button is visible
6. Verify posts table is displayed
7. Check all table column headers (Title, Author, Categories, Tags, Comments, Date)
8. Verify search box and bulk actions dropdowns exist

**Expected Result:** All Posts page loads successfully with correct URL, heading, table structure, and all UI elements (Add Post button, search box, bulk actions, filter controls) are visible.

---

### Test Case No: TC2
**Test Case Name:** Display Existing Posts in Table

**Test Scenario:** Verify that existing posts are displayed in the posts table or appropriate message is shown.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to Posts listing page
3. Locate the posts table body (tbody#the-list)
4. Check if posts exist in the table

**Expected Result:** Posts table body exists and either displays existing posts or shows "No posts found" message.

---

### Test Case No: TC3
**Test Case Name:** Show Post Count and Pagination

**Test Scenario:** Verify that post count and pagination controls are displayed when applicable.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to Posts listing page
3. Check for pagination controls (.tablenav-pages)
4. Check for item count display (.displaying-num)

**Expected Result:** Pagination controls and item count are visible when posts exist, or appropriate message is logged if no posts or single page.

---

### Test Case No: TC4
**Test Case Name:** Search for Posts by Title

**Test Scenario:** Verify that users can search for posts using the search functionality.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to Posts listing page
3. Check if search box exists
4. Type "Test Post" in the search box (input[name="s"])
5. Click the search button (input[type="submit"][id="search-submit"])
6. Verify URL contains search parameter (s=)
7. Verify search results or "No posts found" message

**Expected Result:** Search is executed successfully, URL includes search parameter, and either matching posts are displayed or "No posts found" message appears.

---

### Test Case No: TC5
**Test Case Name:** Filter Posts by Date

**Test Scenario:** Verify that users can filter posts by date.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to Posts listing page
3. Check if date filter dropdown exists (select[name="m"])
4. If options exist, select a date filter option
5. Click the Filter button (#post-query-submit)
6. Verify URL contains date parameter (m=)

**Expected Result:** Date filter is applied successfully and URL includes the date parameter, or appropriate message is logged if no date options available.

---

### Test Case No: TC6
**Test Case Name:** Filter Posts by Category

**Test Scenario:** Verify that users can filter posts by category.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to Posts listing page
3. Check if category filter dropdown exists (#cat)
4. If category options exist, select a category
5. Click the Filter button (#post-query-submit)
6. Verify URL contains category parameter (cat=)

**Expected Result:** Category filter is applied successfully and URL includes the category parameter, or logs message if no categories available.

---

### Test Case No: TC7
**Test Case Name:** Handle No Search Results Gracefully

**Test Scenario:** Verify that the system displays appropriate message when search returns no results.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to Posts listing page
3. Check if search box exists
4. Type a non-existent post title "NonExistentPostTitle123456"
5. Click the search button
6. Verify "No posts found" message is displayed

**Expected Result:** System displays "No posts found" message when search returns no results.

---

### Test Case No: TC8
**Test Case Name:** Navigate to Add New Post Page

**Test Scenario:** Verify that users can navigate to the Add New Post page.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to Posts listing page
3. Click the "Add Post" button (a.page-title-action)
4. Verify URL contains "/wp-admin/post-new.php"
5. Wait for WordPress editor to load

**Expected Result:** User is redirected to the Add New Post page with correct URL and the editor loads successfully.

---

### Test Case No: TC9
**Test Case Name:** Create and Publish New Post Successfully

**Test Scenario:** Verify that users can create and publish a new post.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to Add New Post page (/wp-admin/post-new.php)
3. Wait for editor to load
4. Determine if Gutenberg or Classic editor is active
5. Enter post title in the title field
6. Enter post content in the content area
7. Click Publish/Update button
8. Wait for publish confirmation message
9. Navigate to All Posts page
10. Search for the newly created post
11. Verify post appears in the list

**Expected Result:** Post is created and published successfully, confirmation message appears, and the post is visible in the All Posts listing.

---

### Test Case No: TC10
**Test Case Name:** Save Post as Draft

**Test Scenario:** Verify that users can save a post as a draft.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to Add New Post page
3. Wait for editor to load
4. Enter draft post title
5. Enter draft post content
6. Click Save Draft button or wait for auto-save
7. Wait for "Saved" or "Draft" indicator
8. Navigate to drafts listing page (/wp-admin/edit.php?post_status=draft)
9. Verify draft post appears in the list

**Expected Result:** Post is saved as draft successfully, saved indicator appears, and draft is visible in the drafts listing.

---

### Test Case No: TC11
**Test Case Name:** Edit Existing Post from All Posts Page

**Test Scenario:** Verify that users can edit an existing post and save updates.

**Steps:**
1. Login to WordPress admin dashboard
2. Create a post with original title and content
3. Publish the post
4. Navigate to All Posts page
5. Click on the post title (a.row-title) to open editor
6. Wait for editor to load
7. Update the post title with new text
8. Update the post content with new text
9. Click Update button
10. Wait for update confirmation message
11. Navigate to All Posts page
12. Search for the updated post title
13. Verify updated post appears in the list

**Expected Result:** Post is edited successfully, update confirmation appears, and updated content is visible in the posts listing.

---

### Test Case No: TC12
**Test Case Name:** Access Post Edit via Row Action Link

**Test Scenario:** Verify that users can access post editor via row action Edit link.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Check if posts exist
4. Hover over the first post row
5. Wait for row actions to appear
6. Verify Edit link exists in row actions
7. Verify Edit link href contains "post.php" and "action=edit"

**Expected Result:** Row actions appear on hover, Edit link is present, and link href contains correct post edit parameters.

---

### Test Case No: TC13
**Test Case Name:** Open Quick Edit Inline Form

**Test Scenario:** Verify that Quick Edit inline form opens correctly.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Check if posts exist
4. Hover over the first post row
5. Click Quick Edit button/link (.row-actions .inline a or button.editinline)
6. Wait for inline edit form to load
7. Verify inline edit form (#inline-edit) is visible
8. Verify form fields are present (post_title, post_name, author, status)
9. Verify action buttons (Update, Cancel) exist

**Expected Result:** Quick Edit form appears inline with all required fields and action buttons visible.

---

### Test Case No: TC14
**Test Case Name:** Cancel Quick Edit Without Changes

**Test Scenario:** Verify that users can cancel Quick Edit without making changes.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Check if posts exist
4. Hover over the first post and click Quick Edit
5. Wait for inline edit form to appear
6. Click Cancel button (.inline-edit-save button.cancel)
7. Verify inline edit form is hidden

**Expected Result:** Quick Edit form closes without saving changes when Cancel button is clicked.

---

### Test Case No: TC15
**Test Case Name:** Update Post via Quick Edit

**Test Scenario:** Verify that users can update post metadata using Quick Edit.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Check if posts exist
4. Hover over the first post and click Quick Edit
5. Wait for inline edit form to appear
6. Update the post slug field (input[name="post_name"])
7. Click Save button (.inline-edit-save button.save)
8. Wait for save to complete
9. Verify inline form closes

**Expected Result:** Post metadata is updated successfully via Quick Edit and the form closes after saving.

---

### Test Case No: TC16
**Test Case Name:** Move Post to Trash via Row Action

**Test Scenario:** Verify that users can move a post to trash using row action.

**Steps:**
1. Login to WordPress admin dashboard
2. Create a test post to delete
3. Publish the post
4. Navigate to All Posts page
5. Find the post in the list
6. Verify Trash link (.row-actions .trash a.submitdelete) contains "action=trash"
7. Click the Trash link
8. Verify success message "moved to the Trash" appears
9. Navigate to All Posts page
10. Verify post no longer appears in the list

**Expected Result:** Post is moved to trash successfully, confirmation message appears, and post is removed from All Posts listing.

---

### Test Case No: TC17
**Test Case Name:** View Trashed Posts

**Test Scenario:** Verify that users can view posts in the Trash.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to Trash view (/wp-admin/edit.php?post_status=trash)
3. Verify URL contains "post_status=trash"
4. Verify subsubsub menu is visible

**Expected Result:** Trash view loads successfully with correct URL and displays trashed posts or empty state.

---

### Test Case No: TC18
**Test Case Name:** Permanently Delete Post from Trash

**Test Scenario:** Verify that users can permanently delete a post from Trash.

**Steps:**
1. Login to WordPress admin dashboard
2. Create a test post
3. Publish the post
4. Move post to trash using bulk action
5. Navigate to Trash view
6. Select the trashed post using checkbox
7. Select "delete" from bulk actions dropdown
8. Click Apply button
9. Confirm deletion in dialog
10. Wait for deletion to complete
11. Verify post no longer appears in Trash

**Expected Result:** Post is permanently deleted from Trash and no longer appears in the listing.

---

### Test Case No: TC19
**Test Case Name:** Select Multiple Posts Using Checkboxes

**Test Scenario:** Verify that users can select and deselect multiple posts using checkboxes.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Check if posts exist
4. Check the "Select All" checkbox (#cb-select-all-1)
5. Verify all individual post checkboxes are checked
6. Uncheck the "Select All" checkbox
7. Verify all individual post checkboxes are unchecked

**Expected Result:** Select All checkbox correctly toggles all individual post checkboxes on and off.

---

### Test Case No: TC20
**Test Case Name:** Show Bulk Action Options

**Test Scenario:** Verify that bulk action dropdown displays correct options.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Check if bulk actions dropdown exists (#bulk-action-selector-top)
4. Verify dropdown contains "Bulk actions" option
5. Verify dropdown contains "Edit" option (value="edit")
6. Verify dropdown contains "Move to Trash" option (value="trash")

**Expected Result:** Bulk actions dropdown is present and contains all expected action options.

---

### Test Case No: TC21
**Test Case Name:** Perform Bulk Trash Action

**Test Scenario:** Verify that users can move multiple posts to trash using bulk action.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Check if posts exist
4. Select the first post checkbox
5. Select "trash" from bulk actions dropdown (#bulk-action-selector-top)
6. Click Apply button (#doaction)
7. Verify success message "moved to the Trash" appears

**Expected Result:** Selected posts are moved to trash successfully and confirmation message is displayed.

---

### Test Case No: TC22
**Test Case Name:** Open Bulk Edit Form

**Test Scenario:** Verify that Bulk Edit form opens with correct fields.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Check if posts exist
4. Select the first post checkbox
5. Select "edit" from bulk actions dropdown
6. Click Apply button
7. Verify bulk edit form (#bulk-edit) is visible
8. Verify bulk edit fields are present (textarea, author select, status select)
9. Verify Update button (#bulk_edit) is visible with value "Update"

**Expected Result:** Bulk Edit form opens inline with all required fields and Update button visible.

---

### Test Case No: TC23
**Test Case Name:** Show Post Status Links in Subsubsub Menu

**Test Scenario:** Verify that post status filter links are displayed in the subsubsub menu.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Verify subsubsub menu (ul.subsubsub) is visible
4. Verify "All" status link exists (ul.subsubsub li.all)
5. Check if "Published" status link exists (li.publish)
6. Verify "All" link has "current" class

**Expected Result:** Subsubsub menu displays with status filter links and "All" is highlighted as current.

---

### Test Case No: TC24
**Test Case Name:** Filter by Published Status

**Test Scenario:** Verify that users can filter posts by Published status.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Check if Published link exists in subsubsub menu
4. Click on Published status link (ul.subsubsub li.publish a)
5. Verify URL contains "post_status=publish"

**Expected Result:** Page filters to show only published posts and URL includes publish status parameter.

---

### Test Case No: TC25
**Test Case Name:** Show Draft Posts When Clicking Draft Filter

**Test Scenario:** Verify that Draft filter displays draft posts.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to draft posts page (/wp-admin/edit.php?post_status=draft)
3. Verify URL contains "post_status=draft"
4. Verify page shows drafts or "No posts found" message

**Expected Result:** Draft filter page loads with correct URL and displays draft posts or appropriate empty state message.

---

### Test Case No: TC26
**Test Case Name:** Show Correct Post Count in Status Links

**Test Scenario:** Verify that status links display accurate post counts.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Verify count is displayed in "All" status link (ul.subsubsub li.all .count)
4. Check if publish count exists and is visible

**Expected Result:** Post counts are displayed correctly in each status filter link.

---

### Test Case No: TC27
**Test Case Name:** Display Post Author Correctly

**Test Scenario:** Verify that post author information is displayed in the posts table.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Verify author column (.column-author) exists
4. Check if author links or author names are displayed in the column
5. Verify column is not empty

**Expected Result:** Author column exists and displays author information (links or names) for each post.

---

### Test Case No: TC28
**Test Case Name:** Display Post Categories

**Test Scenario:** Verify that post categories are displayed in the posts table.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Verify categories column (.column-categories) exists

**Expected Result:** Categories column exists in the posts table.

---

### Test Case No: TC29
**Test Case Name:** Display Post Tags or "No tags" Message

**Test Scenario:** Verify that post tags are displayed or appropriate message is shown.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Verify tags column (.column-tags) exists

**Expected Result:** Tags column exists and displays tags or appropriate empty indicator.

---

### Test Case No: TC30
**Test Case Name:** Display Comment Count

**Test Scenario:** Verify that comment count is displayed for each post.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Verify comments column (.column-comments) exists
4. Check if comment count wrapper or text is displayed
5. Verify column is not empty

**Expected Result:** Comments column exists and displays comment count or indicator for each post.

---

### Test Case No: TC31
**Test Case Name:** Display Post Date

**Test Scenario:** Verify that post publication date is displayed in the posts table.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Verify date column (.column-date) exists

**Expected Result:** Date column exists and displays publication date for each post.

---

### Test Case No: TC32
**Test Case Name:** Open Screen Options Panel

**Test Scenario:** Verify that Screen Options panel can be opened.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Click Screen Options button (#show-settings-link)
4. Verify Screen Options panel (#screen-options-wrap) is visible

**Expected Result:** Screen Options panel opens and becomes visible when button is clicked.

---

### Test Case No: TC33
**Test Case Name:** Show Column Visibility Checkboxes

**Test Scenario:** Verify that column visibility toggles are available in Screen Options.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Open Screen Options panel
4. Verify column visibility checkboxes exist for Author (#author-hide)
5. Verify checkbox exists for Categories (#categories-hide)
6. Verify checkbox exists for Tags (#tags-hide)
7. Verify checkbox exists for Comments (#comments-hide)
8. Verify checkbox exists for Date (#date-hide)

**Expected Result:** All column visibility checkboxes are present in Screen Options panel.

---

### Test Case No: TC34
**Test Case Name:** Have Pagination Settings

**Test Scenario:** Verify that pagination settings are available in Screen Options.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Open Screen Options panel
4. Verify items per page input field (#edit_post_per_page) exists
5. Verify field type is "number"
6. Verify Apply button (#screen-options-apply) is visible

**Expected Result:** Pagination settings input field and Apply button are present in Screen Options.

---

### Test Case No: TC35
**Test Case Name:** Have View Mode Options

**Test Scenario:** Verify that view mode options are available in Screen Options.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to All Posts page
3. Open Screen Options panel
4. Verify List view mode radio button (#list-view-mode) exists
5. Verify Excerpt view mode radio button (#excerpt-view-mode) exists

**Expected Result:** Both List and Excerpt view mode radio buttons are present in Screen Options.

---

**Total Test Cases: 35**
