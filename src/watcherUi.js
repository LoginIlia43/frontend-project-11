import onChange from 'on-change';

export default (wUiState) => onChange(wUiState, (path, value, prev) => {
    const entries = Object.entries(wUiState.idIsRead);
    const posts = Array.from(document.querySelectorAll('a'));
    entries.forEach(([ id, isRead ]) => {
        const post = posts.find((post) => post.getAttribute('data-id') === id);
        if (isRead) {
            post.classList.remove('fw-bold');
            post.classList.add('fw-normal');
        } else {
            post.classList.add('fw-bold');
        }
    });
});
