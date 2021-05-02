const electron = require('electron');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
// const isMac = process.platform === 'darwin'
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadFile('index.html');
    mainWindow.on('closed', () => app.quit());

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu)
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        height: 300,
        width: 200,
        title: 'Add new todo',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    addWindow.loadFile('addTodo.html');
    addWindow.on('closed',()=> addWindow = null)
}

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
});

const menuTemplate = [
    // optional for multi OS implementation
    // ...(isMac ? [{
    //     label: 'File',
    //     submenu: [
    //         {role: 'about'},
    //         {type: 'separator'},
    //         {role: 'services'},
    //         {type: 'separator'},
    //         {role: 'hide'},
    //         {role: 'hideothers'},
    //         {role: 'unhide'},
    //         {type: 'separator'},
    //         {role: 'quit'}
    //     ]
    // }] : [{
    //     label: 'File',
    //     submenu: [
    //         {label: 'Add Todo'},
    //         {label: 'Exit'}
    //     ]
    // }]),
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Todo',
                click: () => createAddWindow()

            },
            {
                label: 'Clear Todo',
                click:()=>{
                    mainWindow.webContents.send('todo:clear')
                }
                // role: 'reload'
            },
            {
                role: 'Quit',
                // accelerator:'Ctrl+Q'
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q'
            }
        ]
    },

];

if (process.platform === 'darwin') {
    menuTemplate.unshift({})
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'View',
        // optional for multi OS implementation
        // click:(item, focusedWindow)=>{
        //     focusedWindow.toggleDevTools()
        // },
        submenu: [
            {role: 'reload'},
            {role: 'forceReload'},
            {role: 'toggleDevTools'},
            {type: 'separator'},
            {role: 'resetZoom'},
            {role: 'zoomIn'},
            {role: 'zoomOut'},
            {type: 'separator'},
            {role: 'togglefullscreen'}
        ]
    })
}

