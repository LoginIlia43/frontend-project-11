import onChange from 'on-change';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import axios from 'axios';
import parser from './parser.js';

export default (watchedContentState, wUiState) => onChange(watchedContentState, (path, value, prev) => {
  if (path === 'feeds') {
    renderFeeds(watchedContentState);
  } if (path === 'posts') {
    renderPosts(watchedContentState);
    handlePostClick(wUiState);
  }
});

const handlePostClick = (uiState) => {
  const posts = Array.from(document.querySelectorAll('li'));
  posts.forEach((post) => {
    const children = Array.from(post.children);
    children.forEach((child) => {
      child.addEventListener('click', (evt) => {
        const id = evt.target.getAttribute('data-id');
        uiState.idIsRead[id] = true;
      })
    })
  })
}