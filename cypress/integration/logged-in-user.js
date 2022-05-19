const logIn = (userName = "test@mail.com", password = "test1234") => {

  cy.get('aprosag-header')
    .find(`.menu-item[routerlink="profile"]`).click();

  cy.get('.title').then((title) => {
    console.log(title.text());
    if(title.text().includes("Bejelentkezés")){
      cy.get('.login-page')
        .find('.form-container')
        .find('input[formcontrolname="email"]').type('test@mail.com');
      cy.get('.login-page')
        .find('.form-container')
        .find('input[formcontrolname="password"]').type('test1234');
      cy.get('.login-page')
        .find('.login-button').click({waitForAnimations: true})
      cy.wait(2000);

      cy.get('aprosag-header')
        .find(`.menu-item[routerlink="profile"]`).click();
    }
  })

}

describe.only('Guest user - Browse page', () => {
  before('Visit page', () => {
    cy.visit('http://localhost:4200');
    logIn();
  })


  it('Updates profile data', () => {
    const randomValue = Math.floor(Math.random() * 100 + 1)
    const personalData = {
      firstName: `Elek${randomValue}`,
      lastName: `Teszt${randomValue}`,
      companyName: `Teszt Kft.${randomValue}`,
      taxNumber: `123123${randomValue}`,
      country: `Magyarország${randomValue}`,
      city: `Budapest${randomValue}`,
      address: `Teszt utca 5.${randomValue}`,
      zipCode: `1111${randomValue}`,
      phoneNumber: `+36201231234${randomValue}`
    }


    Object.keys(personalData).forEach((key) => {
      cy.get('aprosag-personal-data')
        .find(`input[formControlName="${key}"]`).clear().type(personalData[key]);
    })

    cy.get('aprosag-personal-data').find('.save-button').click();
    cy.get('.side-menu').find('.nav-item').contains('Kijelentkezés').click();
    cy.get('aprosag-confirmation').find('.button').contains('Igen').click();

    logIn();


    Object.keys(personalData).forEach((key) => {
      cy.get('aprosag-personal-data')
        .find(`input[formControlName="${key}"]`).should('have.value',personalData[key]);
    })
  })
});
