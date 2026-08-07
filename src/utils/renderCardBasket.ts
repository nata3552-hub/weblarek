import { CardBasket } from '../components/CardBasket';
import { IProduct } from '../types';
import { cloneTemplate } from './utils';

export function createCardBasket(
    product: IProduct,
    index: number,
    template: HTMLTemplateElement,
    onDelete: () => void
): HTMLElement {
    const card = new CardBasket(
        cloneTemplate(template)
    );

    card.title = product.title;
    card.price = product.price;
    card.index = index;
    card.onDelete = onDelete;

    return card.render();
}