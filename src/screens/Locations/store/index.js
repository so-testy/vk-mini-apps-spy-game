import { atom } from 'recoil';
import { v4 } from 'uuid';

const locationsStore = atom({
    key: 'locationsState',
    default: [
        { id: v4(), name: 'Бассейн' },
        { id: v4(), name: 'Стадион' },
        { id: v4(), name: 'Кладбище' },
        { id: v4(), name: 'Школа' },
        { id: v4(), name: 'Детский сад' },
    ],
});

export { locationsStore };
