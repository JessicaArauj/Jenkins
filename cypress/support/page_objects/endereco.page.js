import { faker } from '@faker-js/faker';

class EnderecoPage {

editarEnderecoFaturamento() {cy.get('#billing_first_name').clear().type(faker.name.firstName())
cy.get('#billing_last_name').clear().type(faker.name.lastName())
cy.get('#billing_company').clear().type(faker.company.bs())
cy.get('#select2-billing_country-container').type('Brasil').click() // Pais
cy.get('#billing_address_1').clear().type(faker.address.city())
cy.get('#billing_address_2').clear().type('000')
cy.get('#billing_city').clear().type(faker.address.cityName())
cy.get('#select2-billing_state-container').type('São Paulo').click() // Estado
cy.get('#billing_postcode').clear().type('66065112')
cy.get('#billing_phone').clear().type(faker.phone.number('+48 91 ### ## ##'))
cy.get('#billing_email').clear().type(faker.internet.email())
cy.get('#payment_method_cod').check()
cy.get('#terms').check()
cy.get('#place_order').click()
}

}

export default new EnderecoPage()