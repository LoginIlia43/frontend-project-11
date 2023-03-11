export default () => {
  const inputEl = document.querySelector('input');
  const errorEl = document.querySelector('.error');
  inputEl.value = '';
  inputEl.classList.remove('invalid');
  errorEl.textContent = '';
};
