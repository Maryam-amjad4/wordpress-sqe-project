# Comments Test Cases

## Test File: comments.cy.js

---

### Test Case No: TC1
**Test Case Name:** Load Comments Page Successfully

**Test Scenario:** Verify that the comments management page loads correctly in WordPress admin.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page (wp-admin/edit-comments.php)
3. Verify the page URL
4. Check for the presence of the main heading

**Expected Result:** The comments page loads successfully with the correct URL and displays "Comments" heading.

---

### Test Case No: TC2
**Test Case Name:** Display All Filter Tabs

**Test Scenario:** Verify that all comment filter tabs are visible on the comments page.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the filter tabs section (.subsubsub)
4. Count and verify all filter tabs

**Expected Result:** All 6 filter tabs (All, Mine, Pending, Approved, Spam, Trash) are visible.

---

### Test Case No: TC3
**Test Case Name:** Display Comments Table Headers

**Test Scenario:** Verify that the comments table displays with correct column headers.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the comments table (wp-list-table)
4. Check each column header

**Expected Result:** Table displays with headers: Author, Comment, In response to, and Submitted on.

---

### Test Case No: TC4
**Test Case Name:** Display Comments Table or Empty State

**Test Scenario:** Verify that the comments table shows either existing comments or an empty state message.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Check the table body content
4. Verify either comments are displayed or "No comments found" message appears

**Expected Result:** Table body exists and either displays comments (at least 1 row) or shows "No comments found" message.

---

### Test Case No: TC5
**Test Case Name:** Display Bulk Action Elements

**Test Scenario:** Verify that bulk action controls are present in the comments table interface.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Check for bulk action selectors
4. Verify their visibility when comments exist

**Expected Result:** Bulk action selector dropdowns are visible (top and bottom) when comments exist, or table structure exists when no comments.

---

### Test Case No: TC6
**Test Case Name:** Select All Checkboxes Present

**Test Scenario:** Verify that select all checkboxes exist in the comments table.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the select all checkbox at the top (#cb-select-all-1)
4. Locate the select all checkbox at the bottom (#cb-select-all-2)

**Expected Result:** Both select all checkboxes exist and have the type attribute set to "checkbox".

---

### Test Case No: TC7
**Test Case Name:** Toggle Select All Checkbox

**Test Scenario:** Verify that the select all checkbox can be toggled on and off.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Verify the checkbox is initially unchecked
4. Check the select all checkbox
5. Verify it is checked
6. Uncheck the select all checkbox
7. Verify it is unchecked

**Expected Result:** Select all checkbox toggles correctly between checked and unchecked states.

---

### Test Case No: TC8
**Test Case Name:** Select Individual Comment

**Test Scenario:** Verify that individual comment checkboxes can be selected when comments exist.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Check if comments exist in the list
4. Select the checkbox for the first comment
5. Verify the checkbox is checked

**Expected Result:** Individual comment checkbox can be selected and shows as checked, or logs "No comments to select" if none exist.

---

### Test Case No: TC9
**Test Case Name:** Navigate to All Comments Filter

**Test Scenario:** Verify navigation to the All comments filter view.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Click on the "All" filter link
4. Verify the URL contains the filter parameter
5. Verify "All" is highlighted as current filter

**Expected Result:** URL includes "comment_status=all" and the "All" tab is highlighted as current.

---

### Test Case No: TC10
**Test Case Name:** Navigate to Mine Filter

**Test Scenario:** Verify navigation to the Mine comments filter view.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Click on the "Mine" filter link
4. Verify the URL contains the filter parameter

**Expected Result:** URL includes "comment_status=mine".

---

### Test Case No: TC11
**Test Case Name:** Navigate to Pending Filter

**Test Scenario:** Verify navigation to the Pending comments filter view.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Click on the "Pending" filter link
4. Verify the URL contains the filter parameter

**Expected Result:** URL includes "comment_status=moderated".

---

### Test Case No: TC12
**Test Case Name:** Navigate to Approved Filter

**Test Scenario:** Verify navigation to the Approved comments filter view.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Click on the "Approved" filter link
4. Verify the URL contains the filter parameter

**Expected Result:** URL includes "comment_status=approved".

---

### Test Case No: TC13
**Test Case Name:** Navigate to Spam Filter

**Test Scenario:** Verify navigation to the Spam comments filter view.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Click on the "Spam" filter link
4. Verify the URL contains the filter parameter

**Expected Result:** URL includes "comment_status=spam".

---

### Test Case No: TC14
**Test Case Name:** Navigate to Trash Filter

**Test Scenario:** Verify navigation to the Trash comments filter view.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Click on the "Trash" filter link
4. Verify the URL contains the filter parameter

**Expected Result:** URL includes "comment_status=trash".

---

### Test Case No: TC15
**Test Case Name:** Open Screen Options Panel

**Test Scenario:** Verify that the screen options panel can be opened.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the "Screen Options" link
4. Click on the "Screen Options" link
5. Verify the panel is displayed

**Expected Result:** Screen options panel (#screen-options-wrap) becomes visible.

---

### Test Case No: TC16
**Test Case Name:** Display Column Visibility Toggles

**Test Scenario:** Verify that column visibility toggles are available in screen options.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Open the screen options panel
4. Verify visibility toggles for Author, Response, and Date columns

**Expected Result:** Column visibility checkboxes for Author (#author-hide), Response (#response-hide), and Date (#date-hide) are visible.

---

### Test Case No: TC17
**Test Case Name:** Display Pagination Settings

**Test Scenario:** Verify that pagination settings are available in screen options.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Open the screen options panel
4. Locate the pagination input field
5. Verify the default value

**Expected Result:** Pagination input field (#edit_comments_per_page) is visible with a default value of "20".

---

### Test Case No: TC18
**Test Case Name:** Display View Mode Options

**Test Scenario:** Verify that view mode options are available in screen options.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Open the screen options panel
4. Verify the list view mode radio button
5. Verify the excerpt view mode radio button

**Expected Result:** List view mode (#list-view-mode) is visible and checked by default, and excerpt view mode (#excerpt-view-mode) is visible.

---

### Test Case No: TC19
**Test Case Name:** Apply Button in Screen Options

**Test Scenario:** Verify that the Apply button exists in screen options.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Open the screen options panel
4. Locate the Apply button
5. Verify button text and visibility

**Expected Result:** Apply button (#screen-options-apply) is visible and contains the text "Apply".

---

### Test Case No: TC20
**Test Case Name:** Open Contextual Help Panel

**Test Scenario:** Verify that the contextual help panel can be opened.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the contextual help link
4. Click on the contextual help link
5. Verify the help panel is displayed

**Expected Result:** Contextual help panel (#contextual-help-wrap) becomes visible.

---

### Test Case No: TC21
**Test Case Name:** Display Help Tabs

**Test Scenario:** Verify that help tabs are visible in the contextual help panel.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Open the contextual help panel
4. Verify the presence of help tabs

**Expected Result:** Overview (#tab-link-overview) and Moderating Comments (#tab-link-moderating-comments) tabs are visible.

---

### Test Case No: TC22
**Test Case Name:** Switch Between Help Tabs

**Test Scenario:** Verify that users can switch between different help tabs.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Open the contextual help panel
4. Click on the "Moderating Comments" tab link
5. Verify the tab content is displayed

**Expected Result:** Moderating Comments tab panel (#tab-panel-moderating-comments) becomes active with the "active" class.

---

### Test Case No: TC23
**Test Case Name:** Sortable Columns Exist

**Test Scenario:** Verify that sortable column headers exist in the comments table.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Verify Author column header exists
4. Verify Response column header exists
5. Verify Date column header exists

**Expected Result:** Author (#author), Response (#response), and Date (#date) column headers exist.

---

### Test Case No: TC24
**Test Case Name:** Sort by Author

**Test Scenario:** Verify that comments can be sorted by author.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Click on the Author column header link
4. Verify the URL contains the sort parameter

**Expected Result:** URL includes "orderby=comment_author".

---

### Test Case No: TC25
**Test Case Name:** Sort by Post

**Test Scenario:** Verify that comments can be sorted by post/response.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Click on the Response column header link
4. Verify the URL contains the sort parameter

**Expected Result:** URL includes "orderby=comment_post_ID".

---

### Test Case No: TC26
**Test Case Name:** Sort by Date

**Test Scenario:** Verify that comments can be sorted by date.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Click on the Date column header link
4. Verify the URL contains the sort parameter

**Expected Result:** URL includes "orderby=comment_date".

---

### Test Case No: TC27
**Test Case Name:** Comments Form Attributes

**Test Scenario:** Verify that the comments form has correct attributes.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the comments form (#comments-form)
4. Verify the method attribute

**Expected Result:** Comments form has method attribute set to "get".

---

### Test Case No: TC28
**Test Case Name:** Hidden Input Fields

**Test Scenario:** Verify that required hidden input fields exist in the form.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Verify comment_status hidden field
4. Verify _per_page hidden field
5. Verify _page hidden field

**Expected Result:** Hidden inputs exist with correct values: comment_status="all", _per_page="20", _page="1".

---

### Test Case No: TC29
**Test Case Name:** AJAX Nonce Field

**Test Scenario:** Verify that the AJAX nonce field exists for security.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the AJAX nonce hidden input field

**Expected Result:** Hidden input field with name "_ajax_fetch_list_nonce" exists.

---

### Test Case No: TC30
**Test Case Name:** Admin Bar Integration

**Test Scenario:** Verify that the admin bar displays with comments link.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Verify the admin bar is visible
4. Verify the comments link in admin bar

**Expected Result:** Admin bar (#wpadminbar) and comments link (#wp-admin-bar-comments) are both visible.

---

### Test Case No: TC31
**Test Case Name:** Comment Count in Admin Bar

**Test Scenario:** Verify that the comment count is displayed in the admin bar.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the comment count label in admin bar
4. Verify it contains a numeric value

**Expected Result:** Admin bar comment label (#wp-admin-bar-comments .ab-label) contains "0" or a numeric count.

---

### Test Case No: TC32
**Test Case Name:** Collapse Menu Button

**Test Scenario:** Verify that the collapse menu button is displayed for responsive design.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the collapse menu button

**Expected Result:** Collapse menu button (#collapse-button) is visible.

---

### Test Case No: TC33
**Test Case Name:** ARIA Labels for Accessibility

**Test Scenario:** Verify that proper accessibility attributes exist.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Verify checkbox type attributes
4. Verify associated labels exist
5. Verify heading is visible

**Expected Result:** Select all checkbox has proper type attribute, associated label exists, and main heading is visible for accessibility.

---

### Test Case No: TC34
**Test Case Name:** Hidden Reply Form

**Test Scenario:** Verify that the reply form exists but is hidden by default.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the reply row element
4. Verify it exists but is not visible

**Expected Result:** Reply row (#replyrow) exists but is not visible by default.

---

### Test Case No: TC35
**Test Case Name:** Reply Content Textarea

**Test Scenario:** Verify that the reply content textarea exists.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the reply content textarea

**Expected Result:** Reply content textarea (#replycontent) exists.

---

### Test Case No: TC36
**Test Case Name:** Reply Form Buttons

**Test Scenario:** Verify that reply form buttons exist.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the Save button in reply form
4. Locate the Cancel button in reply form

**Expected Result:** Save button (#replysubmit .save) and Cancel button (#replysubmit .cancel) exist.

---

### Test Case No: TC37
**Test Case Name:** Trash Undo Holder

**Test Scenario:** Verify that the trash undo holder element exists.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the trash undo holder element

**Expected Result:** Trash undo holder (#trash-undo-holder) exists.

---

### Test Case No: TC38
**Test Case Name:** Spam Undo Holder

**Test Scenario:** Verify that the spam undo holder element exists.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the spam undo holder element

**Expected Result:** Spam undo holder (#spam-undo-holder) exists.

---

### Test Case No: TC39
**Test Case Name:** Count Display in Filter Tabs

**Test Scenario:** Verify that counts are displayed in all filter tabs.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Verify count elements in each filter tab

**Expected Result:** Count elements exist for all filters: All (.all-count), Mine (.mine-count), Pending (.pending-count), Approved (.approved-count), Spam (.spam-count), and Trash (.trash-count).

---

### Test Case No: TC40
**Test Case Name:** Numeric Counts Display

**Test Scenario:** Verify that filter tabs display numeric counts.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Locate the All filter count
4. Verify it contains a numeric value

**Expected Result:** All filter count element contains a numeric value (matches pattern /\d+/).

---

### Test Case No: TC41
**Test Case Name:** Display Comment Actions

**Test Scenario:** Verify that comment action links appear when comments exist.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Check if comments exist
4. Hover over the first comment
5. Verify row actions are displayed

**Expected Result:** When comments exist, hovering over a comment displays the row actions menu, or logs "No comments to test actions on" if none exist.

---

### Test Case No: TC42
**Test Case Name:** Display Comment Structure

**Test Scenario:** Verify that comment structure is displayed correctly or shows empty state.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Check for comments in the list
4. Verify either comments exist or empty state message

**Expected Result:** Either comments exist in the list or "No comments found" message is displayed.

---

### Test Case No: TC43
**Test Case Name:** Reply Form Available

**Test Scenario:** Verify that the reply form elements are available in the page.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Verify reply row exists
4. Verify reply content textarea exists

**Expected Result:** Reply row (#replyrow) and reply content textarea (#replycontent) both exist.

---

### Test Case No: TC44
**Test Case Name:** Interact with Reply Form

**Test Scenario:** Verify that users can interact with the reply form when comments exist.

**Steps:**
1. Login to WordPress admin dashboard
2. Navigate to the comments page
3. Check if comments exist
4. Hover over the first comment
5. Click the Reply button/link
6. Verify reply form becomes visible
7. Click the Cancel button
8. Verify reply form becomes hidden

**Expected Result:** Reply form appears when Reply is clicked, and disappears when Cancel is clicked. If no comments exist or reply button not found, logs appropriate message.

---

**Total Test Cases: 44**
