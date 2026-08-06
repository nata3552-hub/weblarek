import { PreviewCard } from '../components/CardPreview';
import { IProduct } from '../types';
import { cloneTemplate } from './utils';
import { CDN_URL } from './constants';

export function createPreview(
    product: IProduct,
    template: HTMLTemplateElement,
    onClick: () => void
): PreviewCard {

    const card = new PreviewCard(
        cloneTemplate(template)
    );

    card.title = product.title;
    card.image = `${CDN_URL}/${product.image}`;
    card.category = product.category;
    card.description = product.description;
    card.price = product.price;
    card.onClick = onClick;

    return card;
}