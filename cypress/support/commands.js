Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sunt in culpa qui officia deserunt mollit anim id est laborum."
    
        cy.get('#firstName').type('Renan')
        cy.get('#lastName').type('Moura')
        cy.get('#email').type('nemorenan@lindo.com.br')
        cy.get('#open-text-area').type(text, {delay : 0})
        cy.contains('button', 'Enviar' ).click()
        cy.get('.success').should('be.visible')
} )
