// e2e testing for the register page functionalities.
// Will not register the actual user, as this is only for testing.
describe('Register page', () => {
    it('Users can move to login page if they are already registered', () => {
        cy.visit('/register');
        // Find and click the login link on the login page.
        cy.findByRole('link', { name: /log\s*in here/i }).click();

        // Verify if the user has moved to the register page.
        cy.location().should((location) => {
            expect(location.pathname).equal('/login');
        });
    });

    it('Users cannot submit if name, email or password is empty', () => {
        cy.visit('/register');
        // Enter nothing and submit.
        cy.get('button[type=submit]').click();

        // See if error messages are displayed to the user
        cy.findByText(/name is required/i).should('exist');
        cy.findByText(/email is required/i).should('exist');
        cy.findByText(/password is required/i).should('exist');

        // Enter name and submit.
        cy.get('input[name=name]').type('john doe');
        cy.get('button[type=submit]').click();

        // Verify there are error messages for email and password
        cy.findByText(/name is required/i).should('not.exist');
        cy.findByText(/email is required/i).should('exist');
        cy.findByText(/password is required/i).should('exist');

        // Enter email and submit.
        cy.get('input[name=email]').type('johndoe@gmail.com');
        cy.get('button[type=submit]').click();

        // Verify  there are error messages for password
        cy.findByText(/email is required/i).should('not.exist');
        cy.findByText(/password is required/i).should('exist');

        // After typing at least 7 letters of password, there should be no error messages displayed.
        cy.get('input[name=password]').type('johndoe789');
        cy.findByText(/password is required/i).should('not.exist');
    });

    it('Users cannot submit with short name or insecure password', () => {
        cy.visit('/register');
        // Enter nothing and submit.

        // Username less than 3 is too short
        cy.get('input[name=name]').type('jo');
        cy.get('input[name=email]').type('johndoe@gmail.com');
        // Password should be at least 7 characters
        cy.get('input[name=password]').type('pass');

        // Submit with too short name and password
        cy.get('button[type=submit]').click();

        // username error message displayed
        cy.findByText(/username is too short/i).should('exist');
        // Password error message displayed
        cy.findByText(/password should be at least \d+ characters/i).should('exist');
    });
});
