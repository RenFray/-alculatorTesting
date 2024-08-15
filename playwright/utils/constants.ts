export const BASE_URL = 'https://www.21vek.by';
export const BASE_URL_API = 'https://jsonplaceholder.typicode.com';

export const generateRandomEmail = (): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let email = '';
    for (let i = 0; i < 9; i++) {
        email += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${email}@gmail.com`;
};

export const myEmail = 'marmon.89@gmail.com';
export const myPassword = 'Tartar999';
export const myPhone = '298557209';
export const fakeEmail = 'test123qwegmail.com';
export const fakePassword = 'Tartar9991';
export const unregisteredEmail = 'test123qwe007@gmail.com';

export const items = ['Все акции', 'Преимущества', 'Популярные', 'Обзоры'];
export const categories =
    [
    'Бытовая техника',
    'Смартфоны, ТВ и электроника',
    'Компьютеры и периферия',
    'Мебель',
    'Товары для дома',
    'Сантехника и водоснабжение',
    'Строительство и ремонт',
    'Строительный инструмент',
    'Дом и сад',
    'Авто и мото',
    'Товары для детей',
    'Красота и стиль',
    'Здоровье',
    'Спорт',
    'Туризм, активный отдых',
    'Зоотовары',
    'Товары для бизнеса',
    'Досуг и хобби',
    'Ювелирные украшения',
    'Товары для взрослых',
    'Книги и канцелярия',
    'Сертификаты'
    ];
export const searchProduct = 'лампа';
export const searchFakeProduct = 'frtghet';
export const searchList = ['Категории', 'Бренды', 'Товары'];
