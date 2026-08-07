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
            container.querySelector<HTMLElement>('.form__errors')!;

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

    onChange?: (
        field: string,
        value: string
    ) => void;

    onSubmit?: () => void;
}