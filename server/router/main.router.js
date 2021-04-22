import express from "express";

// import { CRAWL_LOGIN_URL } from "../constants/crawllogin/crawllogin.constants";
// import { DO_CRAWL_URL } from "../constants/docrawl/docrawl.constants";
// import { REACTJS_URL, REACTJS_EXACT_URL } from "../constants/reactjs/reactjs.constants";

import { COMMON_SERVER_OBJECT, COMMON_SERVER_KEY, COMMON_REACTJS_KEY, COMMON_REACTJS_OBJECT } from "../../common/constants/common.constants";

import crawllogin from "../controller/crawllogin/crawlogin.controller";
import receive from "../controller/reactjs/render.controller";
import docrawl from "../controller/docrawl/docrawl.controller";

const router = express.Router();

let urlMap = new Map();
urlMap.set(COMMON_SERVER_OBJECT[COMMON_SERVER_KEY.COMMON_SERVER_DOCRAWL], (req, res) => docrawl(req, res));
urlMap.set(COMMON_SERVER_OBJECT[COMMON_SERVER_KEY.COMMON_SERVER_CRAWLLOGIN], (req, res) => crawllogin(req, res));
urlMap.set(COMMON_REACTJS_OBJECT[COMMON_REACTJS_KEY.COMMON_REACTJS_EXACT_URL], (req, res) => receive(req, res));


//render reacjs và do crawl
router.get("/*", async (req, res) => {
    console.log("server url", req.url);
    let isClient = false;
    // Object.keys(COMMON_REACTJS_OBJECT).some((key) => {
    //     if(req.url == COMMON_REACTJS_OBJECT[key]){
    //         console.log("url find",COMMON_REACTJS_OBJECT[key]);
    //         isClient = true;
    //         return true;
    //     }
    // });

    for (let key in COMMON_REACTJS_OBJECT) {
        if(req.url == COMMON_REACTJS_OBJECT[key]){
            isClient = true;
        }
      }

    console.log("isClient", isClient);
    //if (req.url == COMMON_REACTJS_EXACT_URL) {
    if (!isClient) {
        let executeController = urlMap.get(req.url);
        executeController(req, res);
    } else {
        console.log("REACTJS_EXACT_URL");
        let executeController = urlMap.get(COMMON_REACTJS_OBJECT[COMMON_REACTJS_KEY.COMMON_REACTJS_EXACT_URL]);
        executeController(req, res);
    }
    // if (req.url == DO_CRAWL_URL) {
    //     docrawl(req, res);
    // } else if (req.url == CRAWL_LOGIN_URL) {
    //     crawllogin(req, res);
    // } else {
    //     receive(req, res);
    // }
});


export default router;