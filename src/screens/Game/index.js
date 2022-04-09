import React from 'react';

import Main from './panels/Main';
import { View } from '@vkontakte/vkui';

import useNavigation from '../../utils/useNavigation';
import Cards from './panels/Cards';

const Game = () => {
    const { screen, setScreen } = useNavigation('main');

    const setScreenValue = screen => () => {
        setScreen(screen);
    };

    return (
        <View activePanel={screen}>
            <Main id="main" onGameStart={setScreenValue('cards')} />
            <Cards id="cards" onBack={setScreenValue('main')} />
        </View>
    );
};

export default Game;
