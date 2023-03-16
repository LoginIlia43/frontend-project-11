export default (watchedContentState) => {
  const postsContainer = document.getElementById('posts-container');
  postsContainer.innerHTML = '<div><h3>Posts</h3></div>';
  watchedContentState.posts.forEach(({ title, link }) => {
    const postsDivEl = document.createElement('div');
    const postTitleEl = document.createElement('a');
    postTitleEl.textContent = title;
    postTitleEl.setAttribute('href', link);
    postsDivEl.append(postTitleEl);
    postsContainer.append(postsDivEl);
  });
};
