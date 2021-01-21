const { Notification, BrowserWindow } = require('electron');

function createWindow(size,file) {
    const w = new BrowserWindow({
        width: size.width,
        height: size.height,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    })

    w.loadFile('src/views/' + file);
    return w;
}

module.exports = {
    createWindow
}