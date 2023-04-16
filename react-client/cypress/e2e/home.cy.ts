// e2e testing for the home page.
// Obviously, home page is not built yet, so there are not many things to test.
describe('CLP homepage before authentication', () => {
    before(() => {
        cy.visit('/');
    });

    it('User can see the app name on the header', () => {
        cy.findByRole('link', { name: /codelikepro/i });
    });

    it('Users should see login and register buttons before auth', () => {
        cy.findByRole('link', { name: /login/i }).should('exist');
        cy.findByRole('link', { name: /register/i }).should('exist');
    });
});
