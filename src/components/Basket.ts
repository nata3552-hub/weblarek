import { Component } from './base/Component';

interface IBasket {
    items: HTMLElement[];
    total: number;
}

export class Basket extends Component<IBasket> {

    protected list: HTMLElement;
    protected totalElement: HTMLElement;
    protected button: HTMLButtonElement;


    constructor(container: HTMLElement) {
        super(container);

        this.list = container.querySelector('.basket__list')!;
        this.totalElement = container.querySelector('.basket__price')!;
        this.button = container.querySelector('.basket__button')!;
    }


    set items(value: HTMLElement[]) {

        this.list.replaceChildren();

        if (value.length) {
            this.list.replaceChildren(...value);
        }

    }


    set total(value: number) {
        this.totalElement.textContent = `${value} синапсов`;
    }

    set disabled(value: boolean) {
        this.button.disabled = value;
    }

    set onClick(callback: () => void) {
        this.button.addEventListener('click', callback);
    }
}