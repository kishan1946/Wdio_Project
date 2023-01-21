import { ChainablePromiseElement } from 'webdriverio';
import { homePage_locators } from "../resources/locators.json";
import chai = require('chai');
import Page from './page';
import { cart } from '../../../test/resources/data';
import { registerMessage, topMenuOptionLabel, topMenuOptionSeeAllLabel } from '../../../test/resources/assertionMessage';

const expectChai = chai.expect;

class HomePage extends Page {
    private get myAccount() {
        return $(homePage_locators.myAccount);
    }

    private get registerDropDown() {
        return $(homePage_locators.register);
    }

    private get logoutDropDown() {
        return $(homePage_locators.logout);
    }

    private get loginDropDown() {
        return $(homePage_locators.login);
    }

    private get yourStore() {
        return $(homePage_locators.yourStore);
    }

    private get product() {
        return $(homePage_locators.product);
    }

    private productLevel(el: number) {
        return $$(homePage_locators.productLabel)[el];
    }

    private get productPrice() {
        return $$(homePage_locators.productPrice);
    }

    private get cartTotal() {
        return $(homePage_locators.cartTotal);
    }

    private get cart() {
        return $(homePage_locators.cart);
    }

    private get successText() {
        return $(homePage_locators.successText);
    }

    private get optionLabel() {
        return $(homePage_locators.optionLabel);
    }

    private topMenuDropDown(index: number) {
        return $$(homePage_locators.topMenuDropDown)[index];
    }

    private seeAllTopMenu(index: number) {
        return $$(homePage_locators.seeAllTopMenu)[index];
    }

    private addToCart(el: number) {
        return $$(homePage_locators.addToCart)[el];
    }

    private cartPopUpTable(tr: number, td: number) {
        return $(`.table > tbody tr:nth-child(${tr}) td:nth-child(${td})`);
    }

    private remove(tr: number, td: number) {
        // let el = await this.cartPopUpTable(tr,td);
        return $(`.table > tbody tr:nth-child(${tr}) td:nth-child(${td}) > button`);
    }

    private getTopMenuSubElement(el: string) {
        return $(`*=${el}`);
    }

    private getTopNonDropDownElements (el: string) {
        return $(`=${el}`);
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
                await browser.pause(200);
                await browser.waitUntil(async () => {
                    await (await this.addToCart(i)).waitForDisplayed({ timeout: 5000 });
                    await (await this.addToCart(i)).click();
                    await browser.pause(200);
                    await (await this.successText).waitForDisplayed({ timeout: 5000 });
                    await expectChai(await (await this.successText).getText()).to.include(registerMessage.successTextForAddToCart);
                    return true;
                })
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

    public async removeItem() {
        await (await this.cart).click();
        await browser.pause(500);
        await (await this.cartPopUpTable(1, 4)).waitForDisplayed({ timeout: 5000 });
        let price = Number((await (await this.cartPopUpTable(1, 4)).getText()).substring(1));
        cart.cartTotal = cart.cartTotal - price;
        await (await this.remove(1, 5)).click();
    }
    public async cartTotalFromTable() {
        await (await this.cart).click();
        await browser.pause(500);
        await (await this.cartPopUpTable(4, 2)).waitForDisplayed({ timeout: 5000 });
        let total = Number((await (await this.cartPopUpTable(4, 2)).getText()).substring(1));
        console.log("cartTotal: " + total)
        return total;
    }

    public async moveToSeeAllOption(index: number) {
        await (await this.topMenuDropDown(index)).waitForDisplayed();
        await (await this.topMenuDropDown(index)).moveTo().then(async () => {
            // browser.pause(3000);
            await (await this.seeAllTopMenu(index - 1)).waitForDisplayed();
            await (await this.seeAllTopMenu(index - 1)).click();
            await expectChai(await (await this.optionLabel).getText()).to.be.equal(topMenuOptionSeeAllLabel[index - 1]);
            await browser.pause(100);
        })
    }

    public async hoverOnTopMenuDropDown() {
        for (let i = 1; i < 5; i++) {
            let topMenuText = await (await this.topMenuDropDown(i)).getText();
            let n = topMenuOptionLabel[topMenuText].length;
            for (let j = 0; j < n; j++) {
                await (await this.topMenuDropDown(i)).waitForDisplayed();
                await (await this.topMenuDropDown(i)).moveTo().then(async () => {
                    // browser.pause(3000);
                    await (await this.getTopMenuSubElement(topMenuOptionLabel[topMenuText][j])).waitForDisplayed();
                    await (await this.getTopMenuSubElement(topMenuOptionLabel[topMenuText][j])).click();
                    await expectChai(await (await this.optionLabel).getText()).to.be.equal(topMenuOptionLabel[topMenuText][j]);
                    await browser.pause(100);
                })
            }
            await this.moveToSeeAllOption(i);
        }
    }

    public async navigateToTopNonDropDown () {
        let n = homePage_locators.topNonDropDown.length;
        for (let i = 0; i < n; i++) {
            await (await this.getTopNonDropDownElements(homePage_locators.topNonDropDown[i])).waitForDisplayed();
            await (await this.getTopNonDropDownElements(homePage_locators.topNonDropDown[i])).click();
            await expectChai(await (await this.optionLabel).getText()).to.be.equal(homePage_locators.topNonDropDown[i]);
        }
    }
    public open() {
        return super.open('home');
    }
}

export default new HomePage;
