import React, { useState, useEffect } from 'react';

import { RecoilRoot } from 'recoil';
import bridge from '@vkontakte/vk-bridge';
import { View, AdaptivityProvider, AppRoot, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import { Icon28GameOutline, Icon28PlaceOutline } from '@vkontakte/icons';

import '@vkontakte/vkui/dist/vkui.css';

import Locations from './screens/Locations';
import Game from './screens/Game';
import DebugObserver from './utils/DebugObserver';

const App = () => {
    const [activeStory, setActiveStory] = useState('game');

    const onStoryChange = e => setActiveStory(e.currentTarget.dataset.story);

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data } }) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });
        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
        }
        fetchData();
    }, []);

    const go = e => {
        setActivePanel(e.currentTarget.dataset.to);
    };

    return (
        <RecoilRoot>
            <DebugObserver />
            <AdaptivityProvider>
                <AppRoot>
                    <Epic
                        activeStory={activeStory}
                        tabbar={
                            <Tabbar itemsLayout="vertical" shadow={false}>
                                <TabbarItem
                                    onClick={onStoryChange}
                                    selected={activeStory === 'game'}
                                    data-story="game"
                                    text="Игра"
                                >
                                    <Icon28GameOutline />
                                </TabbarItem>
                                <TabbarItem
                                    onClick={onStoryChange}
                                    selected={activeStory === 'locations'}
                                    data-story="locations"
                                    text="Локации"
                                >
                                    <Icon28PlaceOutline />
                                </TabbarItem>
                            </Tabbar>
                        }
                    >
                        <View id="game" activePanel="root">
                            <Game id="root" />
                        </View>

                        <View id="locations" activePanel="root">
                            <Locations id="root" />
                        </View>
                    </Epic>
                </AppRoot>
            </AdaptivityProvider>
        </RecoilRoot>
    );
};

export default App;
