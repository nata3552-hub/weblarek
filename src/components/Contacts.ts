import { Form } from './Form';

interface IContacts {
    email: string;
    phone: string;
}

export class Contacts extends Form<IContacts> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(container: HTMLElement) {
        super(container);

        this.emailInput =
            container.querySelector<HTMLInputElement>(
                'input[name="email"]'
            )!;

        this.phoneInput =
            container.querySelector<HTMLInputElement>(
                'input[name="phone"]'
            )!;
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }
}