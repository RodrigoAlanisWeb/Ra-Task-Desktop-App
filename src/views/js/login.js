const log_form = document.getElementById('login-form');

log_form.addEventListener('submit',async (e) => {
    e.preventDefault()
    if (validators.email && validators.password) {
        console.log('Success');
        document.getElementById('alert-err').classList.add('d-none');
        const data = new FormData(log_form);
        const user = {
            email: data.get('email'),
            password: data.get('password')
        };
        await main.login(user).catch(err => {
            document.getElementById('alert-err').classList.remove('d-none');
            return;
        });
        const w = remote.getCurrentWindow();
        main.reload();
        w.close();
    } else {
        document.getElementById('alert-err').classList.remove('d-none')
    }
})
