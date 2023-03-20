export default (watchedContentState) => {
  const postsContainer = document.getElementById('posts-container');
  postsContainer.innerHTML = '<div><h3>Posts</h3></div>';
  const ulEl = document.createElement('ul');
  watchedContentState.posts.forEach(({ title, link, id }) => {
    const liEl = document.createElement('li');
    liEl.classList.add('post-container', 'flex');
    const postTitleEl = document.createElement('a');
    postTitleEl.setAttribute('data-id', `${id}`);
    postTitleEl.textContent = title;
    postTitleEl.setAttribute('href', link);
    liEl.append(postTitleEl);
    const postButtonEl = document.createElement('button');
    postButtonEl.setAttribute('data-id', `${id}`);
    postButtonEl.classList.add(...['btn', 'btn-watch']);
    postButtonEl.textContent = 'Look';
    liEl.append(postButtonEl);
    ulEl.append(liEl);
  });
  postsContainer.append(ulEl);
};
