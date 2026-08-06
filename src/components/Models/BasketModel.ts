import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class BasketModel {
    protected items: IProduct[] = [];

    constructor(
        protected events: IEvents
    ) {}


    // Получить товары из корзины
    getItems(): IProduct[] {
        return this.items;
    }

    // Добавить товар
    addProduct(product: IProduct): void {

        if (!this.hasProduct(product.id)) {
            this.items.push(product);

            this.events.emit('basket:changed');
        }

    }

    // Удалить товар
    removeProduct(product: IProduct): void {

        const oldLength = this.items.length;

        this.items = this.items.filter(
            item => item.id !== product.id
        );

        if (this.items.length !== oldLength) {
            this.events.emit('basket:changed');
        }

    }

    // Очистить корзину
    clear(): void {

        this.items = [];

        this.events.emit('basket:changed');

    }

    // Общая стоимость
    getTotal(): number {
        return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
    }

    // Количество товаров
    getCount(): number {
        return this.items.length;
    }

    // Проверить наличие товара
    hasProduct(id: string): boolean {
        return this.items.some(item => item.id === id);
    }
}