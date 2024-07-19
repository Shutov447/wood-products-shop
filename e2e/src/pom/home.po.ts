class HomePage {
    has() {
        cy.getBySel('home-page');

        return this;
    }
}

export const homePage = new HomePage();
