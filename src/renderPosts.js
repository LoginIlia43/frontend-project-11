export default (watchedContentState) => {
  const postsContainer = document.getElementById('posts-container');
  postsContainer.innerHTML = '<div><h3>Posts</h3></div>';
  watchedContentState.posts.forEach(({ title, link, id }) => {
    const postDivEl = document.createElement('div');
    postDivEl.classList.add('post-container', 'flex');
    const postTitleEl = document.createElement('a');
    postTitleEl.setAttribute('data-id', `${id}`);
    postTitleEl.textContent = title;
    postTitleEl.setAttribute('href', link);
    postDivEl.append(postTitleEl);
    const postButtonEl = document.createElement('button');
    postButtonEl.setAttribute('data-id', `${id}`);
    postButtonEl.classList.add(...['btn', 'btn-watch']);
    postButtonEl.textContent = 'Look';
    postDivEl.append(postButtonEl);
    postsContainer.append(postDivEl);
  });
};
