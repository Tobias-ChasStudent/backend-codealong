
document.addEventListener('DOMContentLoaded', () => {
    let closeFlashButton = document.querySelector('span.close-flash')
    closeFlashButton.addEventListener('click', closeFlashMessage)
})

const closeFlashMessage = (ev) => {
    const flashMessage = ev.target.parentElement
    flashMessage.remove()
}