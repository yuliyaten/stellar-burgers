/// <reference types="cypress" />

const TEST_URL = 'http://localhost:4000';

describe('Burger constructor test', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit(TEST_URL);
    cy.wait('@getIngredients');
  });

  it('Buns, fillings, sauces test', () => {
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
      .should('exist')
      .find('button')
      .click({ force: true });
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .should('exist')
      .find('button')
      .click();
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"]')
      .should('exist')
      .find('button')
      .click();

    cy.get('[data-cy="constructor-bun-1"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy="constructor-ingredients"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('[data-cy="constructor-ingredients"]')
      .contains('Соус Spicy-X')
      .should('exist');
    cy.get('[data-cy="constructor-bun-2"]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });
});

describe('Modal test', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.viewport(1300, 800);
    cy.visit(TEST_URL);
    cy.wait('@getIngredients');

    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
      .should('exist')
      .click();
  });

  it('Modal open test', () => {
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy="modal-close-button"]').should('exist');
  });

  it('Modal close test', () => {
    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Modal close overlay test', () => {
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});

describe('Order placement test', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', '/api/auth/user', {
      fixture: 'userResponse.json'
    });
    cy.intercept('POST', '/api/orders', {
      fixture: 'orderResponse.json'
    }).as('createOrder');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');

    cy.viewport(1300, 800);
    cy.visit(TEST_URL);
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Order creation test', () => {
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa093c"]')
      .should('exist')
      .find('button')
      .click();
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0941"]')
      .should('exist')
      .find('button')
      .click();
    cy.get('[data-cy="ingredient-643d69a5c3f7b9001cfa0942"]')
      .should('exist')
      .find('button')
      .click();

    cy.get('[data-cy="order-button"] button').should('exist').click();
    cy.wait('@createOrder');

    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').contains('64471').should('exist');

    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="constructor-bun-1"]').should('not.exist');
    cy.get('[data-cy="constructor-ingredients"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get('[data-cy="constructor-ingredients"]')
      .contains('Соус Spicy-X')
      .should('not.exist');
    cy.get('[data-cy="constructor-bun-2"]').should('not.exist');
  });
});
