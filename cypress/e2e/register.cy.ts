describe('Register user test', () => {


beforeEach(() => { 

cy.visit("http://localhost:3000/users/register");
 

})

  it.only('Submit form without inputs', () => {

    cy.contains('Sign up').click();

    // submit withot input

    cy.get('form').submit();

    cy.get('[data-cy="error_name"]').should("contain", "Please enter a name");
    cy.get('[data-cy="error_email"]').should("contain", "Please enter your email");
    cy.get('[data-cy="error_password"]').should("contain", "Please enter your password");
  
   });

   it.only('Submit form with invalid inputs', () => {

    // submit with invalid  email and password input 

    cy.get('[data-cy="input_name"]').type("Naruto");
    cy.get('[data-cy="input_email"]').type("naruto@example");
    cy.get('[data-cy="input_password"]').type("pa");


      
    cy.get('form').submit();

    cy.get('[data-cy="error_name"]').should("be.empty");
    cy.get('[data-cy="error_email"]').should("contain", "Please enter a valid email");
    cy.get('[data-cy="error_password"]').should("contain", "Password must be at least 6 characters");
    

   });


  
   it.only('Submit form with existing email', () => {

    // submit with valid  input 

    cy.get('[data-cy="input_name"]').type("Naruto");
    cy.get('[data-cy="input_email"]').type("naruto@example.com");
    cy.get('[data-cy="input_password"]').type("password1234");


    // submit for again
    cy.get('form').submit();

    cy.get('[data-cy="error_name"]').should("be.empty");
    cy.get('[data-cy="error_email"]').should("contain", "This email is already taken");
    cy.get('[data-cy="error_password"]').should("be.empty");
  
   });


   it.only('form resets after successful submission', () => {

    // submit with valid  input 

    cy.get('[data-cy="input_name"]').type("Naruto");
    cy.get('[data-cy="input_email"]').type("abcdefgh@example.com");
    cy.get('[data-cy="input_password"]').type("password1234");


    // submit for again
    cy.get('form').submit();

    cy.get('[data-cy="input_name"]').should('have.value', '');
    cy.get('[data-cy="input_email"]').should("contain", ""); // skip this test
    cy.get('[data-cy="input_password"]').should("be.empty");



  
   });
})

 