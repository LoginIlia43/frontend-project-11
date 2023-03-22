import onChange from 'on-change';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import axios from 'axios';
import parser from './parser.js';
import { doc } from 'prettier';
import renderModal from './renderModal.js';

export default (watchedContentState, wUiState) => onChange(watchedContentState, (path, value, prev) => {
  if (path === 'feeds') {
    renderFeeds(watchedContentState);
  }
  if (path === 'posts') {
    renderPosts(watchedContentState);
    handlePostClick(wUiState);
    handlePostButtonClick(watchedContentState);
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
};

const handlePostButtonClick = (watchedContentState) => {
  const buttons = document.querySelectorAll('.btn-watch');
  buttons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const id = String(evt.target.getAttribute('data-id'));
      const { title, description, link } = watchedContentState.posts.find((post) => post.id == id);
      renderModal(title, description, link);
    });
  });
};
