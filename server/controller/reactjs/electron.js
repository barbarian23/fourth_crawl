const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
//const ECLECTRON_LOAD = require("../../../common/constants/common.constants");


let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680 });
     mainWindow.webContents.openDevTools();
     console.log(isDev);
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000/login"
            : `file://${__dirname}/../../../../../../../dist/public/index.html`  
            //`file://${__dirname}/dist/index.html`
            //win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
    );
    mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});