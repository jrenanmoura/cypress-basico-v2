/// <reference types="Cypress" />


Cypress._.times(3, function(){
    it('testa a pagina de politica de privacidade de forma independente',function(){
        cy.visit('./src/privacy.html')
        cy.get('#title')
       .should('have.text','CAC TAT - Política de privacidade')
      })
    

})
        

