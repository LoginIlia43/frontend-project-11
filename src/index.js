import './styles.scss';
import 'bootstrap';
import { object, string } from 'yup';
import axios from 'axios';
import watcherState from './watcherState.js';
import parser from './parser.js';
import watcherContent from './watcherContent.js';
import updateFeed from './updateFeed.js';

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
  };




  const watchedState = watcherState(state);
  const watchedContentState = watcherContent(infoState); 
  
  const getInfo = (document) => {
    const feedsId = watchedContentState.feeds.length + 1;
    const feedTitle = document.querySelector('title').textContent;
    const feedDescription = document.querySelector('description').textContent;
    watchedContentState.feeds.push({ id: feedsId, title: feedTitle, descr: feedDescription, link: watchedState.formState.link });

    const items = Array.from(document.querySelectorAll('item'));
    let postId = 1;
    items.forEach((post) => {
      const title = post.querySelector('title').textContent;
      const link = post.querySelector('link').textContent;
      const description = post.querySelector('description').textContent;

      watchedContentState.posts.push(
        {
          id: postId,
          feedId: feedsId,
          title,
          link,
          description,
        });
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
          const allOriginsLink = `https://allorigins.hexlet.app/get?disableCache=true&url=${formState.link}`;
          return axios.get(allOriginsLink);
        })
        .then((response) => parser(response.data.contents))
        .catch((e) => {
          formState.errors = e.errors ? e.errors : e;
          formState.state = 'failed';
        })
        .then((parsed) => {
          formState.state = 'sent';
          watchedState.rssList.push(formState.link);
          getInfo(parsed);
          const feed = watchedContentState.feeds.find((feed) => feed.link === formState.link);
          updateFeed(feed, watchedContentState);
        })
        .catch(() => {
          formState.state = 'failed';
        });

    });
  };

  handleSubmit(watchedState);

};

app();
