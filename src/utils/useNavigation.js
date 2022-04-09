import { useState } from 'react';

const useNavigation = initialScreen => {
    const [screen, setScreen] = useState(initialScreen);
    const [screenParams, setScreenParams] = useState(undefined);

    const onChangeScreen = (screen, params) => {
        setScreen(screen);
        setScreenParams(params);
    };

    return {
        screen,
        screenParams,
        setScreen: onChangeScreen,
    };
};

export default useNavigation;
