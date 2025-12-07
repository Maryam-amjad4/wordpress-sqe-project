describe("Comments Management", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    // Login before accessing admin pages
    cy.wpLogin();
    cy.visit("http://localhost:8082/wp-admin/edit-comments.php");
  });

  describe("Page Load and Structure", () => {
    it("TC1 - should load the comments page successfully", () => {
      cy.url().should("include", "/wp-admin/edit-comments.php");
      cy.get("h1.wp-heading-inline").should("contain", "Comments");
    });

    it("TC2 - should display all filter tabs", () => {
      cy.get(".subsubsub li").should("have.length", 6);
      cy.get(".subsubsub").within(() => {
        cy.contains("All").should("be.visible");
        cy.contains("Mine").should("be.visible");
        cy.contains("Pending").should("be.visible");
        cy.contains("Approved").should("be.visible");
        cy.contains("Spam").should("be.visible");
        cy.contains("Trash").should("be.visible");
      });
    });

    it("TC3 - should display the comments table with correct headers", () => {
      cy.get("table.wp-list-table").should("be.visible");
      cy.get("thead th#author").should("contain", "Author");
      cy.get("thead th#comment").should("contain", "Comment");
      cy.get("thead th#response").should("contain", "In response to");
      cy.get("thead th#date").should("contain", "Submitted on");
    });

    it("TC4 - should display comments table or empty state", () => {
      cy.get("table.wp-list-table tbody").should("exist");
      // May show "No comments found" or actual comments
      cy.get("body").then(($body) => {
        if ($body.find(".no-items").length > 0) {
          cy.get(".no-items").should("contain", "No comments found.");
        } else {
          cy.get("#the-comment-list tr").should("have.length.at.least", 1);
        }
      });
    });
  });

  describe("Bulk Actions", () => {
    it("TC5 - should display table structure with bulk action elements", () => {
      // Bulk action selectors exist even when there are no comments
      cy.get("body").then(($body) => {
        if ($body.find(".no-items").length === 0) {
          // Comments exist - check bulk actions
          cy.get("#bulk-action-selector-top").should("be.visible");
          cy.get("#bulk-action-selector-bottom").should("exist");
        } else {
          // No comments - just verify table structure exists
          cy.get("table.wp-list-table").should("exist");
        }
      });
    });
  });

  describe("Checkbox Selection", () => {
    it("TC6 - should have select all checkboxes in table", () => {
      cy.get("#cb-select-all-1").should("exist").and("have.attr", "type", "checkbox");
      cy.get("#cb-select-all-2").should("exist").and("have.attr", "type", "checkbox");
    });

    it("TC7 - should be able to toggle select all checkbox", () => {
      cy.get("#cb-select-all-1").should("not.be.checked");
      cy.get("#cb-select-all-1").check({ force: true });
      cy.get("#cb-select-all-1").should("be.checked");
      cy.get("#cb-select-all-1").uncheck({ force: true });
      cy.get("#cb-select-all-1").should("not.be.checked");
    });

    it("TC8 - should be able to select individual comment if comments exist", () => {
      cy.get("body").then(($body) => {
        if ($body.find("#the-comment-list tr").length > 0) {
          cy.get("#the-comment-list tr").first().find('input[type="checkbox"]').check({ force: true });
          cy.get("#the-comment-list tr").first().find('input[type="checkbox"]').should("be.checked");
        } else {
          cy.log("No comments to select");
        }
      });
    });
  });

  describe("Filter Navigation", () => {
    it("TC9 - should navigate to All comments filter", () => {
      cy.get(".subsubsub a").contains("All").click();
      cy.url().should("include", "comment_status=all");
      cy.get(".subsubsub .current").should("contain", "All");
    });

    it("TC10 - should navigate to Mine filter", () => {
      cy.get(".subsubsub a").contains("Mine").click();
      cy.url().should("include", "comment_status=mine");
    });

    it("TC11 - should navigate to Pending filter", () => {
      cy.get(".subsubsub a").contains("Pending").click();
      cy.url().should("include", "comment_status=moderated");
    });

    it("TC12 - should navigate to Approved filter", () => {
      cy.get(".subsubsub a").contains("Approved").click();
      cy.url().should("include", "comment_status=approved");
    });

    it("TC13 - should navigate to Spam filter", () => {
      cy.get(".subsubsub a").contains("Spam").click();
      cy.url().should("include", "comment_status=spam");
    });

    it("TC14 - should navigate to Trash filter", () => {
      cy.get(".subsubsub a").contains("Trash").click();
      cy.url().should("include", "comment_status=trash");
    });
  });

  describe("Screen Options", () => {
    it("TC15 - should open screen options panel", () => {
      cy.get("#show-settings-link").should("be.visible").click();
      cy.get("#screen-options-wrap").should("be.visible");
    });

    it("TC16 - should display column visibility toggles", () => {
      cy.get("#show-settings-link").click();
      cy.get("#author-hide").should("be.visible");
      cy.get("#response-hide").should("be.visible");
      cy.get("#date-hide").should("be.visible");
    });

    it("TC17 - should display pagination settings", () => {
      cy.get("#show-settings-link").click();
      cy.get("#edit_comments_per_page").should("be.visible").and("have.value", "20");
    });

    it("TC18 - should display view mode options", () => {
      cy.get("#show-settings-link").click();
      cy.get("#list-view-mode").should("be.visible").and("be.checked");
      cy.get("#excerpt-view-mode").should("be.visible");
    });

    it("TC19 - should have apply button in screen options", () => {
      cy.get("#show-settings-link").click();
      cy.get("#screen-options-apply").should("be.visible").and("contain", "Apply");
    });
  });

  describe("Help Panel", () => {
    it("TC20 - should open contextual help panel", () => {
      cy.get("#contextual-help-link").should("be.visible").click();
      cy.get("#contextual-help-wrap").should("be.visible");
    });

    it("TC21 - should display help tabs", () => {
      cy.get("#contextual-help-link").click();
      cy.get("#tab-link-overview").should("be.visible");
      cy.get("#tab-link-moderating-comments").should("be.visible");
    });

    it("TC22 - should switch between help tabs", () => {
      cy.get("#contextual-help-link").click();
      cy.get("#tab-link-moderating-comments a").click();
      cy.get("#tab-panel-moderating-comments").should("have.class", "active");
    });
  });

  describe("Sorting Functionality", () => {
    it("TC23 - should have sortable columns", () => {
      cy.get("th#author").should("exist");
      cy.get("th#response").should("exist");
      cy.get("th#date").should("exist");
    });

    it("TC24 - should sort by author when clicking Author header", () => {
      cy.get("th#author a").click();
      cy.url().should("include", "orderby=comment_author");
    });

    it("TC25 - should sort by post when clicking Response header", () => {
      cy.get("th#response a").click();
      cy.url().should("include", "orderby=comment_post_ID");
    });

    it("TC26 - should sort by date when clicking Date header", () => {
      cy.get("th#date a").click();
      cy.url().should("include", "orderby=comment_date");
    });
  });

  describe("Form Elements", () => {
    it("TC27 - should have comments form with correct attributes", () => {
      cy.get("#comments-form").should("have.attr", "method", "get");
    });

    it("TC28 - should have hidden input fields", () => {
      cy.get('input[name="comment_status"]').should("have.value", "all");
      cy.get('input[name="_per_page"]').should("have.value", "20");
      cy.get('input[name="_page"]').should("have.value", "1");
    });

    it("TC29 - should have AJAX nonce field", () => {
      cy.get('input[name="_ajax_fetch_list_nonce"]').should("exist");
    });
  });

  describe("Admin Bar Integration", () => {
    it("TC30 - should display admin bar with comments link", () => {
      cy.get("#wpadminbar").should("be.visible");
      cy.get("#wp-admin-bar-comments").should("be.visible");
    });

    it("TC31 - should show comment count in admin bar", () => {
      cy.get("#wp-admin-bar-comments .ab-label").should("contain", "0");
    });
  });

  describe("Responsive Elements", () => {
    it("TC32 - should display collapse menu button", () => {
      cy.get("#collapse-button").should("be.visible");
    });

    it("TC33 - should have proper ARIA labels for accessibility", () => {
      cy.get("#cb-select-all-1").should("have.attr", "type", "checkbox");
      cy.get("#cb-select-all-1").siblings("label").should("exist");
      cy.get("h1.wp-heading-inline").should("be.visible");
    });
  });

  describe("Comment Reply Interface", () => {
    it("TC34 - should have hidden reply form", () => {
      cy.get("#replyrow").should("exist").and("not.be.visible");
    });

    it("TC35 - should have reply content textarea", () => {
      cy.get("#replycontent").should("exist");
    });

    it("TC36 - should have reply form buttons", () => {
      cy.get("#replysubmit .save").should("exist");
      cy.get("#replysubmit .cancel").should("exist");
    });
  });

  describe("Undo Functionality", () => {
    it("TC37 - should have trash undo holder", () => {
      cy.get("#trash-undo-holder").should("exist");
    });

    it("TC38 - should have spam undo holder", () => {
      cy.get("#spam-undo-holder").should("exist");
    });
  });

  describe("Count Display", () => {
    it("TC39 - should display counts in all filter tabs", () => {
      cy.get(".subsubsub .all .all-count").should("exist");
      cy.get(".subsubsub .mine-count").should("exist");
      cy.get(".subsubsub .pending-count").should("exist");
      cy.get(".subsubsub .approved-count").should("exist");
      cy.get(".subsubsub .spam-count").should("exist");
      cy.get(".subsubsub .trash-count").should("exist");
    });

    it("TC40 - should display numeric counts", () => {
      cy.get(".subsubsub .all .all-count").invoke("text").should("match", /\d+/);
    });
  });

  describe("Comment Actions", () => {
    it("TC41 - should display comment actions when comments exist", () => {
      cy.get("body").then(($body) => {
        if ($body.find("#the-comment-list tr").length > 0) {
          cy.get("#the-comment-list tr").first().trigger("mouseover");
          cy.get("#the-comment-list tr").first().find(".row-actions").should("exist");
        } else {
          cy.log("No comments to test actions on");
        }
      });
    });

    it("TC42 - should display comment structure when comments exist", () => {
      cy.get("body").then(($body) => {
        if ($body.find("#the-comment-list tr").length > 0) {
          cy.get("#the-comment-list tr").first().should("exist");
        } else {
          cy.get(".no-items").should("contain", "No comments found");
        }
      });
    });
  });

  describe("Comment Reply Functionality", () => {
    it("TC43 - should have reply form available", () => {
      cy.get("#replyrow").should("exist");
      cy.get("#replycontent").should("exist");
    });

    it("TC44 - should be able to interact with reply form when comments exist", () => {
      cy.get("body").then(($body) => {
        if ($body.find("#the-comment-list tr").length > 0 && $body.find(".row-actions .reply").length > 0) {
          cy.get("#the-comment-list tr").first().trigger("mouseover", { force: true });
          cy.get("#the-comment-list tr").first().within(() => {
            cy.get(".row-actions .reply button, .row-actions .reply a").first().click({ force: true });
          });
          cy.get("#replyrow").should("be.visible");
          cy.get("#replysubmit .cancel").click();
          cy.get("#replyrow").should("not.be.visible");
        } else {
          cy.log("No comments to test reply on or reply button not found");
        }
      });
    });
  });
});
