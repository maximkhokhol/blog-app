describe('Authentication Tests', () => {
  const user = {
    username: 'test',
    email: 'test@mail.com',
    password: 'test123',
  };

  it('Should register a new user successfully', () => {
    cy.request('POST', 'http://localhost:5000/api/auth/register', user).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('username', user.username);
      }
    );
  });

  it('Should login successfully with valid credentials', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type('test123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
  });

  it('Should fail login with incorrect password', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Wrong credentials!').should('be.visible');
  });
});
