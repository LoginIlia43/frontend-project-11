export default (watchedState) => {
    const inputEl = document.querySelector('input');
    const errorEl = document.querySelector('.error')
    const errorText = watchedState.errors;
    watchedState.isValidForm ? inputEl.classList.remove('invalid') : inputEl.classList.add('invalid');
    errorEl.textContent = errorText;
};
