Cypress.Commands.add('factoryBot', (method, ...args) => {
  cy.task('cypressRailsSocketConnector', {class: 'FactoryBot', method, args});
});
