import { ChainablePromiseElement } from 'webdriverio';
import { homePage_locators } from "../resources/locators.json";
import chai = require('chai');

const expectChai = chai.expect;

import Page from './page';

class HomePage extends Page {
    public get myAccount() {
        return $(homePage_locators.myAccount);
    }

    public get registerDropDown() {
        return $(homePage_locators.register);
    }

    public get logoutDropDown() {
        return $(homePage_locators.logout);
    }

    public get loginDropDown() {
        return $(homePage_locators.login);
    }

    public get yourStore() {
        return $(homePage_locators.yourStore);
    }

    public get product() {
        return $(homePage_locators.product);
    }

    public productLevel(el: number) {
        return $$(homePage_locators.productLabel)[el];
    }

    public get productPrice() {
        return $$(homePage_locators.productPrice);
    }

    public get cartTotal() {
        return $(homePage_locators.cartTotal);
    }

    public addToCart(el: number) {
        return $$(homePage_locators.addToCart)[el];
    }

    public async register() {
        await this.myAccount.click();
        await this.registerDropDown.click();
    }

    public async logout() {
        await this.myAccount.click();
        await this.logoutDropDown.click();
    }

    public async login() {
        await this.myAccount.click();
        await this.loginDropDown.click();
    }

    public async navigateToHomePage() {
        await (await this.yourStore).click();
    }

    public async scrollToProduct() {
        await (await this.product).scrollIntoView({ block: 'center', inline: 'center' })
    }

    public async clickOnAddToCart(product: string, productPrice: number) {
        let i = 0;
        for (i; i < 4; i++) {
            let productText = await (await this.productLevel(i)).getText()
            if (productText === product) {
                let price = Number((await (await this.productPrice[i]).getText()).substring(1, 8));
                await expectChai(price).to.be.equal(productPrice);
                await (await this.addToCart(i)).click();
                return productText;
            }
        }
        return "";
    }

    public async getCartTotalText() {
        let text = (await (await this.cartTotal).getText());
        let amount = Number(text.substr(-6, text.length - 1));
        return amount;
    }

    public open() {
        return super.open('home');
    }
}

export default new HomePage;
