import parser from './parser.js';
import axios from 'axios';

const updateFeed = (feed, watchedContentState, wUiState) => {
  const { id, link } = feed;
  const allOriginsLink = `https://allorigins.hexlet.app/get?disableCache=true&url=${link}`;
  setTimeout(() => {
    axios.get(allOriginsLink)
    .then((html) => parser(html.data.contents))
    .then((data) => {
      const items = Array.from(data.querySelectorAll('item'));
      items.forEach((post) => {
        const title = post.querySelector('title').textContent;
        const link = post.querySelector('link').textContent;
        
        if (watchedContentState.posts.find(p => p.title === title) === undefined) {
          const postId = watchedContentState.posts.length + 1;
          watchedContentState.posts.push({ id: postId, feedId: id, title, link });
          wUiState.idIsRead[postId] = false;
        }
      })
      updateFeed(feed, watchedContentState, wUiState);
    })
    .catch(() => {
      updateFeed(feed, watchedContentState, wUiState)});
  }, 5000);
};

export default updateFeed;
