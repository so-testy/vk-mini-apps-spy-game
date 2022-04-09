import { atom } from 'recoil';
import { v4 } from 'uuid';

import { localStorageEffect } from '../../../utils/recoil';

const locationsStore = atom({
    key: 'locationsStore',
    default: [
        { id: v4(), name: 'Бассейн' },
        { id: v4(), name: 'Стадион' },
        { id: v4(), name: 'Кладбище' },
        { id: v4(), name: 'Школа' },
        { id: v4(), name: 'Детский сад' },
    ],
    effects: [localStorageEffect('locationsStore')],
});

export { locationsStore };
