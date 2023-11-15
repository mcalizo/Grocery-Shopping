/// <reference types="cypress" />

describe('Session Token', () => {
    it('Set the token to local storage', () => {
      cy.LoginAPI().then(function () {
        cy.visit("https://rahulshettyacademy.com/client/", {
          onBeforeLoad: function (window) {
            window.localStorage.setItem('token',Cypress.env('token'));
            //console.log('token')
           
          },
        });
      });
      cy.get('#products [class="btn w-10 rounded"]').eq(0).click({force:true})
    });
  });
  