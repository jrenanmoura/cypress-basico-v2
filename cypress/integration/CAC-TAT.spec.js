
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach( function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
       
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  
    })

    it('Deve exibir mensagem de erro ao submeter formulário com email inválido', () => {
        cy.get('#email').type('emailinválido.com')
        cy.contains('button', 'Enviar' ).click()
        cy.get('.error').should('be.visible')

    })


const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sunt in culpa qui officia deserunt mollit anim id est laborum."
    it('Preencha os campos do formulário', function(){
        cy.get('#firstName').type('Renan')
        cy.get('#lastName').type('Moura')
        cy.get('#email').type('nemorenan@lindo.com.br')
        cy.get('#open-text-area').type(text, {delay : 0})
        cy.contains('button', 'Enviar' ).click()
        cy.get('.success').should('be.visible')
    })

    it('numero de telefone com string tem que permanecer vazio', function(){
        cy.get('#phone').type('abcdfghj').should('have.value','')
    
    })

    it('Preencha os campos do formulário', function(){
        cy.get('#firstName').type('Renan')
        cy.get('#lastName').type('Moura')
        cy.get('#email').type('nemorenan@lindo.com.br')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type(text, {delay : 0})
        cy.contains('button', 'Enviar' ).click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{

        cy.get('#firstName')
        .type('Renan')
        .should('have.value', 'Renan')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Moura')
        .should('have.value', 'Moura')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('renan@lindo.com.br')
        .should('have.value', 'renan@lindo.com.br')
        .clear()
        .should('have.value', '')

        cy.get('#open-text-area')
        .type(text,{delay : 0})
        .should('have.value', text)
        .clear()
        .should('have.value', '')

        
        cy.get('#phone')
        .type('12345678')
        .should('have.value', '12345678')
        .clear()
        .should('have.value', '')
       
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar' ).click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', ()=>{
        cy.fillMandatoryFieldsAndSubmit()
    })

    
  })