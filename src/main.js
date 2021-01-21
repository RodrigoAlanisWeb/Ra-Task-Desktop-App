const { Notification, BrowserWindow, Menu } = require('electron');
const axios = require('axios');
const api_url = 'https://ra-task-app-api.herokuapp.com/';
const storage = require('electron-localstorage');

function createWindow(size, file) {
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
};

async function register(user) {

    const request = await axios({
        method: 'post',
        url: api_url + 'api/auth/singup',
        data: user
    }).catch(err => {
        new Notification({
            title: 'Ra Task App | Error',
            body: 'Error At Creating The User'
        }).show()
        return;
    });

    new Notification({
        title: 'Ra Task App | Desktop',
        body: 'User Created Successfully'
    }).show();

    storage.setItem('token',request.data.token);
    return;
}

async function login(user) {
    const request = await axios({
        method: 'post',
        url: api_url + 'api/auth/login',
        data: user
    }).catch(err => {
        new Notification({
            title: 'Ra Task App | Error',
            body: 'Error At Login'
        }).show()
        return;
    });

    new Notification({
        title: 'Ra Task App | Desktop',
        body: 'You Login Successfully'
    }).show();

    storage.setItem('token',request.data.token);
    return;
}

function logout() {
    storage.removeItem('token');
    reload();
}

function reload() {
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
                    label: 'LogOut',
                    click: function () {
                        logout()
                    }
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
}

module.exports = {
    createWindow,
    register,
    reload,
    login
}