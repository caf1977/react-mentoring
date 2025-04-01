describe('Counter E2E testing', () => {
  it('Renders component', () => {
    cy.visit('http://localhost:3000');
    
    cy.contains('Value: 0');
    cy.get('[data="increment"]').should('exist');
    cy.get('[data="decrement"]').should('exist');
  })

  it('Increments value', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Value: 0');
    cy.get('[data="increment"]').click();
    cy.contains('Value: 1');
  })

  it('Decrements value', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Value: 0');
    cy.get('[data="decrement"]').click();
    cy.contains('Value: -1');
  })

  it('Multiple clicks', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Value: 0');
    cy.get('[data="increment"]').click();
    cy.get('[data="increment"]').click();
    cy.get('[data="increment"]').click();
    cy.get('[data="increment"]').click();
    cy.get('[data="decrement"]').click();
    cy.get('[data="decrement"]').click();
    cy.contains('Value: 2');
  })
})