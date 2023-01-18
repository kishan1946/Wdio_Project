import { ChainablePromiseElement } from 'webdriverio';
import { homePage_locators } from "../resources/locators.json";
import chai = require('chai');
import Page from './page';
import { cart } from '../../../test/resources/data';
import { registerMessage } from '../../../test/resources/assertionMessage';

const expectChai = chai.expect;

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

    public get cart () {
        return $(homePage_locators.cart);
    }

    public get successText () {
        return $(homePage_locators.successText);
    }

    public addToCart(el: number) {
        return $$(homePage_locators.addToCart)[el];
    }

    public cartPopUpTable (tr: number, td: number) {
        return $(`.table > tbody tr:nth-child(${tr}) td:nth-child(${td})`);
    }

    public remove (tr: number, td: number) {
        // let el = await this.cartPopUpTable(tr,td);
        return $(`.table > tbody tr:nth-child(${tr}) td:nth-child(${td}) > button`);
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
            let productText = await (await this.productLevel(i)).getText();
            if (productText === product) {
                let price = Number((await (await this.productPrice[i]).getText()).substring(1, 8));
                await expectChai(price).to.be.equal(productPrice);
                // await browser.pause(2000);
                // await browser.waitUntil(async () => {
                    await (await this.addToCart(i)).waitForDisplayed({timeout: 5000})
                    await (await this.addToCart(i)).click();
                    // await browser.pause(2000)
                    // await (await this.successText).waitForDisplayed({timeout: 5000})
                    // return expectChai(await (await this.successText).getText()).to.include(registerMessage.successTextForAddToCart);
                // })
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

    public async removeItem () {
        await (await this.cart).click();
        let price = Number((await (await this.cartPopUpTable(1,4)).getText()).substring(1));
        cart.cartTotal = cart.cartTotal-price;
        await (await this.remove(1,5)).click();
    }
    public async cartTotalFromTable () {
        await (await this.cart).click();
        let total = Number((await (await this.cartPopUpTable(4,2)).getText()).substring(1));
        console.log("cartTotal: "+ total)
        return total;
    }

    public open() {
        return super.open('home');
    }
}

export default new HomePage;
