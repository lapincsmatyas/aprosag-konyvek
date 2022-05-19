const clickMenuItem = (item, url) => {
  cy.get('aprosag-header')
    .find(`.menu-item[routerlink=${item}]`).click();
  cy.url().should('include', `/${url || item}`);
}

describe('Guest user - Browse page', () => {
  before('Visit page', () => {
    cy.visit('http://localhost:4200');
  })
  it('Browses pages', () => {
    cy.title().should('equal', 'AprosagKonyvek');

    clickMenuItem('items');
    cy.get('aprosag-items').find('aprosag-gallery');
    cy.get('aprosag-items')
      .find('.items-container')
      .find('aprosag-item-card').should('have.length', 7);

    clickMenuItem('why-is-it-special');
    cy.get('.content-container')
      .find('.title')
      .should('have.text', 'Mitől különlegesek az Apróság könyvek?');

    clickMenuItem('about-us');
    cy.get('.content-container')
      .find('.title')
      .should('have.text', 'Rólunk');

    clickMenuItem('contacts');
    cy.get('.content-container')
      .find('.title')
      .should('have.text', 'Kapcsolat');

    clickMenuItem('profile', 'login');
    cy.get('.content-container')
      .find('.title')
      .should('have.text', 'Bejelentkezés');

    cy.get('aprosag-header')
      .find('.menu-item.cart').click();
    cy.get('.cart-dialog')
      .find('.cart-modal-header').should('have.text', 'Kosarad tartalma0 termék');
  })

  it('Browses gallery', () => {
    clickMenuItem('items');
    cy.get('aprosag-items')
      .find('aprosag-gallery')
      .find('.swiper-slide')
      .should('have.length', 4).first()
      .should('have.class', 'swiper-slide-active');
  })

  it('Browses items', () => {
    cy.get('aprosag-header')
      .find('.menu-item[routerlink="items"]').click();

    cy.get('aprosag-items')
      .find('.items-container')
      .find('aprosag-item-card').should('have.length', 7)
      .first().find('aprosag-favorite').should('not.exist');

    cy.get('aprosag-items')
      .find('aprosag-item-card').first().click()

    cy.get('aprosag-item')
      .find('.title-container')
      .first().find('aprosag-favorite').should('not.exist');

    cy.get('aprosag-item')
      .find('.images')
      .find('.main-image-container')
      .find('.main-image').should('have.attr', 'src').should('include','a.jpg')

    cy.get('aprosag-item')
      .find('.images')
      .find('.main-image-container').find('.arrow.right').click();

    cy.get('aprosag-item')
      .find('.images')
      .find('.main-image-container')
      .find('.main-image').should('have.attr', 'src').should('include','b.jpg')

    cy.get('aprosag-item')
      .find('.images')
      .find('.main-image-container').find('.arrow.left').click();

    cy.get('aprosag-item')
      .find('.images')
      .find('.main-image-container')
      .find('.main-image').should('have.attr', 'src').should('include','a.jpg')

    cy.get('aprosag-item')
      .find('.images')
      .find('.small-images').find('.small-image').eq(3).click();

    cy.get('aprosag-item')
      .find('.images')
      .find('.main-image-container')
      .find('.main-image').should('have.attr', 'src').should('include','d.jpg')
  })
})

describe('Guest user - Order', () => {
  before('Visit page', () => {
    cy.visit('http://localhost:4200');
  })

  it('Adds items to cart on items page', () => {
    clickMenuItem('items');
    cy.get('aprosag-items')
      .find('.items-container')
      .find('aprosag-item-card').first()
      .find('button').contains('Kosárba').click();

    cy.get('ngb-modal-window')
      .find('button.continue-shopping').click();

    cy.get('aprosag-items')
      .find('.items-container')
      .find('aprosag-item-card').eq(1)
      .find('button').contains('Kosárba').click();

    cy.get('ngb-modal-window')
      .find('button').contains('Tovább a kosárhoz').click();

    cy.get('.cart-container')
      .find('.button-container')
      .find('button').contains('Tovább a pénztárhoz')
      .should('be.disabled');

    cy.get('.cart-container')
      .find('.shipping-options')
      .find('.option').first().click()

    cy.get('.cart-container')
      .find('.button-container')
      .find('button').contains('Tovább a pénztárhoz')
      .click()
  })

  it('Finishes order as a guest', () => {
    cy.get('.cash-desk-page-container')
      .find('button').contains('Folytatás vendégként')
      .click()

    const personalData = {
      firstName: 'Elek',
      lastName: 'Teszt',
      companyName: 'Teszt Kft.',
      taxNumber: '123123',
      country: 'Magyarország',
      city: 'Budapest',
      address: 'Teszt utca 5.',
      zipCode: '1111'
    }

    Object.keys(personalData).forEach((key) => {
      cy.get('.personal-data')
        .find(`input[formControlName="${key}"]`).type(personalData[key]);
    })

    cy.get('.button-container')
      .find('button').contains('Tovább')
      .click()

    const actualDate = new Date();
    const orderNumber =
      actualDate.getFullYear().toString().slice(-2) + '' +
      ('00' + actualDate.getMonth().toString()).slice(-2) + '' +
      ('00' + actualDate.getDate().toString()).slice(-2) + '' +
      ('00' + actualDate.getHours().toString()).slice(-2) + '' +
      ('00' + actualDate.getMinutes().toString()).slice(-2) + '';

    cy.get('.button-container')
      .find('button').contains('Rendelés megerősítése')
      .click()

    cy.get('aprosag-successful-order')
      .find('.order-number')
      .should('contain.text', orderNumber)

    cy.get('aprosag-successful-order')
      .find('button').contains('Vissza a kezdőoldalra!').click()
  })
})
