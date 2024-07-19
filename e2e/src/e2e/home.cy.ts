import { homePage } from '../pom';
import { testNavbar } from './navbar.cy';

describe('HomeComponent', () => {
    const hostRoute = '/';
    beforeEach(() => {
        cy.visit(hostRoute);
    });

    it('should render the home page', () => {
        homePage.has();
    });

    testNavbar(hostRoute);
});
