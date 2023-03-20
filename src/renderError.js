export default (wState) => {
  console.log(wState.formState.errors)
  const inputEl = document.querySelector('input');
  const errorEl = document.querySelector('.error');
  const errorText = wState.formState.errors;
  errorEl.classList.remove('no-error');
  errorEl.textContent = errorText;
  inputEl.classList.add('invalid');
};
