import './scss/styles.scss';

import { apiProducts } from './utils/data';
import { CatalogModel } from './components/Models/CatalogModel';
import { BasketModel } from './components/Models/BasketModel';
import { BuyerModel } from './components/Models/BuyerModel';

import { Api } from './components/base/Api';
import { WebLarekApi } from './components/WebLarekApi';
import { API_URL } from './utils/constants';


// Проверка CatalogModel

const catalog = new CatalogModel();

catalog.setItems(apiProducts.items);

console.log('Все товары:', catalog.getItems());

console.log(
    'Первый товар:',
    catalog.getItem(apiProducts.items[0].id)
);

catalog.setPreview(apiProducts.items[0]);

console.log(
    'Предпросмотр:',
    catalog.getPreview()
);


// Проверка BasketModel

const basket = new BasketModel();

basket.addProduct(apiProducts.items[0]);
basket.addProduct(apiProducts.items[1]);

console.log('Товары в корзине:', basket.getItems());

console.log('Количество товаров:', basket.getCount());

console.log('Общая стоимость:', basket.getTotal());

console.log(
    'Есть ли первый товар в корзине:',
    basket.hasProduct(apiProducts.items[0].id)
);

basket.removeProduct(apiProducts.items[0]);

console.log('После удаления:', basket.getItems());

basket.clear();

console.log('После очистки корзины:', basket.getItems());


// Проверка BuyerModel

const buyer = new BuyerModel();

console.log('Пустые данные:', buyer.getData());

console.log('Ошибки пустой модели:', buyer.validate());


buyer.setData({
    address: 'г. Минск'
});

console.log('После сохранения адреса:', buyer.getData());


buyer.setData({
    email: 'test@test.by'
});

console.log('После сохранения email:', buyer.getData());


buyer.setData({
    phone: '+375291112233',
    payment: 'card'
});

console.log('Все данные:', buyer.getData());

console.log('Ошибки после заполнения:', buyer.validate());


buyer.clear();

console.log('После очистки:', buyer.getData());

console.log('Ошибки после очистки:', buyer.validate());


// Шаг 4. Работа с сервером

const api = new Api(API_URL);

const webLarekApi = new WebLarekApi(api);


async function init() {
    try {
        console.log('Начинаем запрос');

        const data = await webLarekApi.getProducts();

        console.log('Ответ сервера:', data);

        catalog.setItems(data.items);

        console.log('Каталог с сервера:', catalog.getItems());
    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
    }
}

init();