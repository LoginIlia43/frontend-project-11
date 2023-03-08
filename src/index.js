import './styles.scss';
import 'bootstrap';
import yup, { object, string } from 'yup';

const app = () => {
    const state = {
        link: '',
        isValidLink: false,
        rssList: [],
        errors: [],
    };

    const validateLink = async (state) => {
        let schema = object({
            link: string().url().test({
                name: 'dublicate',
                skipAbsent: true,
                test(link, ctx) {
                    if (state.rssList.includes(link)) {
                        return ctx.createError({ message: 'This RSS is already in the list' });
                    }
                    return true;
                }
            })
        });

        try {
            await schema.validate(state);
        } catch (err) {
            state.errors.push(err.errors);
        }
        console.log(state)
    };

    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const link = formData.get('link');
        state.link = link;

        validateLink(state)
    });

}

app();
