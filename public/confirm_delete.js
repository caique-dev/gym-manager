const formDelete = document.querySelector('#form_delete')

formDelete.addEventListener('submit', e => {
    const confirmation = confirm('Deseja deletar o perfil?')
    if (!confirmation) e.preventDefault()
})