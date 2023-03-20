import onChange from 'on-change';
import renderError from './renderError.js';
import renderForm from './renderForm.js';

export default (state) => onChange(state, (path, value, prev) => {
  if (path === 'formState.state') {
    switch (value) {
      case 'filling':
        renderForm(value);
        break;
      case 'checking':
        renderForm(value);
        break;
      case 'valid':
        renderForm(value);
        break;
      case 'invalid':
        renderError(state);
        break;
      default:
        break;
    }
  }
});
