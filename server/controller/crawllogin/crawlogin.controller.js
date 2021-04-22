import seleniumCrawl from "../../service/crawler/selenium.service";
//có thể truyền se vào trong này, không cần phải callback

function crawllogin(send,receive) {
    let instance = {
        URL: {
            MAIN: "",
        },
        innerCrawler: new seleniumCrawl(),
        login: async function (username,pasword) {

            await this.innerCrawler.goto(this.URL.KNOX);
            send("Đang chuyển hướng tới link",this.URL.KNOX);

            // await timer(2000);

            // let selector = "body div:nth-child(2) div:nth-child(2) div:nth-child(1) form div:nth-child(2) div:nth-child(1) input";
            // await this.innerCrawler.clearInputByPath(selector);
            // await this.innerCrawler.inputTextByPath(selector, username);

            // selector = "body div:nth-child(2) div:nth-child(2) div:nth-child(1) form div:nth-child(2) div:nth-child(2) input";
            // await this.innerCrawler.clearInputByPath(selector);
            // await this.innerCrawler.inputTextByPath(selector, pasword);

            // selector = "body div:nth-child(2) div:nth-child(2) div:nth-child(1) form div:nth-child(2) div:nth-child(4)";
            // await this.innerCrawler.clearInputByPath(selector);
            // await this.innerCrawler.clickByPath(selector);

            
        }

    }

    return instance;
}

export default crawllogin;