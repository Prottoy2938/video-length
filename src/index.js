const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });
  mainWindow.loadFile("./src/index.html");
});

ipcMain.on("video:submit", (event, path) => {
  ffmpeg.ffprobe(path, function (err, metadata) {
    mainWindow.webContents.send("video:length", metadata.format.duration);
  });
});
