

describe('Blog app', function() {
/*     beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.visit('http://localhost:3000')
    }) */
  
    it('Login from is shown', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Great blogs')
        cy.contains('Login')

    })

    describe('Login',function() {

       it('succeeds with correct credentials', function() {
        cy.contains('Login').click()
        cy.get('input:first').type('root')
        cy.get('input:last').type('salainen')
        cy.get('#login-button').click()
        cy.contains('root - LOGOUT')
        cy.get('#logout-button').click()
      })

      it('fails with wrong credentials', function() {
        cy.contains('Login').click()
        cy.get('input:first').type('root')
        cy.get('input:last').type('wrong')
        cy.get('#login-button').click()
        cy.contains('Wrong password')
        cy.get('html').should('not.contain', 'root')
      })
    })

      describe.only('When logged in', function() {
      beforeEach(function() {
        cy.wait(3000)
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('input:first').type('root')
        cy.get('input:last').type('salainen')
        cy.get('#login-button').click()
        cy.contains('root - LOGOUT')
      })
  
      it('A blog can be created', function() {
        cy.contains('Create new blog').click()
        cy.get('#blogTitle').type('blogTitle created by cypress')
        cy.get('#blogAuthor').type('blogAuthor created by cypress')
        cy.get('#createButton').click()
        cy.contains('blogTitle created by cypress')
        cy.contains('blogAuthor created by cypress')
        cy.get('#logout-button').click()
      })
    })
})


