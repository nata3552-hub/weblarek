import { ProductCard, IProductCard } from './ProductCard';

interface ICard extends IProductCard {}

export class Card extends ProductCard<ICard> {
    protected clickHandler?: () => void;

    constructor(container: HTMLElement) {
        super(container);

        this.container.addEventListener('click', () => {
            this.clickHandler?.();
        });
    }

    set onClick(handler: () => void) {
        this.clickHandler = handler;
    }
}