export default (status) => {
  const btnEl = document.querySelector('.btn');
  switch (status) {
    case 'filling':
      btnEl.removeAttribute('disabled');
      break;
    case 'checking':
      btnEl.setAttribute('disabled', 'disabled');
      break;
    case 'valid':
      const inputEl = document.querySelector('input');
      const errorEl = document.querySelector('.error');
      inputEl.value = '';
      inputEl.classList.remove('invalid');
      errorEl.classList.add('no-error');
      errorEl.textContent = 'RSS успешно загружен';
      inputEl.focus();
      break;
    default:
      break;
  };
};
