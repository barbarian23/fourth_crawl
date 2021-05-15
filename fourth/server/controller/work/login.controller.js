import { LOGIN_URL, HOME_URL } from "../../constants/work/work.constants";
import { SOCKET_SOMETHING_ERROR, SOCKET_LOGIN_INCORRECT, SOCKET_LOGIN_STATUS } from "../../../common/constants/common.constants";


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
async function doLogin(username, password, socket, driver) {
    try {


        //driver.build();
        console.log("username ", username, "password", password);
        // go to login url
        await driver.goto(LOGIN_URL);

        // wait to complete
        await driver.waitForFunction('document.readyState === "complete"');

        // select to username input & send username
        let selector = "body #ctl01 .page .main .accountInfo #MainContent_LoginUser_UserName";
        await driver.$eval(selector, (el, value) => el.value = value, username);

        // select to password input & send password
        selector = "body #ctl01 .page .main .accountInfo #MainContent_LoginUser_Password";
        await driver.$eval(selector, (el, value) => el.value = value, password);

        // select to button login & click button
        selector = "body #ctl01 .page .main .accountInfo #MainContent_LoginUser_LoginButton";
        await Promise.all([driver.click(selector), driver.waitForNavigation({ waitUntil: 'networkidle0' })]);

        await timer(2000);



        let dataFromLoginSummarySpan = await driver.$$eval("body #ctl01 .page .main .failureNotification", spanData => spanData.map((span) => {
            return span.innerHTML;
        }));

        if (dataFromLoginSummarySpan.length > 0) {
            socket.send(SOCKET_LOGIN_INCORRECT, { data: -1 });
            return;
        }




        //let curUrl = await driver.waitForFunction("location.href");

        //const curUrl = await page.evaluate(new Function('name', "return new Promise(resolve => {resolve('done')});"), name);



        socket.send(SOCKET_LOGIN_STATUS, { data: 1 });

        // console.log("url", curUrl);

        // if (curUrl.includes("https://github.com")) {
        //     socket.send(SOCKET_LOGIN_STATUS, { data: 1 });
        // }

        await driver.goto(HOME_URL);

        //tạo các hàm  sẵn có

        //hàm downlaod html
        // await driver.evaluate(() => {
        //     window.getPhone = (phone) => {
        //         console.log("phone is", phone);
        //         let get = () => {
        //             return new Promise((resolve, reject) => {
        //                 try {
        //                     let first = document.querySelector("#ctl01 > div:nth-child(1)").getElementsByTagName("input");

        //                     let form = first[0].id + "=" + first[0].value + "&" + first[1].id + "=" + first[1].value + "&" + first[2].id + "=" + encodeURIComponent(first[2].value) + "&";


        //                     let second = document.querySelector("#ctl01 > div:nth-child(4)").getElementsByTagName("input");

        //                     form = form + second[0].id + "=" + encodeURIComponent(second[0].value) + "&ctl00%24MainContent%24msisdn=" + phone + "&ctl00%24MainContent%24submit_button=T%C3%ACm+ki%E1%BA%BFm";



        //                     let formData = new FormData();
        //                     formData.append("", form);
        //                     fetch("https://10.156.0.19/Account/Subs_info_120days.aspx", {
        //                         method: "POST",
        //                         headers: {
        //                             "Content-Type": "application/x-www-form-urlencoded",
        //                         },
        //                         body: formData,
        //                     })
        //                         .then(response => { return response.text(); })
        //                         .then(data => {
        //                             resolve(data);
        //                         })
        //                         .catch((error) => {
        //                             reject(e);
        //                         });
        //                 } catch (e) {
        //                     reject(e);
        //                 }
        //             });
        //         }

        //         return new Promise(async (resolve, reject) => {
        //             try {
        //                 let resultt = await get(phone);
        //                 resolve(resultt);
        //             } catch (e) {
        //                 reject(null);
        //             }
        //         });
        //     }
        // });

        let stringF = 'window.getPhone = async (phone) => {' +
            'console.log(phone);' +
            'async function action(){' +
            'function get(){' +
            'return new Promise((resolve,reject)=>{' +
            'try{' +
            'let first = document.querySelector("#ctl01 > div:nth-child(1)").getElementsByTagName("input");' +

            'let form = first[0].id + "=" + first[0].value + "&" + first[1].id + "=" + first[1].value + "&" + first[2].id + "=" + encodeURIComponent(first[2].value) + "&";' +


            'let second = document.querySelector("#ctl01 > div:nth-child(4)").getElementsByTagName("input");' +

            'form = form + second[0].id + "=" + encodeURIComponent(second[0].value) + "&ctl00%24MainContent%24msisdn="+phone+"&ctl00%24MainContent%24submit_button=T%C3%ACm+ki%E1%BA%BFm";' +

            'let formData = new FormData();' +
            'formData.append("", form);' +
            'fetch("https://10.156.0.19/Account/Subs_info_120days.aspx", {' +
            'method: "POST",' +
            'headers: {' +
            '"Content-Type": "application/x-www-form-urlencoded",' +
            '},' +
            'body: formData,' +
            '})' +
            '.then(response => { return response.text(); })' +
            '.then(data => {' +
            'resolve(data);' +
            '})' +
            '.catch((error) => {' +
            'console.log("fetch eror",error);' +
            'reject(error);' +
            '});' +

            '}catch (e) {' +
            'console.log("try catch above",e);' +
            'reject(e);' +
            '}' +
            '});' +
            '}' +
            'try {' +
            'let resultt = await get();' +
            'return resultt;' +
            '} catch (e) {' +
            'return null;' +
            '}' +
            '};' +

            'return await action()' +
            '}';

        await driver.evaluate(stringF);


    } catch (e) {
        console.log("Login Error", e);
        socket.send(SOCKET_LOGIN_INCORRECT, { data: -1 });
        socket.send(SOCKET_SOMETHING_ERROR, { data: 0 });
    }
}
export default doLogin;
