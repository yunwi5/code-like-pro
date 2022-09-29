// e2e testing for the exercise creation page.
describe('Exercise creation', () => {
    it('Can access the creation page after login', () => {
        cy.login();
        cy.visit('/create-exercise');

        cy.location().should((location) => {
            expect(location.pathname).equal('/create-exercise');
        });
    });

    const exampleExercise = {
        title: 'Example exercise',
        difficulty: 'Medium',
        language: 'nodejs',
        tags: ['Tag1', 'Tag2'],
    };

    it('Can type inputs to title, difficulty, language and tags', () => {
        cy.location().should((location) => {
            expect(location.pathname).equal('/create-exercise');
        });

        // Enter title and verify
        cy.findByRole('challenge-name', { name: /challenge name/i }).type(
            exampleExercise.title,
        );
        cy.findByRole('challenge-name', { name: /challenge name/i }).should(
            'have.value',
            exampleExercise.title,
        );

        // Enter difficulty and language, then verify
        cy.findByRole('combobox', {
            name: /difficulty:/i,
        }).select(exampleExercise.difficulty);
        cy.findByRole('combobox', {
            name: /difficulty:/i,
        }).should('have.value', exampleExercise.difficulty);

        cy.findByRole('combobox', {
            name: /language:/i,
        }).select(exampleExercise.language);
        cy.findByRole('combobox', {
            name: /language:/i,
        }).should('have.value', exampleExercise.language);

        // Enter multiple tags and verify if they are displayed.
        cy.findByRole('textbox', {
            name: /tags:/i,
        })
            .type(exampleExercise.tags[0])
            .type('{enter}')
            .type(exampleExercise.tags[1])
            .type('{enter}');

        // Verify entered tags exist
        cy.findByText(/tag1/i).should('exist');
        cy.findByText(/tag2/i).should('exist');

        // Write some prompt, and verify
    });

    it('Should write solution code and test cases', () => {
        cy.findByTestId('solution-code').should('exist');
    });

    it('Save draft works after refreshing the page', () => {
        cy.findByRole('button', {
            name: /save draft/i,
        }).click();

        // Re-visit the page and verify the inputs are stil there.
        cy.visit('/create-exercise');

        cy.findByRole('challenge-name', { name: /challenge name/i }).should(
            'have.value',
            exampleExercise.title,
        );
        cy.findByText(/tag1/i).should('exist');
        cy.findByText(/tag2/i).should('exist');
    });
});
