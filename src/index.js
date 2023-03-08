import './styles.scss';
import 'bootstrap';
import { object, string } from 'yup';
import render from './render.js';
import renderForm from './renderForm.js'
import watcher from './watcher.js';

const app = async () => {
    const state = {
        link: '',
        isValidLink: false,
        rssList: [],
        errors: [],
    };

    const watchedState = watcher(state, render, renderForm);

    const validateLink = async (watchedState) => {
        let schema = object({
            link: string().url().test({
                name: 'dublicate',
                skipAbsent: true,
                test(link, ctx) {
                    if (watchedState.rssList.includes(link)) {
                        return ctx.createError({ message: 'This RSS is already in the list' });
                    }
                    return true;
                }
            })
        });

        try {
            await schema.validate(watchedState);
            watchedState.rssList.push(link);
            watchedState.isValidLink = true;
            // watchedState.errors = [];
        } catch (err) {
            watchedState.isValidLink = false;
            watchedState.errors.push(...err.errors);
        }
        console.log(watchedState)
    };

    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const link = formData.get('link');
        state.link = link;

        validateLink(watchedState)
    });

}

app();
