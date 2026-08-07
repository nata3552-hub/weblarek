import { Component } from './base/Component';

interface IGallery {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    protected gallery: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.gallery =
            container.querySelector<HTMLElement>('.gallery')!;
    }

    set catalog(items: HTMLElement[]) {
        this.gallery.replaceChildren(...items);
    }
}