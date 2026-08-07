import { CardBase, ICardBase } from './CardBase';

interface ICardBasket extends ICardBase {
    index: number;
}

export class CardBasket extends CardBase<ICardBasket> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);

        this.indexElement =
            container.querySelector<HTMLElement>(
                '.basket__item-index'
            )!;

        this.deleteButton =
            container.querySelector<HTMLButtonElement>(
                '.basket__item-delete'
            )!;
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }

    set onDelete(handler: () => void) {
        this.deleteButton.addEventListener(
            'click',
            handler
        );
    }
}