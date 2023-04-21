/// <reference types="cypress" />

//import {enderecoPage} from "../support/page_objects/endereco.page";
import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    //beforeEach(() => {
    //    cy.visit('minha-conta')
    //});


    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.visit('minha-conta')
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')

        // Para fazer o pedido acessar a pagina comprar
    
        cy.get('#primary-menu > .menu-item-629 > a').click()

        // Para adicionar 4 produtos ao carrinho

        var quantidadeProduto = 2
        cy.addProdutos('Atlas Fitness Tank', 'S', 'Blue', quantidadeProduto)
        
        /// acessar outra pagina 
        cy.get(':nth-child(2) > .page-numbers').click()

        var quantidadeProduto = 3
        cy.addProdutos('Augusta Pullover Jacket', 'S', 'Red', quantidadeProduto)

        /// acessar outra pagina 
        cy.get(':nth-child(3) > .page-numbers').click()

        var quantidadeProduto = 1
        cy.addProdutos('Circe Hooded Ice Fleece', 'L', 'Gray', quantidadeProduto)

        // acessar outra pagina 
        cy.get(':nth-child(3) > .page-numbers').click()

        var quantidadeProduto = 5
        cy.addProdutos('Daphne Full-Zip Hoodie', 'S', 'Purple', quantidadeProduto)

        // acessando carrinho de compras
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()

        cy.visit('checkout')
        
        cy.get('#billing_first_name').clear().type(faker.name.firstName())
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
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });

   

   
})