import { Component } from './base/Component';

interface IHeader {
    counter: number;
}

export class Header extends Component<IHeader> {
    protected basketCounter: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected clickHandler?: () => void;

    constructor(container: HTMLElement) {
        super(container);

        this.basketCounter =
            container.querySelector<HTMLElement>(
                '.header__basket-counter'
            )!;

        this.basketButton =
            container.querySelector<HTMLButtonElement>(
                '.header__basket'
            )!;

        this.basketButton.addEventListener('click', () => {
            this.clickHandler?.();
        });
    }

    set counter(value: number) {
        this.basketCounter.textContent = String(value);
    }

    set onBasketClick(handler: () => void) {
        this.clickHandler = handler;
    }
}