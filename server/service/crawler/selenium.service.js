var webdriver = require('selenium-webdriver');
var ie = require('selenium-webdriver/ie');
var iedriver = require('iedriver');

var ieOption = null, driver = null;

function seleniumCrawl() {
    function getOption() {
        return new ie.Options().addArguments('--ignore-certificate-errors').addArguments('--ignore-ssl-errors').addArguments('--disable-single-click-autofill')
    };

    function getCrawler() {
        return new webdriver.Builder()
            .setIeOptions(getOption())
            .withCapabilities(webdriver.Capabilities.ie()).build();
    }

    let driver = {
        option: null,
        crawler: null,
        init:function(){
            if(!this.option || !this.crawler){
                this.option = getOption();
                this.crawler = getCrawler();
            }
        },
        goto: async function (path) {
            try {
                if(!this.option || !this.crawler){
                    this.init();
                }
                await this.crawler.get(path);
            } catch (e) {
                console.log("goto", e);
            }
        },

        getInnerTextByPath: async function (path) {
            try {
                if(!this.option || !this.crawler){
                    this.init();
                }
                return await this.crawler.findElement(webdriver.By.css(path)).getText();
            } catch (e) {
                console.log("getInnerTextByPath", e);
            }
        },

        inputTextByPath: async function (path, text) {
            try {
                if(!this.option || !this.crawler){
                    this.init();
                }
                await this.crawler.findElement(webdriver.By.css(path)).sendKeys(text);
            } catch (e) {
                console.log("inputTextByPath", e);
            }
        },

        clearInputByPath: async function (path) {
            try {
                if(!this.option || !this.crawler){
                    this.init();
                }
                await this.crawler.findElement(webdriver.By.css(path)).clear();
            } catch (e) {
                console.log("clearInputByPath", e);
            }
        },

        clickByPath: async function (path) {
            try {
                if(!this.option || !this.crawler){
                    this.init();
                }
                await this.crawler.findElement(webdriver.By.css(path)).click();
            } catch (e) {
                console.log("clickByPath", e);
            }
        },

        executeScript: async function (script) {
            try {
                if(!this.option || !this.crawler){
                    this.init();
                }
                return await this.crawler.executeScript(script);
            } catch (e) {
                console.log("executeScript", e);
                return null;
            }
        },

        waitForScriptDone: async function (script, status) {
            try {
                if(!this.option || !this.crawler){
                    this.init();
                }
                await this.crawler.wait(function () {
                    return this.crawler.executeScript(script).then(function (readyState) {
                        return readyState === status;
                    });
                });
            }
            catch (e) {
                console.log("waitForScriptDone", e);
            }
        },
        isDisplay: async function (path) {
            try {
                if(!this.option || !this.crawler){
                    this.init();
                }
                return await this.crawler.findElement(webdriver.By.css(path)).isDisplayed();
            } catch (e) {
                console.log("isDisplay", e);
                return null;
            }
        }
    };

    return driver;
}

export default seleniumCrawl;