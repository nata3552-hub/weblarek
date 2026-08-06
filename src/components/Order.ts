import { TPayment } from '../types';
import { Form } from './Form';


interface IOrder {
    payment: TPayment | null;
    address: string;
}

export class Order extends Form<IOrder> {

    protected paymentButtons: HTMLButtonElement[];


    constructor(container: HTMLElement) {
        super(container);


        this.paymentButtons = Array.from(
            container.querySelectorAll<HTMLButtonElement>(
                '.order__buttons button'
            )
        );


        this.paymentButtons.forEach(button => {

            button.addEventListener('click', () => {

                this.onPayment?.(
                    button.name as TPayment
                );

            });

        });

    }


    set payment(value: TPayment | null) {

        this.paymentButtons.forEach(button => {

            button.classList.toggle(
                'button_alt-active',
                value !== null && button.name === value
            );

        });

    }

    set address(value: string) {
        (
            this.container.querySelector(
                'input[name="address"]'
            ) as HTMLInputElement
        ).value = value;
    }

    onPayment?: (
        payment: TPayment
    ) => void;

}