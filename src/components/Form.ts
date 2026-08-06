import { Component } from './base/Component';

interface IForm {
    errors: string;
}


export class Form<T> extends Component<IForm & Partial<T>> {

    protected errorsElement: HTMLElement;
    protected submitButton: HTMLButtonElement;


    constructor(container: HTMLElement) {
        super(container);

        this.errorsElement =
            container.querySelector('.form__errors')!;

        this.submitButton =
            container.querySelector<HTMLButtonElement>(
                'button[type="submit"]'
            )!;


        container.addEventListener('input', (event) => {

            const target = event.target as HTMLInputElement;

            this.onChange?.(
                target.name,
                target.value
            );

        });


        container.addEventListener('submit', (event) => {

            event.preventDefault();

            this.onSubmit?.();

        });

    }


    set errors(value: string) {
        this.errorsElement.textContent = value;
    }


    set disabled(value: boolean) {
        this.submitButton.disabled = value;
    }


    clear(): void {

        const inputs =
            this.container.querySelectorAll<HTMLInputElement>(
                'input'
            );

        inputs.forEach(input => {
            input.value = '';
        });

        this.errors = '';

        this.submitButton.disabled = true;

    }


    onChange?: (
        field: string,
        value: string
    ) => void;


    onSubmit?: () => void;

}