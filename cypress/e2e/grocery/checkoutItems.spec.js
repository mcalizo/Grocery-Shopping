/// <reference types ="cypress" />
import listing from '../../screens/listingScreen'

const Listing = new listing

describe('Grocery', () => {
    beforeEach(()=>{
        cy.visit('/')
    })

    it('Select grocery items and proceed to checkout', ()=>{
        let searchKeyword = 'Mu'
        
        Listing.searchBox().type(searchKeyword)
        cy.get('.product:visible').should('have.length', 2)
        cy.get('.products').as('locator');
        cy.get('@locator').find('.product').each(($el, index, $list) => {
            const itemName = $el.find('h4.product-name').text();
            if (itemName.includes('Mushroom')) {
                cy.log('Button exist and enabled!')
                 cy.wrap($el).find('button').click({ force: true });
            }
        });

       Listing.Cart().click({force:true})

       Listing.vegName()
       Listing.checkOut().click({force:true})
       cy.location().should((location) => {
        expect(location.href).to.eq(`${Cypress.config().baseUrl}cart`);
      });
     
        cy.get('.totAmt').invoke('text').then((totalAmount) => {
          console.log('Total Amount:', totalAmount);
      
        cy.get('.cartTable tbody .amount:last').invoke('text').then((totalPrice) => {
          console.log('Total Price:', totalPrice);
      
          expect(totalAmount.trim()).to.equal(totalPrice.trim());
        });
      
        Listing.applyButton().should('be.enabled');
        Listing.placeOrder().click({force:true})
        cy.location().should((location) => {
            expect(location.href).to.eq(`${Cypress.config().baseUrl}country`);
          });
        cy.get('.products div.wrapperTwo label').should('have.text', 'Choose Country');
        Listing.selecCountryDropdown().select('New Zealand').should('have.value', 'New Zealand');
        Listing.checkBox().check().should('be.checked');
        cy.get('div.wrapperTwo a[href="#/policy"]').should('not.have.attr', 'disabled');
        Listing.proceedButton().click({force:true})
        cy.get('.products-wrapper .wrapperTwo span').invoke('text').then((actualText) => {
                    expect(actualText).to.include("Thank you, your order has been placed successfully");
          });
        cy.get('.products-wrapper .wrapperTwo a[href="#/"]').should('not.have.attr', 'disabled');

    })  
    
    
 

    })

    it('Verify all the item in the list', ()=> {

      Listing.searchBox().should('exist')
      cy.get('.product:visible').should('have.length', 30)
      cy.get("div[class='container'] header .brand.greenLogo").contains('GREEN').should('be.visible')
      cy.get('.products').find('.product-name').invoke('text').then((productNames) => {        
        cy.log(productNames);
        expect(productNames).to.include('Brocolli - 1 Kg');
        expect(productNames).to.include('Cauliflower - 1 Kg');
      
      
      });
      cy.contains('.product-name', 'Brocolli - 1 Kg') // Find the product by name
      .siblings('.stepper-input') // Navigate to the stepper-input div
      .find('.increment') // Find the '+' button within stepper-input
      .click();
    
    // Verify if the quantity value increases from 1 to 2
    cy.contains('.product-name', 'Brocolli - 1 Kg')
      .siblings('.stepper-input')
      .find('.quantity')
      .should('have.value', '2');

      cy.contains('.product-name', 'Brocolli - 1 Kg') // Find the product by name
      .siblings('.product-action') // Navigate to the product-action div
      .find('button') // Find the "ADD TO CART" button within product-action
      .click({force:true});
      cy.get('.cart-items .cart-item').its('length').should('be.gte', 1);
    cy.get('.cart-info strong')
  .eq(1) // Use eq(1) to select the second strong element, which contains the price
  .invoke('text')
  .then((text) => {
    const totalPrice = parseInt(text, 10);
   
    expect(totalPrice).to.be.gte(240);
  });

    })

})