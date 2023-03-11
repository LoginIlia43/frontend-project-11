import './styles.scss';
import 'bootstrap';
import { object, string } from 'yup';
import axios from 'axios';
import watcher from './watcher.js';
import parser from './parser.js';

const app = () => {
  const state = {
    formState: {
      link: '',
      state: 'filling',
      errors: [],
    },
    rssList: [],
  };

  const watchedState = watcher(state);

  const validateLink = async (watchedState) => {
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

    return await schema.validate(state.formState);
  };
  const form = document.querySelector('form');

  const handleSubmit = (watchedState) => {
    const { formState } = watchedState;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      formState.link = formData.get('link');
      formState.state = 'validating';
      validateLink(watchedState)
        .then(() => {
          formState.state = 'sent';
          watchedState.rssList.push(formState.link);
          const allOriginsLink = `https://allorigins.hexlet.app/get?disableCache=true&url=${formState.link}`;
          return axios.get(allOriginsLink);
        })
        .then((response) => parser(response.data.contents))
        .then((parsed) => console.log(parsed))
        .catch((e) => {
          formState.errors = e.errors;
          formState.state = 'failed';
          console.log(e);
        });
    });
  };

  handleSubmit(watchedState);
};

app();
