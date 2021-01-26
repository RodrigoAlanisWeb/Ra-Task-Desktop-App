const { remote } = require('electron');
const main = remote.require('./main');
const container = document.getElementById("main");

console.log('user');

async function logout() {
    main.logout();
    remote.getCurrentWindow().close();
}

async function init(){
    const user = await main.getProfile();
    console.log(user);
    container.innerHTML = `
    <div class="card" style="width: 100%;">
        <div class="card-body">
          <h5 class="card-title">${user.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${user.username}</h6>
          <p class="card-text">
              ${user.email}
          </p>
          <button onclick="logout()" class="btn btn-danger">
              Logout
          </button>
        </div>
    </div>
    `
}

init();
