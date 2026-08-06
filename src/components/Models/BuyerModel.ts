import { IBuyer, TValidationErrors } from '../../types';
import { IEvents } from '../base/Events';

export class BuyerModel {

    protected buyer: IBuyer = {
        payment: null,
        email: '',
        phone: '',
        address: '',
    };

    constructor(
        protected events: IEvents
    ) {}

    setData(data: Partial<IBuyer>): void {

        Object.assign(this.buyer, data);

        this.events.emit('buyer:changed');

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

        this.events.emit('buyer:changed');
    }

    // Проверить заполнение данных
    validate(fields?: string[]): TValidationErrors {

        const errors: TValidationErrors = {};


        if (!fields || fields.includes('payment')) {

            if (!this.buyer.payment) {
                errors.payment = 'Не выбран способ оплаты';
            }

        }


        if (!fields || fields.includes('address')) {

            if (!this.buyer.address.trim()) {
                errors.address = 'Введите адрес';
            }

        }


        if (!fields || fields.includes('email')) {

            // Проверка email
            if (!this.buyer.email.trim()) {
                errors.email = 'Введите email';
            } else if (!/^\S+@\S+\.\S+$/.test(this.buyer.email)) {
                errors.email = 'Некорректный email';
            }

        }


        if (!fields || fields.includes('phone')) {

            // Проверка телефона
            const phone = this.buyer.phone.trim();

            if (!phone) {
                errors.phone = 'Введите телефон';
            } else {
                const digits = phone.replace(/\D/g, '');

                if (digits.length < 10) {
                    errors.phone = 'Некорректный телефон';
                }
            }

        }


        return errors;
    }
}