import { ChainablePromiseElement } from 'webdriverio';
import {homePage_locators} from "../resources/locators.json";

import Page from './page';

class HomePage extends Page {
     public get myAccount () {
        return $(homePage_locators.myAccount);
    }

    public get registerDropDown () {
        return $(homePage_locators.register);
    }

    public get logoutDropDown () {
        return $(homePage_locators.logout);
    }

    public get loginDropDown () {
        return $(homePage_locators.login);
    }

    public async register () {
        await this.myAccount.click();
        await this.registerDropDown.click();
    }

    public async logout () {
        await this.myAccount.click();
        await this.logoutDropDown.click();
    }

    public async login () {
        await this.myAccount.click();
        await this.loginDropDown.click();
    }

    public open () {
        return super.open('home');
    }
}

export default new HomePage();
