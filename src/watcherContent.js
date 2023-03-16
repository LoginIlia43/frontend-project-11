import onChange from 'on-change';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import axios from 'axios';
import parser from './parser.js';

export default (watchedContentState) => onChange(watchedContentState, (path, value, prev) => {
  if (path === 'feeds') {
    renderFeeds(watchedContentState);
  } if (path === 'posts') {
    renderPosts(watchedContentState);
  }
});
