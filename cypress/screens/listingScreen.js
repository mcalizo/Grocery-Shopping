class listing
{
//webElements
searchBox() {
    return cy.get("input[type='search'].search-keyword").should('exist');
}    

Cart() {
    return cy.get('[class="cart-icon"]').should('exist')
}

vegName() {
    return cy.get('[class="product-name"]').parents('li').contains('Mushroom - 1 Kg') 
}

checkOut() {
    return  cy.get('[type="button"]').contains('PROCEED TO CHECKOUT')
    
}

applyButton(){
    return cy.get('.promoBtn').contains('Apply')
}

placeOrder(){
    return cy.get('div[style*="text-align: right"] button').contains('Place Order')
}

selecCountryDropdown() {
    return cy.get('div.wrapperTwo select').should('exist')
}

checkBox() {
    return cy.get('div.wrapperTwo input.chkAgree').should('exist')
}

proceedButton() {
    return cy.get('div.wrapperTwo button').contains('Proceed').should('exist')
}

}
export default listing