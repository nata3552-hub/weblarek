import { IProduct } from '../../types';

export class BasketModel {
    protected items: IProduct[] = [];

    // Получить товары из корзины
    getItems(): IProduct[] {
        return this.items;
    }

    // Добавить товар
    addProduct(product: IProduct): void {
        this.items.push(product);
    }

    // Удалить товар
    removeProduct(product: IProduct): void {
        this.items = this.items.filter(item => item.id !== product.id);
    }

    // Очистить корзину
    clear(): void {
        this.items = [];
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