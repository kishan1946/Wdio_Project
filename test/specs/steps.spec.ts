import { Given, When, Then } from '@wdio/cucumber-framework';

import HomePage from '../../src/web/pageObjects/home.page';
import SecurePage from '../../src/web/pageObjects/secure.page';
import RegisterPage from '../../src/web/pageObjects/register.page';
import LoginPage from '../../src/web/pageObjects/login.page';
import LogoutPage from '../../src/web/pageObjects/logout.page';
import chai = require('chai');

const expectChai = chai.expect;
const pages = {
    home: HomePage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open();
    expectChai(await browser.getUrl()).to.be.equal(process.env.WEB_URL+'index.php?route=common/'+page);
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await HomePage.register()
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});
When (/^User Register with new Credential$/, async () => {
    await RegisterPage.register();
    // await expect($('.btn.btn-primary')).toBeDisabled();
})

When (/^User navigate to logout page$/, async () => {
    await HomePage.logout();
    // await expect($('.btn.btn-primary')).toBeDisabled();
})

When (/^User logout$/, async () => {
    await LogoutPage.logout();
    // await expect($('.btn.btn-primary')).toBeDisabled();
})

When (/^User navigate to login page$/, async () => {
    await HomePage.login();
    // await expect($('.btn.btn-primary')).toBeDisabled();
})

When (/^User login with same credential$/, async () => {
    await LoginPage.login();
    // await expect($('.btn.btn-primary')).toBeDisabled();
})

