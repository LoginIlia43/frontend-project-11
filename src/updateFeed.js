import parser from './parser.js';
import axios from 'axios';

const updateFeed = (feed, watchedContentState) => {
  const { id, link } = feed;
  const allOriginsLink = `https://allorigins.hexlet.app/get?disableCache=true&url=${link}`;
  console.log('updating')
  setTimeout(() => {
    axios.get(allOriginsLink)
    .then((html) => parser(html.data.contents))
    .then((data) => {
      const items = Array.from(data.querySelectorAll('item'));
      const filteredPosts = watchedContentState.posts.filter(post => post.feedId === id);
      items.forEach((post) => {
        const title = post.querySelector('title').textContent;
        const link = post.querySelector('link').textContent;
        
        if (filteredPosts.find(p => p.title === title) === undefined) {
          const postId = filteredPosts.length + 1;
          watchedContentState.posts.push({ id: postId, feedId: id, title, link });
        }
      })
      updateFeed(feed, watchedContentState);
    })
    .catch((e) => {
      console.log(e);
      updateFeed(feed, watchedContentState)});
  }, 5000);
};

export default updateFeed;