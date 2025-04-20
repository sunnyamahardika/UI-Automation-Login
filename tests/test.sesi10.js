const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const firefox = require('selenium-webdriver/firefox'); // ganti ke chrome di sini

describe('Headless Firefox', function () {
    let driver;

    // Hook before untuk setup driver (tugas sesi 10)
    before(async function () {
        options = new firefox.Options();
        options.addArguments("--headless");

        driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    });

    // Hook before each untuk setup driver sleep setiap test case
    this.beforeEach(async function () {
        driver.sleep(2000)
    });

    // Hook after untuk quit driver setelah semua test selesai
    after(async function () {
        await driver.quit();
    });

     // Test pertama: Visit SauceDemo dan cek page title
    //  it.only('Visit SauceDemo dan cek page title', async function () {
    //     await driver.get('https://www.saucedemo.com');
    //     await driver.sleep(1000);
    //     const title = await driver.getTitle();
        
    //     // assert: memastikan object sama persis
    //     assert.strictEqual(title, 'Swag Labs');
    // });

    // Test pertama: Visit SauceDemo dan cek page title
    it('Visit SauceDemo dan cek page title', async function () {
        await driver.get('https://www.saucedemo.com');
        await driver.sleep(1000);
        const title = await driver.getTitle();
        
        // assert: memastikan object sama persis
        assert.strictEqual(title, 'Swag Labs');
    });

    it('Login', async function () {
          // inputs
          let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
          await driver.sleep(500);
          let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
          await driver.sleep(500);
          let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
          await inputUsername.sendKeys('standard_user')
          await inputPassword.sendKeys('secret_sauce')
          await driver.sleep(1000); 
          await buttonLogin.click();
    })

    // Test kedua: Urutkan Produk dari Z-A
    it('Urutkan produk dari Z - A', async function () {
        let buttonOption = await driver.findElement(By.css('[data-test="product-sort-container"]'))
        await buttonOption.click();
        await driver.sleep(1500); 
        let option = await driver.findElement(By.css('option[value="za"]'))
        await option.click();
    });

    // Test ketiga: Logout Aplikasi
    it('Logout Aplikasi', async function () {
        let menuButton = await driver.findElement(By.id('react-burger-menu-btn'));
        await menuButton.click();
        await driver.sleep(1000);

        let logoutClick = await driver.findElement(By.id('logout_sidebar_link'));
        await logoutClick.click();
        await driver.sleep(2000)
    })
    
});
