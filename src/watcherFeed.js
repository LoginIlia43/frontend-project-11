import onChange from 'on-change';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';

export default (watchedFeedState) => onChange(watchedFeedState, (path, value, prev) => {
  if (path === 'feeds') {
    renderFeeds(watchedFeedState);
  } else {
    renderPosts(watchedFeedState);
  }
});
