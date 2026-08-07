import { TPayment } from '../types';
import { Form } from './Form';

interface IOrder {
    payment: TPayment | null;
    address: string;
}

export class Order extends Form<IOrder> {
    protected paymentButtons: HTMLButtonElement[];
    protected addressInput: HTMLInputElement;

    constructor(container: HTMLElement) {
        super(container);

        this.paymentButtons = Array.from(
            container.querySelectorAll<HTMLButtonElement>(
                '.order__buttons button'
            )
        );

        this.addressInput =
            container.querySelector<HTMLInputElement>(
                'input[name="address"]'
            )!;

        this.paymentButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.onPayment?.(
                    button.name as TPayment
                );
            });
        });
    }

    set payment(value: TPayment | null) {
        this.paymentButtons.forEach((button) => {
            button.classList.toggle(
                'button_alt-active',
                value !== null && button.name === value
            );
        });
    }

    set address(value: string) {
        this.addressInput.value = value;
    }

    onPayment?: (
        payment: TPayment
    ) => void;
}