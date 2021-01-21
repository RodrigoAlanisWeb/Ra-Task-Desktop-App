const inputs = document.querySelectorAll("#input");
const { remote } = require('electron');
const main = remote.require('./main');

const expresions = {
    user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	name: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const validators = {
    name: false,
    user: false,
    email: false,
    password: false,
}

const validate = (e) => {
    switch (e.target.name) {
        case 'name':
            if (expresions.name.test(e.target.value)){
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid')
                validators.name = true;
            } else {
                e.target.classList.remove('is-valid')
                e.target.classList.add('is-invalid')
                validators.name = false;
            }
        break;
        case 'username':
            if (expresions.user.test(e.target.value)){
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid')
                validators.user = true;
            } else {
                e.target.classList.remove('is-valid')
                e.target.classList.add('is-invalid')
                validators.user = false;
            }
        break;
        case 'email':
            if (expresions.email.test(e.target.value)){
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid')
                validators.email = true;
            } else {
                e.target.classList.remove('is-valid')
                e.target.classList.add('is-invalid')
                validators.email = false;
            }
        break;
        case 'password':
            if (expresions.password.test(e.target.value)){
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid')
                validators.password = true;
            } else {
                e.target.classList.remove('is-valid')
                e.target.classList.add('is-invalid')
                validators.password = false;
            }
        break;
    }
}

inputs.forEach(input => {
    input.addEventListener('keyup', validate);
    input.addEventListener('blur', validate);
});