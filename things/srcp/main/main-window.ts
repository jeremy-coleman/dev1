import { BrowserWindow, } from "electron";
import { isNullOrUndefined as isNull } from "util";
import { renderToFile } from "./index-page";
import {CONSTANTS} from './constants'


let win: Electron.BrowserWindow;

    // return same window until disposed
export const getWindow: () => Electron.BrowserWindow = () => {
    if (!isNull(win)) return win;

    win = new BrowserWindow({
        show: false,
        icon: CONSTANTS.iconPath,
        autoHideMenuBar: false,
        width: 1200,
        height: 900
    });

    // renderToFile generates minimal html, to load the window script
    win.loadURL("file:///" +
        renderToFile({
            title: "Coglite",
            scripts: ["app.js"],
            styles: ["app/styles/app.css"],
            outDir: __dirname + "/../",
            fileName: "window.html"
        })
    );
    win.on("close", () => {
        win.removeAllListeners();
        win = null;
    });

    return win;
};

            /**
             * scripts:
             * script name to be loaded by the rendered HTML file
             * will load index.js that simply 'require("window");
             * allowing Electron to bootstrap the  renderer environment
             * trying to load "window.js" directly will find "exports"
             * doesn't exists yet
             * 
             * outDir:
             * output directory to join in path
             */