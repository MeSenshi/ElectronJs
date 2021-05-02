const electron = require('electron');
const {Tray, Menu} = electron;

class TimerTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);

        this.mainWindow = mainWindow;
        this.setToolTip('Timer App')
        this.on('click', this.onClick.bind(this))
        this.on('right-click', this.onRightClick.bind(this))
    }

    onClick(event, bounds) {
        console.log(bounds)
        const {x, y} = bounds;
        const {height, width} = this.mainWindow.getBounds();
        console.log(this.mainWindow.getBounds())
        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide()
        } else {
            const yPosition =
                process.platform === 'darwin' ? y : y - height
            this.mainWindow.setBounds({
                x: Math.floor(x - width / 2),
                y: Math.floor(yPosition),
                height: height,
                width: width
            })
            this.mainWindow.show();
        }
    }

    onRightClick() {
        const menuConfig = Menu.buildFromTemplate([
            {role: 'quit'}
        ]);

        this.popUpContextMenu(menuConfig)
    }
}

module.exports = TimerTray;