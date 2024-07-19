/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
declare namespace Cypress {
    interface Chainable<Subject> {
        getBySel(
            selector: string,
            ...args: any[]
        ): Chainable<JQuery<HTMLElement>>;
        getBySelLike(
            selector: string,
            ...args: any[]
        ): Chainable<JQuery<HTMLElement>>;
    }
}

Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
    return cy.get(`[data-cy*=${selector}]`, ...args);
});
