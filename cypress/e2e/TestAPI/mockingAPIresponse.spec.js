/// <reference types ="cypress" />

describe('API Test', ()=>{
    beforeEach(()=>{
        cy.visit('https://rahulshettyacademy.com/angularAppdemo')
    })

it('Mocking API', ()=>{

    
   
    cy.intercept({
        method: 'GET',
        url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
    },
    {
        statusCode: 200,
        body: [
            {
            "book_name": "RestAssured with Java",
            "isbn": "LSA",
            "aisle": "2303"
        },
        {
            "book_name": "Learn Java Automation with Pro\/RPA",
            "isbn": "RS622",
            "aisle": "85482"
        }
        ]
    }).as('bookretrievals')
    cy.get('[type="button"]').contains('Virtual Library').click();
    cy.wait('@bookretrievals').then(({request,response}) =>{
    
        cy.get('tr').should('have.length', response.body.length+1)
    })
})

it('Mocking request details to test security', ()=>{

    cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
    (req) =>
    {
        req.url="https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=ultron"

    req.continue((res) =>{
      // expect(res.statusCode).to.equal(403)
    })    

    }).as("dummyUrl")
    cy.get('[type="button"]').contains('Virtual Library').click();
    cy.wait('@dummyUrl')



})
})
