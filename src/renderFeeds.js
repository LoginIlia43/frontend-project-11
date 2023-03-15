export default (watchedFeedState) => {
  const feedsContainer = document.getElementById('feeds-container');
  feedsContainer.innerHTML = '<div><h3>Feeds</h3></div>';
  console.log('renderfeeds')
  watchedFeedState.feeds.forEach(({ title, descr }) => {
    const feedDivEl = document.createElement('div');
    const feedTitleEl = document.createElement('h5');
    const feedDescriptionEl = document.createElement('p');
    feedTitleEl.textContent = title;
    feedDescriptionEl.classList.add('text');
    feedDescriptionEl.textContent = descr;
    feedDivEl.append(...[feedTitleEl, feedDescriptionEl]);
    feedsContainer.append(feedDivEl);
  });
};
