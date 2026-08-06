import { Component } from './base/Component';

interface IPage {
    catalog: HTMLElement[];
    counter: number;
}

export class Page extends Component<IPage> {
    protected gallery: HTMLElement;
    protected basketCounter: HTMLElement;
    protected basketButton: HTMLButtonElement;
    protected clickHandler?: () => void;

    constructor(container: HTMLElement) {
        super(container);

        this.gallery = container.querySelector<HTMLElement>('.gallery')!;
        this.basketCounter = container.querySelector<HTMLElement>('.header__basket-counter')!;
        this.basketButton = container.querySelector<HTMLButtonElement>('.header__basket')!;
        this.basketButton.addEventListener('click', () => {
            this.clickHandler?.();
        });
    }

    set catalog(items: HTMLElement[]) {
        this.gallery.replaceChildren(...items);
    }

    set counter(value: number) {
        this.basketCounter.textContent = String(value);
    }
    
    set onBasketClick(handler: () => void) {
        this.clickHandler = handler;
    }
}