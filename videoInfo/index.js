const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const {app, BrowserWindow, ipcMain} = electron;
let mainWindow;

app.on('ready', () => {
     mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:false
        }});
    mainWindow.loadFile('index.html')
});

ipcMain.on('video:submit', (event, path) => {
    ffmpeg.setFfprobePath("c:\\FFmpeg\\bin\\ffprobe.exe");
    ffmpeg.ffprobe(path, (err, metadata) => {
        mainWindow.webContents.send('video:metadata', metadata.format.duration);
    })
});
