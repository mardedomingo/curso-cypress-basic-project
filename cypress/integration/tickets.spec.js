


describe('Tickets', () => {

    beforeEach(() => {

        cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html');
        cy.url().should('eq', 'https://ticket-box.s3.eu-central-1.amazonaws.com/index.html');

    });

    let ticketUser = {
        firstName: 'Mar',
        lastName: 'Soares',
        email: 'mar-soares@gmail.com',
        request: 'Pepsi Twist'
    }
    
    it('The page is avaliabe', () => {
        cy.get('header h1').should('contain','TICKETBOX');
    });

    it('Fills all the text input fields', () => {
        cy.get('#first-name').type(ticketUser.firstName);
        cy.get('#last-name').type(ticketUser.lastName);
        cy.get('#email').type(ticketUser.email);
        cy.get('#requests').type(ticketUser.request);
        cy.get('#signature').type(`${ticketUser.firstName} ${ticketUser.lastName}`);
    })

    it('Select tickets are possible', () => {
        cy.get('#ticket-quantity').select('1');
        cy.get('#ticket-quantity').select('2');
        cy.get('#ticket-quantity').select('3');
        cy.get('#ticket-quantity').select('4');      
    })

    it('It is possible select a option in radio buttons', () => {
        cy.get('#vip').check();
        cy.get('#general').check();
    })

    it('Checkboxes are possible to check and uncheck', () => {
        cy.get('#friend').check();
        cy.get('#publication').check();
        cy.get('#social-media').check();
        cy.get('#friend').uncheck();
        cy.get('#publication').uncheck();
        cy.get('#social-media').uncheck();
    })

    it('The page should alert when were write a invalid email', () => {
        
        let email = 'mar-soares.com.br';

        cy.get('#first-name').type(ticketUser.firstName);
        cy.get('#last-name').type(ticketUser.lastName);
        cy.get('#email')
            .as('email')
            .type(email);
        cy.get('#email.invalid').should('exist');
        cy.get('@email')
            .clear()
            .type(ticketUser.email);
        cy.get('#email.invalid').should('not.exist');
        cy.get('#requests').type(ticketUser.request);
        cy.get('#signature').type(`${ticketUser.firstName} ${ticketUser.lastName}`);
    })

    it('Validate reset and confirmation button', () => {
        
        const fullName = `${ticketUser.firstName} ${ticketUser.lastName}`;
        
        cy.get('#first-name').type(ticketUser.firstName);
        cy.get('#last-name').type(ticketUser.lastName);
        cy.get('#email').type(ticketUser.email);
        cy.get('#ticket-quantity').select('2');
        cy.get('#vip').check();
        cy.get('#friend').check();
        cy.get('#requests').type(ticketUser.request);
        cy.get('.agreement p').should(
            'contain',
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        )
        cy.get('#agree').click();
        cy.get('#signature').type(fullName);
        cy.get('button[type="submit"]')
            .as('submitButton')
            .should('not.be.disabled');
        cy.get('button[type="reset"]').click();
        cy.get('@submitButton').should('be.disabled');
    })

    it('Fills mandatory fields using support command', () => {
        const costumer = {
            firstName: 'Nêmesis',
            lastName: 'Lima',
            email: 'nemesis-lima@gmail.com'
        }

        cy.fillMandatoryFields(costumer);

        cy.get('button[type="submit"]')
            .as('submitButton')
            .should('not.be.disabled');
        
        cy.get('#agree').uncheck();
        cy.get('@submitButton').should('be.disabled');
    })
})