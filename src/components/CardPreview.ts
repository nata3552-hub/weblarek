import { CardBase, ICardBase } from './CardBase';


interface IPreviewCard extends ICardBase {
    description: string;
}


export class PreviewCard extends CardBase<IPreviewCard> {

    protected descriptionElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;


    constructor(container: HTMLElement) {
        super(container);

        this.descriptionElement =
            container.querySelector('.card__text')!;

        this.buttonElement =
            container.querySelector('.card__button')!;
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