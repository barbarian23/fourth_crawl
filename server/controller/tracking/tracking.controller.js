import seleniumCrawl from "../../service/crawler/selenium.service";

export default function tracking(req, res) {
    console.log("docrawl");
    let sseInstance = new sseServer(res);

    let seleniumInsstance = new seleniumCrawl();

    sseInstance.sendData("Chuyển hướng tới google");

    seleniumInsstance.goto("https://google.com");

    // let interval = setInterval(function () {
    //     const data = {
    //         value: Math.random(),
    //     };
    //     console.log("send to client", data);
    //     sseInstance.sendData(data);
    // }, 1000);

    //sseInstance.close(clearInterval, interval);

}