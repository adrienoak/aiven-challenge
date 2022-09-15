/// <reference types="cypress" />

import { API_URL } from "../../../src/api/service";

import data from "../../../mock.json";

// https://github.com/cypress-io/cypress/issues/2671
function fakeLocation(
  latitude?: number,
  longitude?: number
): Partial<Cypress.VisitOptions> {
  return {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
        (cb, err) => {
          if (latitude && longitude) {
            return cb({ coords: { latitude, longitude } });
          }
          throw err({ code: 1 });
        }
      );
    },
  };
}

describe("home page", () => {
  it("if no geolocation button should be disabled", () => {
    cy.intercept(API_URL, {
      body: {
        clouds: data,
      },
    });

    cy.visit("http://localhost:5174", fakeLocation());
    cy.contains(/proximity/i)
      .should("be.disabled")
      .click({ force: true });

    cy.url().should("not.contain", "proximity");
  });

  it("if geolocation is enabled, button should be enabled", () => {
    cy.intercept(API_URL, {
      body: {
        clouds: data,
      },
    });

    cy.visit("http://localhost:5174", fakeLocation(1, 1));
    cy.contains(/proximity/i).should("be.enabled");
  });

  it("immediately populates data", () => {
    cy.intercept(API_URL, {
      body: {
        clouds: data,
      },
    });

    cy.visit("http://localhost:5174", fakeLocation(1, 1));
    cy.url().should("contain", "aws");
    cy.contains(/azure/i).click();
    cy.url().should("contain", "provider=azure");
    cy.contains(/africa/i).should("not.be.undefined");
  });

  it("should redirect after a while if no geolocation is provided", () => {
    cy.intercept(API_URL, {
      body: {
        clouds: data,
      },
    });

    cy.clock();
    const url = "http://localhost:5174/proximity";
    cy.visit(url);

    cy.contains("This feature does not work");

    cy.tick(6000);

    cy.url().should("not.eq", url);
    cy.url().should("contain", url.split("/proximity")[0]);
  });

  it("should peacefully go between pages", () => {
    cy.intercept(API_URL, {
      body: {
        clouds: data,
      },
    });

    cy.clock();
    const url = "http://localhost:5174";
    cy.visit(url, fakeLocation(1, 1));

    cy.contains(/region/i).click();
    cy.url().should("contain", "region");

    cy.contains(/proximity/i).click();
    cy.url().should("contain", "proximity");
  });
});
