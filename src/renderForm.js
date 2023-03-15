export default () => {
  const inputEl = document.querySelector('input');
  const errorEl = document.querySelector('.error');
  inputEl.value = '';
  inputEl.classList.remove('invalid');
  errorEl.classList.add('no-error');
  errorEl.textContent = 'RSS successfully loaded';
};
