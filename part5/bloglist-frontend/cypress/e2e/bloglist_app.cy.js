describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get("#username").type('root')
      cy.get('#password').type('salainen')
      cy.get('#login-btn').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get("#username").type('root')
      cy.get('#password').type('salainen1')
      cy.get('#login-btn').click()

      cy.contains('Invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      
      cy.login({ username: 'root', password: 'salainen' })
    })

    it('A blog can be created', function() {
      // ...
      cy.get('#toggle-form').click()
      cy.get('.title').type('Testing is nice...')
      cy.get('.author').type('James Testing')
      cy.get('.url').type('testing.com')
      cy.get('.create-btn').click()

      cy.contains('Testing is nice...')
      
    })

    describe('existing blogs', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'first author', url: 'first.url' })
        cy.createBlog({ title: 'sec blog', author: 'sec author', url: 'sec.url' })
      })

      it('A blog can be liked', function () {
        cy.contains('first blog').parent().find('button').as('btn')
        cy.get('@btn').click()
        cy.get('#likes').should('contain', 0)
        cy.get('#like').click()
        cy.get('#likes').should('contain', 1)
      })

      it('blog can be deleted', function () {
        cy.contains('first blog').parent().find('button').as('btn')
        cy.get('@btn').click()
        cy.get('#remove').click()
      })
    })

    describe('blogs sorted by likes', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'The title with the most likes', author: 'first author', url: 'first.url' })
        cy.createBlog({ title: 'The title with the second most likes', author: 'sec author', url: 'sec.url' })
      }) 

      it('first blog', function () {
        cy.contains('The title with the most likes').parent().find('button').as('btn')
        cy.get('@btn').click()
        cy.get('#like').click()
        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
      })
    })

  })
})
