import { atom } from 'recoil';
import { v4 } from 'uuid';

const gameStore = atom({
    key: 'gameStore',
    default: {
        playerNumber: 3,
        spyNumber: 1,
        players: [
            { id: v4(), name: 'Игрок 1' },
            { id: v4(), name: 'Игрок 2' },
            { id: v4(), name: 'Игрок 3' },
        ],
        gameLocation: null,
        gameResult: {
            winnerType: null,
        },
    },
});

export { gameStore };
