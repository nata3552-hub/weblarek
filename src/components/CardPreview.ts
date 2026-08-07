import { ProductCard, IProductCard } from './ProductCard';

interface IPreviewCard extends IProductCard {
    description: string;
}

export class PreviewCard extends ProductCard<IPreviewCard> {
    protected descriptionElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);

        this.descriptionElement =
            container.querySelector<HTMLElement>('.card__text')!;

        this.buttonElement =
            container.querySelector<HTMLButtonElement>('.card__button')!;
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set onClick(handler: () => void) {
        this.buttonElement.addEventListener(
            'click',
            handler
        );
    }

    set buttonText(value: string) {
        this.buttonElement.textContent = value;
    }

    set disabled(value: boolean) {
        this.buttonElement.disabled = value;
    }
}