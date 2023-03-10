export default (watchedState) => {
  const inputEl = document.querySelector('input');
  const errorEl = document.querySelector('.error');
  const errorText = watchedState.formState.errors;
  errorEl.textContent = errorText;
  inputEl.classList.add('invalid');
};
