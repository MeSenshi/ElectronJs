const path = require('path');
const electron = require('electron');
const {app, ipcMain} = electron;
const TimerTray = require('./TimerTray');
const MainWindow = require('./MainWindow');
let mainWindow;
let tray;

app.on('ready', () => {
    //app.dock.hide(); // only in macOS
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

    const iconName =
        process.platform === 'win32'
            ? './windows-icon@2x.png'
            : './iconTemplate.png';
    const iconPath =
        path.join(__dirname, `./src/assets/${iconName}`)
    tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on("update:timer", (event, timeLeft)=>{
    tray.setTitle(timeLeft); // tray.setTitle(title) works only on macOS
})