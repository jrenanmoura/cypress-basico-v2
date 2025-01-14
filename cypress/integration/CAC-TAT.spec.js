
/// <reference types="Cypress" />

const { should } = require("chai")
const tempoMS = 3000

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
    it('Preencha os campos obrigatórios e envia o formulário', function(){

        cy.clock()

        cy.get('#firstName').type('Renan')
        cy.get('#lastName').type('Moura')
        cy.get('#email').type('nemorenan@lindo.com.br')
        cy.get('#open-text-area').type(text, {delay : 0})
        cy.contains('button', 'Enviar' ).click()
        cy.get('.success').should('be.visible')

        cy.tick(tempoMS)

        cy.get('.success').should('not.be.visible')

        
    })

    it('numero de telefone com string tem que permanecer vazio', function(){
        cy.get('#phone').type('abcdfghj').should('have.value','')
    
    })

    it('Preencha os campos do formulário', function(){

        cy.clock()
        cy.get('#firstName').type('Renan')
        cy.get('#lastName').type('Moura')
        cy.get('#email').type('nemorenan@lindo.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(text, {delay : 0})
        cy.contains('button', 'Enviar' ).click()
        cy.get('.error').should('be.visible')

        cy.tick(tempoMS)

        cy.get('.error').should('not.be.visible')

        
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
        cy.clock()
        cy.contains('button', 'Enviar' ).click() 
        cy.get('.error').should('be.visible')
        cy.tick(tempoMS)
        cy.get('.error').should('not.be.visible')
        
    })

    it('exibe  e esconde mensagem de sucesso e erro usando o .invoke()', function(){
        cy.clock()
        cy.contains('button', 'Enviar' )
        .click() 

        cy.get('.error')
        .should('be.visible')

        cy.tick(tempoMS)

        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')

        cy.tick(5000)

        cy.get('#firstName').type('Renan')
        cy.get('#lastName').type('Moura')
        cy.get('#email').type('nemorenan@lindo.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(text, {delay : 0})
        cy.contains('button', 'Enviar' ).click()
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')


        cy.tick(tempoMS)

        cy.get('.error').should('not.be.visible')
    })

        

    it('envia o formuário com sucesso usando um comando customizado', ()=>{
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('#support-type > label:nth-child(4) > input[type=radio]')
        .check()
        .should('have.value', 'feedback')
    })
    it('marca cada tipo de atendimento', function(){
        cy.get('#support-type > > input[type=radio]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
         })
       
    })

    it('marca ambos checkboxes, depois desmarca o ultimo', function() {
        cy.get('#email-checkbox,#phone-checkbox ')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    
    it('seleciona um arquivo da pasta fixtures', ()=>{
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-ad-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'} )
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
    })
    
  })

  it('seleciona um arquivo utilizanado uma fixture para a qual foi dada um alias ', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')

        })

  })

  it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')

  })

  it('acessa a pagina de politica de privacidade removendo o target e então clicando no link', function(){
        
     
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')


  })

  it('preenche a area de texto usando o comando .invoke', function(){
    const textlonger = Cypress._.repeat(' texto de teste ', 20)
    cy.get('#open-text-area')
    .invoke('val', textlonger)
    .should('have.value', textlonger)
  })

  it('faz uma requisição HTTP',function(){
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .should(function(response){
        const { status, statusText, body} = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')

    })
  })

  it('encontrar tags ocultas', function(){

    cy.get('#cat')
    .invoke('show')
        .should('be.visible')
        cy.get('#title')
        .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
  })

  })