import { Card } from '../components/Card';
import { IProduct } from '../types';
import { cloneTemplate } from './utils';

export function createCard(
    product: IProduct,
    template: HTMLTemplateElement,
    onClick: () => void
): HTMLElement {
    const card = new Card(
        cloneTemplate(template)
    );

    card.title = product.title;
    card.image = product.image;
    card.category = product.category;
    card.price = product.price;
    card.onClick = onClick;

    return card.render();
}