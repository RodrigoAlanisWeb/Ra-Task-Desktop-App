const create_form = document.getElementById('create_form');

create_form.addEventListener('submit',async (e) => {
    e.preventDefault()
    if (validators.name && validators.description) {
        document.getElementById('alert-err').classList.add('d-none');
        const data = new FormData(create_form);
        const task = {
            name: data.get('name'),
            description: data.get('description')
        };
        await main.createTask(task).catch(err => {
            document.getElementById('alert-err').classList.remove('d-none');
            return;
        });
        const w = remote.getCurrentWindow();
        w.reload();
    } else {
        document.getElementById('alert-err').classList.remove('d-none')
    }
})

