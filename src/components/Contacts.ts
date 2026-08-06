import { Form } from './Form';

interface IContacts {
    email: string;
    phone: string;
}

export class Contacts extends Form<IContacts> {

    set email(value: string) {
        const input = this.container.querySelector<HTMLInputElement>(
            'input[name="email"]'
        )!;

        input.value = value;
    }


    set phone(value: string) {
        const input = this.container.querySelector<HTMLInputElement>(
            'input[name="phone"]'
        )!;

        input.value = value;
}

}