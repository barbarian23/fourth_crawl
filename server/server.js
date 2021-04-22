import '@babel/polyfill';
// import compression from "compression";
import express from "express";
//import bodyParser from 'body-parser';
import path from "path";
import router from "./router/main.router";
import cors from "cors";
import { PORT } from "../common/constants/common.constants";

const app = express();

// app.use(compression());

//sử dụng thư mục static
app.use("/static", express.static(path.resolve(__dirname, "public")));

//middleware được sử dụng để nhận các request từ client
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/*",router);

app.listen(PORT, () => console.log("######## app running on port " + PORT + " ########"));