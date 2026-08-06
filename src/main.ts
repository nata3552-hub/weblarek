import './scss/styles.scss';
import { IProduct } from './types';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/WebLarekApi';
import { Contacts } from './components/Contacts';
import { CatalogModel } from './components/Models/CatalogModel';
import { BasketModel } from './components/Models/BasketModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { EventEmitter } from './components/base/Events';
import { Page } from './components/Page';
import { Modal } from './components/Modal';
import { Basket } from './components/Basket';
import { Order } from './components/Order';
import { Success } from './components/Success';

import { API_URL } from './utils/constants';
import { createPreview } from './utils/renderPreview';
import { createCard } from './utils/renderCard';
import { cloneTemplate } from './utils/utils';
import { createCardBasket } from './utils/renderCardBasket';



const events = new EventEmitter();

const catalog = new CatalogModel(events);

const basket = new BasketModel(events);

const buyer = new BuyerModel(events);


const page = new Page(document.body);

const modal = new Modal(
    document.querySelector('.modal')!
);

const basketView = new Basket(
    cloneTemplate(
        document.querySelector<HTMLTemplateElement>('#basket')!
    )
);

const orderView = new Order(
    cloneTemplate(
        document.querySelector<HTMLTemplateElement>('#order')!
    )
);

const contactsView = new Contacts(
    cloneTemplate(
        document.querySelector<HTMLTemplateElement>('#contacts')!
    )
);

const successView = new Success(
    cloneTemplate(
        document.querySelector<HTMLTemplateElement>('#success')!
    )
);

const api = new Api(API_URL);

const webLarekApi = new WebLarekApi(api);

events.on('buyer:changed', () => {

    const data = buyer.getData();

    orderView.payment = data.payment;
    orderView.address = data.address;

    contactsView.email = data.email;
    contactsView.phone = data.phone;

    const orderErrors = buyer.validate([
        'payment',
        'address'
    ]);

    orderView.errors =
        Object.values(orderErrors).join(', ');

    orderView.disabled =
        Object.keys(orderErrors).length > 0;


    const contactsErrors = buyer.validate([
        'email',
        'phone'
    ]);

    contactsView.errors =
        Object.values(contactsErrors).join(', ');

    contactsView.disabled =
        Object.keys(contactsErrors).length > 0;

});

events.on('basket:changed', () => {

    page.counter = basket.getCount();

    const basketCards = basket.getItems().map(
        (product, index) =>
            createCardBasket(
                product,
                index + 1,
                document.querySelector<HTMLTemplateElement>('#card-basket')!,
                () => {
                    basket.removeProduct(product);
                }
            )
    );

    basketView.items = basketCards;

    basketView.total = basket.getTotal();

    basketView.disabled = basket.getCount() === 0;

});

orderView.onPayment = (payment) => {

    buyer.setData({
        payment
    });

    orderView.payment = payment;

};

orderView.onChange = (field, value) => {

    buyer.setData({
        [field]: value
    });

};

contactsView.onChange = (field, value) => {

    buyer.setData({
        [field]: value
    });

};

contactsView.onSubmit = async () => {

    const errors = buyer.validate([
        'email',
        'phone'
    ]);

    if (Object.keys(errors).length > 0) {

        contactsView.errors =
            Object.values(errors).join(', ');

        return;
    }

    const order = {
        ...buyer.getData(),
        payment: buyer.getData().payment!,
        total: basket.getTotal(),
        items: basket.getItems().map(item => item.id)
    };

    try {

        const result =
            await webLarekApi.postOrder(order);

        successView.total = result.total;

        modal.content = successView.render();

        basket.clear();

        buyer.clear();

    } catch (error) {

        console.error(error);

    }

};

successView.onClick = () => {

    modal.close();

};

orderView.onSubmit = () => {

    const errors = buyer.validate([
        'payment',
        'address'
    ]);

    if (Object.keys(errors).length > 0) {

        orderView.errors =
            Object.values(errors).join(', ');

        return;
    }


    modal.content = contactsView.render();

};

basketView.onClick = () => {

    modal.content = orderView.render();

    modal.open();

};

page.onBasketClick = () => {
    modal.content = basketView.render();
    modal.open();
};

events.on<IProduct>('preview:changed', (product) => {

    const preview = createPreview(
        product,
        document.querySelector<HTMLTemplateElement>('#card-preview')!,
        () => {

            if (basket.hasProduct(product.id)) {
                basket.removeProduct(product);
            } else {
                basket.addProduct(product);
            }

            modal.close();

        }
    );

    if (product.price === null) {
        preview.buttonText = 'Недоступно';
        preview.disabled = true;
    } else if (basket.hasProduct(product.id)) {
        preview.buttonText = 'Удалить из корзины';
    } else {
        preview.buttonText = 'В корзину';
    }

    modal.content = preview.render();
    modal.open();

});

async function init() {
    try {

        const data = await webLarekApi.getProducts();

        catalog.setItems(data.items);

        const cards = catalog.getItems().map((item) =>
            createCard(
                item,
                document.querySelector<HTMLTemplateElement>('#card-catalog')!,
                (product) => {
                    catalog.setPreview(product);
                }
            )
        );


        page.catalog = cards;

    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
    }
}


init();