const { app, Menu } = require('electron');
const storage = require('electron-localstorage');
const { createWindow } = require('./main');

require('electron-reload')(__dirname);

app.on('ready',()=>{
    createWindow({width: 1000, height: 800},'index.html');

    const template = [
        {
            label: 'Menu',
            submenu: [
                {
                    label: 'Home',
                    click: function(){
                        createWindow({width: 1000,height:800},'index.html')
                    }
                }
            ]
        },
    ];

    if (storage.getItem('token')) {
        template[1] = {
            label: 'User',
            submenu: [
                {
                    label: 'Account'
                },
                {
                    label: 'LogOut'
                },
                {
                    label: 'Go To App Page'
                }
            ]
        }

        template[0].submenu.push({
            label: 'Create',
            click: function(){
                createWindow({width: 500,height:700},'create.html')
            }
        });
    } else {
        template[0].submenu.push({
            label: 'Login',
            click: function(){
                createWindow({width: 500,height:700},'login.html')
            }
        });
        template[0].submenu.push({
            label: 'Register',
            click: function(){
                createWindow({width: 500,height:700},'register.html')
            }
        });
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
})