class Header {
  menuButton = '#react-burger-menu-btn';
  logoutLink = '#logout_sidebar_link';

  logout() {
    cy.get(this.menuButton).click();
    cy.get(this.logoutLink).click();
  }
}

export default new Header();
