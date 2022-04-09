import { useState } from 'react';

const useNavigation = initialScreen => {
    const [screen, setScreen] = useState(initialScreen);

    return {
        screen,
        setScreen,
    };
};

export default useNavigation;
