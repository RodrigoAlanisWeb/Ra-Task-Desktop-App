const { app, Menu } = require('electron');
const storage = require('electron-localstorage');
const { createWindow, reload } = require('./main');

require('electron-reload')(__dirname);

app.on('ready',()=>{
    const w = createWindow({width: 1000, height: 800},'index.html');
    reload()
});