import { CardBase, ICardBase } from './CardBase';
import { CDN_URL, categoryMap } from '../utils/constants';

export interface IProductCard extends ICardBase {
    image: string;
    category: string;
}

export class ProductCard<T extends IProductCard> extends CardBase<T> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.imageElement =
            container.querySelector<HTMLImageElement>('.card__image')!;

        this.categoryElement =
            container.querySelector<HTMLElement>('.card__category')!;
    }

    set image(value: string) {
        this.setImage(
            this.imageElement,
            `${CDN_URL}/${value}`,
            this.titleElement.textContent ?? ''
        );
    }

    set category(value: string) {
        this.categoryElement.textContent = value;

        Object.values(categoryMap).forEach((className) => {
            this.categoryElement.classList.remove(className);
        });

        const categoryClass =
            categoryMap[value as keyof typeof categoryMap];

        if (categoryClass) {
            this.categoryElement.classList.add(categoryClass);
        }
    }
}