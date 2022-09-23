const testUserCredentials = {
    email: 'johndoe@gmail.com',
    password: 'johndoe789',
};

// e2e testing for the login page.
describe('CLP login', () => {
    before(() => {
        cy.visit('/login');
    });

    it('Users can move to register page if they are not registered', () => {
        // Find and click the Sign up link on the login page.
        cy.findByRole('link', { name: /sign up here/i }).click();

        // Verify if the user has moved to the register page.
        cy.location().should((location) => {
            expect(location.pathname).equal('/register');
        });
    });

    it('Users cannot submit if email or password is empty', () => {
        cy.visit('/login');
        cy.get('button[type=submit]').click();

        // Users stay at login page
        cy.location().should((location) => {
            expect(location.pathname).equal('/login');
        });

        // If the fields are empty, appropriate error messages are displayed on the screen.
        cy.findByText(/email is required/i).should('exist');
        cy.findByText(/password is required/i).should('exist');
    });

    it('Users entering invalid credentials should stay in login page and show error message', () => {
        cy.visit('/login');
        cy.get('input[name=email]').type(testUserCredentials.email);
        cy.get('input[name=password]').type('wrong-password');
        cy.get('button[type=submit]').click();

        //Auth user error message should be displayed when the credentials incorrect
        cy.findByText(/your email or password are incorrect/i).should('exist');
        cy.location().should((location) => {
            expect(location.pathname).equal('/login');
        });
    });

    it('Users cannot submit if the password is too short', () => {
        cy.visit('/login');
        cy.get('input[name=email]').type(testUserCredentials.email);
        cy.get('input[name=password]').type('123');
        cy.get('button[type=submit]').click();

        // Password error message is displayed if the password is too short
        cy.findByText(/Password should be at least \d+ characters/i).should('exist');
        cy.location().should((location) => {
            expect(location.pathname).equal('/login');
        });
    });

    it('Users can login with the valid credentials', () => {
        cy.visit('/login');
        cy.get('input[name=email]').type(testUserCredentials.email);
        cy.get('input[name=password]').type(testUserCredentials.password);
        cy.get('button[type=submit]').click();

        // Successful login redirects to the homepage.
        cy.location().should((location) => {
            expect(location.pathname).equal('/');
        });
    });
});
