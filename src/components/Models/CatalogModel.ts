import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class CatalogModel {
    protected items: IProduct[] = [];
    protected preview: IProduct | null = null;
    
    constructor(
        protected events: IEvents
    ) {}

    // Сохранить массив товаров
    setItems(items: IProduct[]): void {
        this.items = items;
        this.events.emit('catalog:changed');
    }

    // Получить массив товаров
    getItems(): IProduct[] {
        return this.items;
    }

    // Получить товар по id
    getItem(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id);
    }

    // Сохранить товар для предпросмотра
    setPreview(product: IProduct): void {
        this.preview = product;
        this.events.emit('preview:changed', product);
    }

    // Получить товар для предпросмотра
    getPreview(): IProduct | null {
        return this.preview;
    }
}