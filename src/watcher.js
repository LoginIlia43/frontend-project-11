import onChange from 'on-change';
import renderError from './renderError.js';
import renderForm from './renderForm.js';

export default (state) => onChange(state, (path, value, prev) => {
  if (path === 'formState.state') {
    switch (value) {
      case 'sent':
        renderForm();
        break;
      case 'failed':
        renderError(state);
        break;

      default:
        break;
    }
  }
});
