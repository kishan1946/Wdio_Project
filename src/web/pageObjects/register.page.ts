import { ChainablePromiseElement } from 'webdriverio';
import {registerPage_locators} from "../resources/locators.json";
import { userDetails } from '../../../test/resources/data';
// import {registerPage_locators} from 'src/web/resources/locators.json'

import Page from './page';

class RegisterPage extends Page {
    private get firstName () {
        return $(registerPage_locators.firstName);
    }

    private get lastName () {
        return $(registerPage_locators.lastName);
    }

    private get email () {
        return $(registerPage_locators.email);
    }

    private get mob () {
        return $(registerPage_locators.mob);
    }

    private get password () {
        return $(registerPage_locators.password);
    }

    private get confirmPassword () {
        return $(registerPage_locators.confirmPassword);
    }

    private get privace() {
        return $(registerPage_locators.privacy);
    }

    private get continueBtn() {
        return $(registerPage_locators.continue);
    }

    private get accountCreatedHeader() {
        return $(registerPage_locators.accountCreatedHeader);
    }

    private get successfulMessage() {
        return $(registerPage_locators.successfulMessage);
    }
    
    private getFirstName () {
        let firstName =  (Math.random() + 1).toString(36).substring(7);
        userDetails.firstName = firstName;
        return firstName;
    }

    private getlastName () {
        let lastName = (Math.random() + 1).toString(36).substring(7);
        userDetails.lastName = lastName;
        return lastName;
    }

    private getEmail (firstName: string) {
        let email = firstName+'123@example.com';
        userDetails.email = email;
        return email;
    }

    private getMobNo () {
        let mob = Math.floor(Math.random()*10000000000);
        userDetails.mob = mob;
        return mob;
    }

    private getPassword (firstName: string) {
        let password = firstName+'@'+Math.floor(Math.random()*100000);
        userDetails.password = password;
        return password;
    }

    public async register () {
        let firstName = this.getFirstName();
        let lastName = this.getlastName();
        let email = this.getEmail(firstName);
        let mob = this.getMobNo();
        let password = this.getPassword(firstName);
        await (await this.firstName).setValue(firstName);
        await (await this.lastName).setValue(lastName);
        await (await this.email).setValue(email);
        await (await this.mob).setValue(mob);
        await (await this.password).setValue(password);
        await (await this.confirmPassword).setValue(password);
        await (await this.privace).click();
        await this.continueBtn.click();
    }

    public async continue () {
        await this.continueBtn.click();
    }

    public async getRegisterText () {
        return await (await this.accountCreatedHeader).getText();
    }

    public async getSuccessfulMessageText () {
        return await (await this.successfulMessage).getText();
    }

    public open () {
        return super.open('register');
    }
}

export default new RegisterPage;
