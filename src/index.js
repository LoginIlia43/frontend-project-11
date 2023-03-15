import './styles.scss';
import 'bootstrap';
import { object, string } from 'yup';
import axios from 'axios';
import watcher from './watcher.js';
import parser from './parser.js';
import watcherFeed from './watcherFeed.js';

const app = () => {
  const state = {
    formState: {
      link: '',
      state: 'filling',
      errors: [],
    },
    rssList: [],
  };

  const infoState = {
    feeds: [],
    posts: [],
  }
  
  const watchedState = watcher(state);
  const watchedFeedState = watcherFeed(infoState); 
  
  const getInfo = (document) => {
    const feedsId = watchedFeedState.feeds.length + 1;
    const feedTitle = document.querySelector('title').textContent;
    const feedDescription = document.querySelector('description').textContent;
    watchedFeedState.feeds.push({ id: feedsId, title: feedTitle, descr: feedDescription, link: watchedState.formState.link });

    const items = Array.from(document.querySelectorAll('item'));
    let postId = 1;
    items.forEach((post) => {
      const title = post.querySelector('title').textContent;
      const link = post.querySelector('link').textContent;
      watchedFeedState.posts.push({ id: postId, feedId: feedsId, title, link });
      postId = postId + 1;
    });
  };

  const validateLink = (watchedState) => {
    const schema = object({
      link: string().url().test({
        name: 'dublicate',
        skipAbsent: true,
        test(link, ctx) {
          if (watchedState.rssList.includes(link)) {
            return ctx.createError({ message: 'This RSS is already in the list' });
          }
          return true;
        },
      }),
    });

    return schema.validate(state.formState);
  };
  const form = document.querySelector('form');

  const handleSubmit = (watchedState) => {
    const { formState } = watchedState;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      formState.link = formData.get('link');
      formState.state = 'validating';
      await validateLink(watchedState)
        .then(() => {
          formState.state = 'sent';
          const allOriginsLink = `https://allorigins.hexlet.app/get?disableCache=true&url=${formState.link}`;
          return axios.get(allOriginsLink);
        })
        .then((response) => parser(response.data.contents))
        .then((parsed) => {
          watchedState.rssList.push(formState.link);
          console.log(parsed)
          getInfo(parsed);
        })
        .catch((e) => {
          formState.errors = e.errors ? e.errors : e;
          formState.state = 'failed';
        });
    });
  };

  handleSubmit(watchedState);
};

app();
