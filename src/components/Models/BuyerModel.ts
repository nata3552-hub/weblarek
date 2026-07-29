import { IBuyer } from '../../types';

export class BuyerModel {
    protected buyer: Partial<IBuyer> = {};

    // Сохранить данные покупателя
    setData(data: Partial<IBuyer>): void {
        this.buyer = {
            ...this.buyer,
            ...data
        };
    }

    // Получить данные покупателя
    getData(): Partial<IBuyer> {
        return this.buyer;
    }

    // Очистить данные покупателя
    clear(): void {
        this.buyer = {};
    }

    // Проверить заполнение данных
    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Partial<Record<keyof IBuyer, string>> = {};

        if (!this.buyer.payment) {
            errors.payment = 'Не выбран способ оплаты';
        }

        if (!this.buyer.address) {
            errors.address = 'Введите адрес';
        }

        if (!this.buyer.email) {
            errors.email = 'Введите email';
        }

        if (!this.buyer.phone) {
            errors.phone = 'Введите телефон';
        }

        return errors;
    }
}