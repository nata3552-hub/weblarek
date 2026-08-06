import { CardBase, ICardBase } from './CardBase';


export class Card extends CardBase<ICardBase> {

    protected clickHandler?: () => void;


    constructor(container: HTMLElement) {
        super(container);

        this.container.addEventListener(
            'click',
            () => {
                this.clickHandler?.();
            }
        );
    }


    set onClick(handler: () => void) {
        this.clickHandler = handler;
    }

}