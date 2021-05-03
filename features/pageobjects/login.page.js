const { Builder, By, until } = require('selenium-webdriver');


/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage {

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password, driver) {
        const userName = await (await driver).findElement(By.id('username'));
        await userName.sendKeys(username);
        const pass = await (await driver).findElement(By.id('password'));
        await pass.sendKeys(password);
        const subBtn = await (await driver).findElement(By.id('kc-login'));
        await subBtn.click();
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('login');
    }

    async checkingElements(driver){
        await (await driver).findElement(
            By.xpath("//canvas[@class='mapboxgl-canvas']")
        ).isDisplayed().then(data => {
                console.log(data ? 'Map present on UI': 'Map not present on UI');
        });

        await (await driver).findElement(
            By.xpath("//div[@class='ag-root ag-unselectable ag-layout-normal']")
        ).isDisplayed().then(data => {
                console.log(data ? 'Table present on UI': 'Table not present on UI');
        });
    }
}

module.exports = new LoginPage();
