
document.addEventListener('DOMContentLoaded', () => {
    let closeFlashButton = document.querySelector('span.close-flash')
    if (closeFlashButton) {
        closeFlashButton.addEventListener('click', closeFlashMessage)
    }

    const completeStepCheckboxes = document.querySelectorAll('input.complete-step')
    if (completeStepCheckboxes) {
        completeStepCheckboxes.forEach(x => x.addEventListener('change', completeStep))
    }
})

const closeFlashMessage = (ev) => {
    const flashMessage = ev.target.parentElement
    flashMessage.remove()
}

const completeStep = async (ev) => {
    const checkbox = ev.target
    const {pathId, stepId, done} = checkbox.dataset
    console.log({pathId, stepId});
    const response = await fetch('/api/profile/update-step', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({pathId, stepId, done: !done})
    })

    if (response.ok) {
        const step = checkbox.parentElement;
        step.classList.toggle('done')
    }
}