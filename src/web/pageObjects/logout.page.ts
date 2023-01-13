import { ChainablePromiseElement } from 'webdriverio';
import { loginPage_locators, registerPage_locators } from "../resources/locators.json";
import { userDetails } from '../../../test/resources/data';

import Page from './page';

class LogoutPage extends Page {
    private get continue() {
        return $(registerPage_locators.continue);
    }

    public async logout () {
        await this.continue.click();
    }

    public open () {
        return super.open('logout');
    }
}

export default new LogoutPage();
