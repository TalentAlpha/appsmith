const dsl = require("../../../../fixtures/emptyDSL.json");
const explorer = require("../../../../locators/explorerlocators.json");

describe("Switchgroup Widget Functionality", function() {
  before(() => {
    cy.addDsl(dsl);
    cy.wait(5000);
  });

  it("1. Add a new switch group widget with others", () => {
    cy.get(explorer.addWidget).click();
    cy.dragAndDropToCanvas("switchgroupwidget", { x: 300, y: 300 });
    cy.get(".t--widget-switchgroupwidget").should("exist");
    cy.dragAndDropToCanvas("checkboxgroupwidget", { x: 300, y: 500 });
    cy.get(".t--widget-checkboxgroupwidget").should("exist");
    cy.dragAndDropToCanvas("textwidget", { x: 300, y: 700 });
    cy.get(".t--widget-textwidget").should("exist");
    cy.updateCodeInput(
      ".t--property-control-text",
      `{{SwitchGroup1.selectedValues}}`,
    );
  });

  it("2. Should check that empty value is allowed in options", () => {
    cy.openPropertyPane("switchgroupwidget");
    cy.updateCodeInput(
      ".t--property-control-options",
      `[
        {
          "label": "Blue",
          "value": ""
        },
        {
          "label": "Green",
          "value": "GREEN"
        },
        {
          "label": "Red",
          "value": "RED"
        }
      ]`,
    );
    cy.get(".t--property-control-options .t--codemirror-has-error").should(
      "not.exist",
    );
  });

  it("3. Should check that more thatn empty value is not allowed in options", () => {
    cy.openPropertyPane("switchgroupwidget");
    cy.updateCodeInput(
      ".t--property-control-options",
      `[
        {
          "label": "Blue",
          "value": ""
        },
        {
          "label": "Green",
          "value": ""
        },
        {
          "label": "Red",
          "value": "RED"
        }
      ]`,
    );
    cy.get(".t--property-control-options .t--codemirror-has-error").should(
      "exist",
    );
  });

  it("4. Setting selectedValues to undefined does not crash the app", () => {
    // Reset options for switch group
    cy.openPropertyPane("switchgroupwidget");
    cy.updateCodeInput(
      ".t--property-control-options",
      `[
        {
          "label": "Blue",
          "value": "BLUE"
        },
        {
          "label": "Green",
          "value": "GREEN"
        },
        {
          "label": "Red",
          "value": "RED"
        }
      ]`,
    );
    // throw a cyclic dependency error from checkbox group
    cy.openPropertyPane("checkboxgroupwidget");
    cy.get(".t--property-control-options input")
      .eq(1)
      .click({ force: true })
      .type("{{BLUE}}", { parseSpecialCharSequences: false });

    cy.get(".t--property-control-options")
      .find(".t--js-toggle")
      .trigger("click")
      .wait(1000);
    // wait for a cyclic dependency error to occur
    cy.validateToastMessage("Cyclic dependency found while evaluating");
    // check if a crash messsge is appeared
    cy.get(".t--widget-switchgroupwidget")
      .contains("Oops, Something went wrong.")
      .should("not.exist");
    cy.wait(1000);
    // check if the evaluation is disabled
    cy.get(".t--widget-textwidget").should(
      "contain",
      `{{SwitchGroup1.selectedValues}}`,
    );
  });
});
