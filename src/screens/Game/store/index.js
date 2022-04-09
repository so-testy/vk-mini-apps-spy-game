import { atom } from 'recoil';

const gameStore = atom({
    key: 'gameStore',
    default: {
        playerNumber: 3,
        spyNumber: 1,
        players: [
            {
                id: 1,
                name: 'Игрок 1',
            },
            {
                id: 2,
                name: 'Игрок 2',
            },
            {
                id: 3,
                name: 'Игрок 3',
            },
        ],
        gameLocation: null,
    },
});

export { gameStore };
