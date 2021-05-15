import receive from "../controller/reactjs/render.controller"; // render client

//render ra file html    
const router = async function (req, res) {
    console.log("url", req.url);
    receive(req, res);
};

export default router;
// import express from "express";
// import receive from "../controller/reactjs/render.controller"; // render client
// import working from "../controller/work/work.controller";//working socket

// const router = express.Router();

// const app = express();

// //render ra file html
// //router.get("/*", async (req, res) => {
// app.use("/*", async (req, res) => {
//     console.log("url", req.url);
//     receive(req, res);
// });


// export default router;