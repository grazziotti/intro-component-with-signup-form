const submitBtn = document.querySelector('.sign-up__form__btn')
const inputs = document.querySelectorAll('.sign-up__input')

const clearError = input => {
    const inputField = input.closest('.sign-up__input-field--error')
    if (inputField !== null) {
        const error = inputField.querySelector('.sign-up__error-message')
        inputField.removeChild(error)
        inputField.classList.remove('sign-up__input-field--error')
    }
}

const showError = (input, error) => {
    clearError(input)

    const errorContainer = document.createElement('p')
    errorContainer.classList.add('sign-up__error-message')

    let errorMessage = ''
    let inputName = input.getAttribute('placeholder')

    switch (error) {
        case 'empty':
            errorMessage = `${inputName} cannot be empty`
            break
        case 'email':
            errorMessage = 'Looks like this is not an email'
            break
    }

    errorContainer.innerText = errorMessage

    const inputField = input.closest('.sign-up__input-field')
    inputField.classList.add('sign-up__input-field--error')
    inputField.appendChild(errorContainer)
}

const checkEmail = input => {
    const email = input.value.trim()
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !regex.test(email)
}

const isEmpty = input => {
    return input.value === ''
}

const checkInput = input => {
    let rules = input.getAttribute('data-rules').split('|')
    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i]
        if (rule === 'required') {
            if (isEmpty(input)) {
                showError(input, 'empty')
                break
            }
        }
        if (rule === 'email') {
            if (checkEmail(input)) {
                showError(input, 'email')
                break
            }
        }
    }
}

const validate = e => {
    e.preventDefault()
    inputs.forEach( input => checkInput(input))
}

submitBtn.addEventListener('click', validate)

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        clearError(input)
    })
})
