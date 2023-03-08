import './styles.scss';
import 'bootstrap';
import onChange from 'on-change';

export default (state, render, renderForm) => {
    const watchedState = onChange(state, function (path, value) {
        render(watchedState);
        renderForm(watchedState);
    });
    return watchedState;
};
