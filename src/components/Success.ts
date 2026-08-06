import { Component } from './base/Component';


interface ISuccess {
    total: number;
}


export class Success extends Component<ISuccess> {

    protected titleElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;


    constructor(container: HTMLElement) {
        super(container);

        this.titleElement =
            container.querySelector('.order-success__description')!;

        this.buttonElement =
            container.querySelector('.order-success__close')!;
    }


    set total(value: number) {
        this.titleElement.textContent =
            `Списано ${value} синапсов`;
    }


    set onClick(handler: () => void) {
        this.buttonElement.addEventListener(
            'click',
            handler
        );
    }

}