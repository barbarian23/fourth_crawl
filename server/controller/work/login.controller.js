import { LOGIN_URL } from "../../constants/work/work.constants";
import { SOCKET_LOGIN_INCORRECT, SOCKET_LOGIN_STATUS } from "../../../common/constants/common.constants";

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

const chromeOption = new chrome.Options().addArguments("start-maximized") // open Browser in maximized mode
    .addArguments("disable-infobars") // disabling infobars
    .addArguments("--disable-extensions") // disabling extensions
    .addArguments("--disable-gpu") // applicable to windows os only
    .addArguments("--disable-dev-shm-usage")// overcome limited resource problems
    .addArguments("--no-sandbox");

var driver;
const DEFAULT_DELAY = 2000;

/**
 * 
 * @param {*} ms sleep đi 1 vài giây, đơn vị là milisecond
 */
function timer(ms) {
    ms = ms == null ? DEFAULT_DELAY : ms;
    return new Promise(res => setTimeout(res, ms));
}

// do login
async function doLogin(username, password, socket) {
    try {
        driver = new webdriver.Builder().forBrowser('chrome')
            .setChromeOptions(chromeOption).withCapabilities(webdriver.Capabilities.chrome()).build();

        // go to login url
        await driver.get(LOGIN_URL);

        // wait to complete
        await driver.wait(function () {
            return driver.executeScript('return document.readyState').then(function (readyState) {
                return readyState === 'complete';
            });
        });

        // select to username input & send username
        let selector = "#login_field";
        await driver.findElement(webdriver.By.css(selector)).clear();
        await driver.findElement(webdriver.By.css(selector)).sendKeys(username);

        // select to password input & send password
        selector = "#password";
        await driver.findElement(webdriver.By.css(selector)).clear();
        await driver.findElement(webdriver.By.css(selector)).sendKeys(password);

        // select to button login & click button
        selector = "#login > div.auth-form-body.mt-3 > form > div > input.btn.btn-primary.btn-block";
        await driver.findElement(webdriver.By.css(selector)).click();

        await timer(2000);

        selector = "#js-flash-container > div > div";
        let incorrect = await driver.executeScript("return document.querySelector('#js-flash-container > div > div')");
        if (incorrect){
            socket.send(SOCKET_LOGIN_INCORRECT, { data: -1 });
            return;
        }

        await driver.wait(function () {
            return driver.executeScript("return location.href").then((url) => {
                return url.includes("https://github.com");
            });
        });
        socket.send(SOCKET_LOGIN_STATUS, { data: 1 });


    } catch (e) {
        console.log("Login Error", e);
        socket.send(SOCKET_SOMETHING_ERROR, { data: 0 });
    }
}
export default doLogin;
