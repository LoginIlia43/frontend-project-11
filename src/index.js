import './styles.scss';
import 'bootstrap';
import { object, string } from 'yup';
import axios from 'axios';
import watcherState from './watcherState.js';
import parser from './parser.js';
import watcherContent from './watcherContent.js';
import updateFeed from './updateFeed.js';
import watcherUi from './watcherUi.js';

const app = () => {
  const state = {
    formState: {
      link: '',
      state: 'filling',
      errors: null,
    },
    rssList: [],
  };

  const contentState = {
    feeds: [],
    posts: [],
  };

  const uiState = {
    idIsRead: {},
  };

  const wState = watcherState(state);
  const wContentState = watcherContent(contentState);
  const wUiState = watcherUi(uiState);
  
  const addContent = (document) => {
    const feedsId = wContentState.feeds.length + 1;
    const feedTitle = document.querySelector('title').textContent;
    const feedDescription = document.querySelector('description').textContent;
    wContentState.feeds.push({ id: feedsId, title: feedTitle, descr: feedDescription, link: wState.formState.link });

    const items = Array.from(document.querySelectorAll('item'));
    items.forEach((post) => {
      const postId = wContentState.posts.length + 1;
      const title = post.querySelector('title').textContent;
      const link = post.querySelector('link').textContent;
      const description = post.querySelector('description').textContent;

      wContentState.posts.push(
        {
          id: postId,
          feedId: feedsId,
          title,
          link,
          description,
        });
      wUiState.idIsRead[postId] = false;
    });
  };

  const validateLink = (wState) => {
    const schema = object({
      link: string().url().test({
        name: 'dublicate',
        skipAbsent: true,
        test(link, ctx) {
          if (wState.rssList.includes(link)) {
            return ctx.createError({ message: 'This RSS is already in the list' });
          }
          return true;
        },
      }),
    });

    return schema.validate(state.formState);
  };
  const form = document.querySelector('form');

  const handleSubmit = () => {
    const { formState } = wState;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      formState.link = formData.get('link');
      formState.state = 'checking';
      await validateLink(wState)
        .then(() => {
          const allOriginsLink = `https://allorigins.hexlet.app/get?disableCache=true&url=${formState.link}`;
          return axios.get(allOriginsLink);
        })
        .then((response) => parser(response.data.contents))
        .then((parsed) => {
          formState.state = 'valid';
          addContent(parsed);
          wState.rssList.push(formState.link);
          const feed = wContentState.feeds.find((feed) => feed.link === formState.link);
          updateFeed(feed, wContentState, wUiState);
          formState.state = 'filling';
        })
        .catch((e) => {
          formState.errors = e;
          formState.state = 'invalid';
          formState.state = 'filling';
        });
    });
  };

  handleSubmit(wState);
};

app();
