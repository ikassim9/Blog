describe('Login user test', () => {


  beforeEach(() => { 
  
  cy.visit("http://localhost:3000/users/login");
   
  
  })
  
    it.only('Submit form without inputs', () => {
  
      cy.contains('Login').click();
  
      // submit withot input
  
      cy.get('form').submit();

      cy.get('[data-cy="error_email"]').should("contain", "Please enter your email");
      cy.get('[data-cy="error_password"]').should("contain", "Please enter your password");
    
     });
  
     it.only('Submit form with invalid email', () => {
  
      // submit with invalid  email and password input 
  
   
      cy.get('[data-cy="input_email"]').type("naruto");
 
        
      cy.get('form').submit();
  

      cy.get('[data-cy="error_email"]').should("contain", "Please enter a valid email");
  
  
     });
  
  
    
     it.only('Submit with invalid credentials', () => {
  
      // submit with valid  input 
      cy.get('[data-cy="input_email"]').type("naruto@example.com");
      cy.get('[data-cy="input_password"]').type("password1234");
  
  
      // submit for again
      cy.get('form').submit();
  
      cy.get('[data-cy="error_invalidCredentials"]').should("contain", "We don't recognize this email or password");
 
     });
  

     
     it.only('Attempt login with unverified email', () => {
  
      // submit with valid  input 
  
 
      cy.get('[data-cy="input_email"]').type("abcdefgh@example.com");
      cy.get('[data-cy="input_password"]').type("password1234");
  
  
      // submit for again
      cy.get('form').submit();
  
      cy.get('[data-cy="input_name"]').should('have.value', '');
      cy.get('[data-cy="input_email"]').should("contain", ""); // skip this test
      cy.get('[data-cy="input_password"]').should("be.empty");
  
  
  
    
     });
  
    
  })
  
   