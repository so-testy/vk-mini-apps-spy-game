import { atom } from 'recoil';

const locationsStore = atom({
    key: 'locationsState',
    default: [
        {
            id: 1,
            name: 'Бассейн',
        },
        {
            id: 2,
            name: 'Стадион',
        },
        {
            id: 3,
            name: 'Кладбище',
        },
        {
            id: 4,
            name: 'Школа',
        },
        {
            id: 5,
            name: 'Детский сад',
        },
    ],
});

export { locationsStore };
