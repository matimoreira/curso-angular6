describe('ventana principal', () => {
    it('click al boton', () => {
    cy.visit('http://localhost:4200');
    cy.contains('angular-whishlist');
    cy.get('h1 b').should('contain', 'HOLA es');
    cy.contains('type').click();
    });
});
