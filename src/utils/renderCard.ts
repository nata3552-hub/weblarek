import { Card } from '../components/Card';
import { IProduct } from '../types';
import { cloneTemplate } from './utils';
import { CDN_URL } from './constants';


export function createCard(
    product: IProduct,
    template: HTMLTemplateElement,
    onClick: (product: IProduct) => void
): HTMLElement {

    const card = new Card(
        cloneTemplate(template)
    );


    card.title = product.title;
    card.image = `${CDN_URL}/${product.image}`;
    card.category = product.category;
    card.price = product.price;
    card.onClick = () => {
        onClick(product);
    };


    return card.render();
}