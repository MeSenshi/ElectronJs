const electron = require('electron');
const {BrowserWindow} = electron;

class MainWindow extends BrowserWindow {
    constructor(url) {
        super({ // passing like that
            // options is not the best practice
            // but we know that we always want the same
            //size for mainWindow
            height: 550,
            width: 300,
            frame: true,
            resizable: false,
            show: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                backgroundThrottling: false // enables animations and
                // timers work correctly without delay
            }
        });

        this.loadURL(url)
        this.on('blur', this.onBlur.bind(this))
    }

    onBlur() {
        this.hide();
    }

}


module.exports = MainWindow;