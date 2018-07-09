Cypress.Commands.add('databaseCleaner', (method, args) => {
  cy.task('cypressRailsSocketConnector', {class: 'DatabaseCleaner', method, args});
});
