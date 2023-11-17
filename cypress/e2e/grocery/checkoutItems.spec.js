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
    
    it.only('Verify all the item in the list', ()=> {

      Listing.searchBox().should('exist')
      cy.get('.product:visible').should('have.length', 29)
      cy.get("div[class='container'] header .brand.greenLogo").contains('GREEN').should('be.visible')

    })
 

    })

})