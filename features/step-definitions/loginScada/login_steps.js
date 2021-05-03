const { Given, When, Then, After} =  require('cucumber');
const assert = require('assert');
require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');

const LoginPage = require('../../pageobjects/login.page');

Given(/^I am on the (\w+) page$/,{timeout: 6 * 5000}, async (page) => {
    this.driver = new Builder()
    .forBrowser('chrome')
    .build();
    this.driver.manage().window().maximize();

    await this.driver.get('https://arbtest.iron-iq.com/#/scada');
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password, this.driver);
});

Then(/^I should see a flash message saying (.*)$/,{timeout: 10 * 5000}, async (expectedMsg) => {
    const errorSpan = this.driver.wait(
        until.elementLocated(
            By.className('kc-feedback-text')
        )
    );
    (await errorSpan).getText().then(text => {
        assert.equal(text, expectedMsg);
    });
});

Then(/^I should see a map and table$/,{timeout: 10 * 5000}, async () => {
    (await this.driver.wait(
        until.elementLocated(
            By.xpath("//canvas[@class='mapboxgl-canvas']")
        )
    )).isDisplayed().then(data => {
        console.log(data ? 'Map present on UI': 'Map not present on UI');
    });
    (await this.driver.wait(
        until.elementLocated(
            By.xpath("//div[@class='ag-root ag-unselectable ag-layout-normal']")
        )
    )).isDisplayed().then(data => {
        console.log(data ? 'Table present on UI': 'Table not present on UI');
    });
});

After(async ()=> {
    await this.driver.close();
});

