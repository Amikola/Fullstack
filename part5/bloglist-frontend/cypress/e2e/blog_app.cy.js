describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'Root',name: "admin", password: 'admin'
    }).then(response => {})
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'Second',name: "Toinen", password: 'second'
    }).then(response => {})


  cy.visit('http://localhost:5173')
  })

  describe('Log in works', function() {
  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })


  it('Login functionality works', function() {
  
    cy.visit('http://localhost:5173/')
    cy.get('#username').type('Root111')
    cy.get('#password').type('Admin')
    cy.get('#login-button').click()
    cy.contains('wrong credentials')

    cy.get('#username').type('Root')
    cy.get('#password').type('admin')
    cy.get('#login-button').click()
    cy.contains('admin logged in ')
 
  })
  })

  describe('Can interact with blogs Blogs', function() {
    beforeEach(function() {
      cy.visit('http://localhost:5173/')
      cy.get('#username').type('Root')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
    })

    it('Can add block', function() {
      cy.contains('Create a new blog').click()
      cy.get('#title').type('Test')
      cy.get('#author').type('Jane Doe')
      cy.get('#url').type('test.com')
      cy.get('#create').click()
      cy.contains('Test Jane Doe')
      cy.contains('view').click()
      cy.contains('likes 0')
    })
    
    it('Can like blogs', function() {
      cy.contains('Create a new blog').click()
      cy.get('#title').type('Test')
      cy.get('#author').type('Jane Doe')
      cy.get('#url').type('test.com')
      cy.get('#create').click()
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')

    })

    it('Can remove blogs', function() {
      cy.contains('Create a new blog').click()
      cy.get('#title').type('Test')
      cy.get('#author').type('Jane Doe')
      cy.get('#url').type('test.com')
      cy.get('#create').click()
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('remove').click()
      cy.contains('Removed Test by Jane Doe')
      cy.get("Test Jane Done").should('not.exist');
    })

    it('only creator see delete button', function() {
        cy.contains('Create a new blog').click()
        cy.get('#title').type('Test')
        cy.get('#author').type('Jane Doe')
        cy.get('#url').type('test.com')
        cy.get('#create').click()
        cy.contains('view').click()
        cy.contains('remove')
        cy.contains('logout').click()
        cy.get('#username').type('Second')
        cy.get('#password').type('second')
        cy.get('#login-button').click()
        cy.contains('view').click()
        cy.contains("remove").should('not.exist')
    })
        
    it('Order by likes', function() {
        cy.contains('Create a new blog').click()
        cy.get('#title').type('Test')
        cy.get('#author').type('Jane Doe')
        cy.get('#url').type('test.com')
        cy.get('#create').click()
        cy.get('#title').type('Test2')
        cy.get('#author').type('Jane Doe2')
        cy.get('#url').type('test2.com')
        cy.get('#create').click()
        cy.contains("Test2 Jane Doe2").contains("view").click()
        cy.contains("Test2 Jane Doe2").contains('like').click()
        cy.get('.blog').eq(0).should('contain', 'Test2 Jane Doe2')
        cy.get('.blog').eq(1).should('contain', 'Test Jane Doe')
    

    })




  })




})