import { IBuyer, TValidationErrors } from '../../types';

export class BuyerModel {
    protected buyer: IBuyer = {
        payment: null,
        email: '',
        phone: '',
        address: '',
    };

    // Сохранить данные покупателя
    setData(data: Partial<IBuyer>): void {
        this.buyer = {
            ...this.buyer,
            ...data
        };
    }

    // Получить данные покупателя
    getData(): IBuyer {
        return this.buyer;
    }

    // Очистить данные покупателя
    clear(): void {
        this.buyer = {
            payment: null,
            email: '',
            phone: '',
            address: '',
        };
    }

    // Проверить заполнение данных
    validate(): TValidationErrors {
        const errors: TValidationErrors = {};

        if (!this.buyer.payment) {
            errors.payment = 'Не выбран способ оплаты';
        }

        if (!this.buyer.address.trim()) {
            errors.address = 'Введите адрес';
        }

        if (!this.buyer.email.trim()) {
            errors.email = 'Введите email';
        }

        if (!this.buyer.phone.trim()) {
            errors.phone = 'Введите телефон';
        }

        return errors;
    }
}