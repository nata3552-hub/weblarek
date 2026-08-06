import { Component } from './base/Component';


export interface ICardBase {
    title: string;
    image: string;
    category: string;
    price: number | null;
}


export class CardBase<T extends ICardBase> extends Component<T> {

    protected titleElement: HTMLElement;
    protected imageElement?: HTMLImageElement;
    protected categoryElement?: HTMLElement;
    protected priceElement: HTMLElement;


    constructor(container: HTMLElement) {
        super(container);

        this.titleElement =
            container.querySelector('.card__title')!;

        this.imageElement =
            container.querySelector('.card__image') ?? undefined;

        this.categoryElement =
            container.querySelector('.card__category') ?? undefined;

        this.priceElement =
            container.querySelector('.card__price')!;
    }


    set title(value: string) {
        this.titleElement.textContent = value;
    }


    set image(value: string) {
        if (this.imageElement) {
            this.setImage(
                this.imageElement,
                value,
                this.titleElement.textContent ?? ''
            );
        }
    }


    set category(value: string) {
        if (this.categoryElement) {
            this.categoryElement.textContent = value;
        }
    }


    set price(value: number | null) {
        this.priceElement.textContent =
            value !== null
                ? `${value} синапсов`
                : 'Бесценно';
    }

}