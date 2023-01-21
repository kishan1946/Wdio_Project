import { ChainablePromiseElement } from 'webdriverio';
import { loginPage_locators, registerPage_locators } from "../resources/locators.json";
import { userDetails } from '../../../test/resources/data';

import Page from './page';

class LoginPage extends Page {
    private get email () {
        return $(registerPage_locators.email);
    }

    private get password () {
        return $(registerPage_locators.password);
    }

    private get loginBtn () {
        return $(loginPage_locators.login);
    }

    public async login () {
        await (await this.email).setValue(userDetails.email);
        await (await this.password).setValue(userDetails.password);
        await (await this.loginBtn).click();
    }

    public open () {
        return super.open('login');
    }
}

export default new LoginPage;
