import './scss/styles.scss';

import { IProduct, TPayment } from './types';

import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';

import { WebLarekApi } from './components/WebLarekApi';

import { Header } from './components/Header';
import { Gallery } from './components/Gallery';
import { Contacts } from './components/Contacts';
import { Modal } from './components/Modal';
import { Basket } from './components/Basket';
import { Order } from './components/Order';
import { Success } from './components/Success';

import { CatalogModel } from './components/Models/CatalogModel';
import { BasketModel } from './components/Models/BasketModel';
import { BuyerModel } from './components/Models/BuyerModel';

import { API_URL } from './utils/constants';

import { createPreview } from './utils/renderPreview';
import { createCard } from './utils/renderCard';
import { createCardBasket } from './utils/renderCardBasket';
import { cloneTemplate } from './utils/utils';


interface IProductEvent {
    product: IProduct;
}

interface IFieldEvent {
    field: string;
    value: string;
}

interface IPaymentEvent {
    payment: TPayment;
}


const events = new EventEmitter();

const catalog = new CatalogModel(events);
const basket = new BasketModel(events);
const buyer = new BuyerModel(events);


const header = new Header(document.body);
const gallery = new Gallery(document.body);


const modal = new Modal(
    document.querySelector<HTMLElement>('.modal')!
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


const previewView = createPreview(
    document.querySelector<HTMLTemplateElement>('#card-preview')!,
    () => {
        events.emit('preview:action');
    }
);


const api = new Api(API_URL);
const webLarekApi = new WebLarekApi(api);


events.on('catalog:changed', () => {

    const cards = catalog.getItems().map((product) =>
        createCard(
            product,
            document.querySelector<HTMLTemplateElement>(
                '#card-catalog'
            )!,
            () => {
                events.emit('card:select', {
                    product
                });
            }
        )
    );

    gallery.catalog = cards;
});


events.on('preview:changed', () => {

    const product = catalog.getPreview();

    if (!product) {
        return;
    }

    previewView.title = product.title;
    previewView.image = product.image;
    previewView.category = product.category;
    previewView.description = product.description;
    previewView.price = product.price;

    previewView.disabled = product.price === null;

    if (product.price === null) {
        previewView.buttonText = 'Недоступно';
    } else if (basket.hasProduct(product.id)) {
        previewView.buttonText = 'Удалить из корзины';
    } else {
        previewView.buttonText = 'В корзину';
    }

    modal.content = previewView.render();
    modal.open();
});


events.on('basket:changed', () => {

    header.counter = basket.getCount();

    const basketCards = basket.getItems().map(
        (product, index) =>
            createCardBasket(
                product,
                index + 1,
                document.querySelector<HTMLTemplateElement>(
                    '#card-basket'
                )!,
                () => {
                    events.emit('basket:remove', {
                        product
                    });
                }
            )
    );

    basketView.items = basketCards;
    basketView.total = basket.getTotal();
    basketView.disabled = basket.getCount() === 0;
});


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


events.on<IProductEvent>(
    'card:select',
    ({ product }) => {
        catalog.setPreview(product);
    }
);


events.on<IProductEvent>(
    'basket:remove',
    ({ product }) => {
        basket.removeProduct(product);
    }
);


events.on<IPaymentEvent>(
    'order:payment',
    ({ payment }) => {
        buyer.setData({
            payment
        });
    }
);


events.on<IFieldEvent>(
    'order:change',
    ({ field, value }) => {
        buyer.setData({
            [field]: value
        });
    }
);


events.on<IFieldEvent>(
    'contacts:change',
    ({ field, value }) => {
        buyer.setData({
            [field]: value
        });
    }
);


events.on('preview:action', () => {

    const product = catalog.getPreview();

    if (!product || product.price === null) {
        return;
    }

    if (basket.hasProduct(product.id)) {
        basket.removeProduct(product);
    } else {
        basket.addProduct(product);
    }

    modal.close();
});


events.on('order:submit', () => {
    modal.content = contactsView.render();
});


events.on('basket:open', () => {
    modal.content = basketView.render();
    modal.open();
});

events.on('order:open', () => {
    modal.content = orderView.render();
});


events.on('header:basket', () => {
    modal.content = basketView.render();
    modal.open();
});


events.on('success:close', () => {
    modal.close();
});


events.on('contacts:submit', async () => {

    const data = buyer.getData();

    const order = {
        ...data,
        payment: data.payment!,
        total: basket.getTotal(),
        items: basket.getItems().map((item) => item.id)
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
});


header.onBasketClick = () => {
    events.emit('header:basket');
};


basketView.onClick = () => {
    events.emit('order:open');
};


orderView.onPayment = (payment) => {
    events.emit('order:payment', {
        payment
    });
};


orderView.onChange = (field, value) => {
    events.emit('order:change', {
        field,
        value
    });
};


orderView.onSubmit = () => {
    events.emit('order:submit');
};


contactsView.onChange = (field, value) => {
    events.emit('contacts:change', {
        field,
        value
    });
};


contactsView.onSubmit = () => {
    events.emit('contacts:submit');
};


successView.onClick = () => {
    events.emit('success:close');
};


async function init() {

    try {

        const data =
            await webLarekApi.getProducts();

        catalog.setItems(data.items);

    } catch (error) {

        console.error(
            'Ошибка при получении товаров:',
            error
        );

    }
}


init();