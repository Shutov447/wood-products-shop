import hexRgb from 'hex-rgb';

export const testNavbar = (hostRoute: string, standalone = false) => {
    describe('NavbarComponent', () => {
        beforeEach(() => {
            if (standalone) cy.visit(hostRoute);
        });

        it('should render', () => {
            cy.getBySel('navbar').should('be.visible');
        });

        describe('routes', () => {
            const rgbArr = hexRgb('#ffd6a8', { format: 'array' });
            const rgb = `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`;

            describe('/', () => {
                it('logo should route to home', () => {
                    cy.getBySel('navbar-logo').click();
                    cy.url().should('include', '/');
                });
            });

            describe('/delivery', () => {
                it('link "Доставка" should route to delivery', () => {
                    cy.contains('Доставка').click();
                    cy.url().should('include', '/delivery');
                });

                it('должен перекрашиваться при наведении на нее курсора', () => {
                    cy.contains('Доставка').realHover();
                    cy.contains('Доставка').should('have.css', 'color', rgb);
                });
            });

            describe('/articles', () => {
                it('link "Статьи" should route to articles', () => {
                    cy.contains('Статьи').click();
                    cy.url().should('include', '/articles');
                });

                it('должен перекрашиваться при наведении на нее курсора', () => {
                    cy.contains('Статьи').realHover();
                    cy.contains('Статьи').should('have.css', 'color', rgb);
                });
            });

            describe('/about-us', () => {
                it('link "О нас" should route to about-us', () => {
                    cy.contains('О нас').click();
                    cy.url().should('include', '/about-us');
                });

                it('должен перекрашиваться при наведении на нее курсора', () => {
                    cy.contains('О нас').realHover();
                    cy.contains('О нас').should('have.css', 'color', rgb);
                });
            });

            describe('/contacts', () => {
                it('link "Контакты" should route to contacts', () => {
                    cy.contains('Контакты').click();
                    cy.url().should('include', '/contacts');
                });

                it('должен перекрашиваться при наведении на нее курсора', () => {
                    cy.contains('Контакты').realHover();
                    cy.contains('Контакты').should('have.css', 'color', rgb);
                });
            });

            describe('link "каталог"', () => {
                it('should route to catalog', () => {
                    cy.contains('каталог').click();
                    cy.url().should('include', '/catalog');
                });

                it('должен перекрашиваться при наведении на нее курсора', () => {
                    const catRgbArr = hexRgb('#926341', { format: 'array' });
                    const catRgb = `rgb(${catRgbArr[0]}, ${catRgbArr[1]}, ${catRgbArr[2]})`;

                    cy.contains('каталог').realHover();
                    cy.contains('каталог').should(
                        'have.css',
                        'background-color',
                        catRgb,
                    );
                });
            });
        });

        describe('contacts info', () => {
            it('should have support email', () => {
                cy.getBySel('navbar-support-email').should(
                    'contain',
                    'support@sofiadoors.com',
                );
            });

            it('should have phone number', () => {
                cy.getBySel('navbar-phone-number').should(
                    'contain',
                    '8 (800) 550-81-79',
                );
            });
        });
    });
};

testNavbar('/', true);
