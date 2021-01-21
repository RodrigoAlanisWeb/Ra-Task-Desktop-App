const reg_form = document.getElementById('register-form');

reg_form.addEventListener('submit',async (e) => {
    e.preventDefault()

    if (validators.name && validators.user && validators.email && validators.password) {
        console.log('Success');
        document.getElementById('alert-err').classList.add('d-none');
        const data = new FormData(reg_form);
        const user = {
            name:  data.get('name'),
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password')
        };
        await main.register(user);
        const w = remote.getCurrentWindow();
        main.reload();
        w.close();
    } else {
        document.getElementById('alert-err').classList.remove('d-none')
    }
});






