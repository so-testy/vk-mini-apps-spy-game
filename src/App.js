import React, { useState, useEffect } from 'react';

import { RecoilRoot } from 'recoil';
import bridge from '@vkontakte/vk-bridge';
import {
    View,
    AdaptivityProvider,
    AppRoot,
    Epic,
    Tabbar,
    TabbarItem,
    Panel,
    Root,
    SplitLayout,
    SplitCol,
    ModalRoot,
} from '@vkontakte/vkui';
import { Icon28GameOutline, Icon28PlaceOutline } from '@vkontakte/icons';

import '@vkontakte/vkui/dist/vkui.css';
import './index.css';

import Locations from './screens/Locations';
import Game from './screens/Game';
import DebugObserver from './utils/DebugObserver';
import Timer from './screens/Game/panels/Timer';
import useNavigation from './utils/useNavigation';
import GameResult from './screens/Game/panels/GameResult';
import CreateLocationModal from './screens/Locations/widgets/CreateLocationModal';
import ChangeNameModal from './screens/Game/widgets/ChangeNameModal';

const App = () => {
    const [activeStory, setActiveStory] = useState('game');
    const { screen: activeRootPanel, setScreen: setRootPanel } = useNavigation('main');
    const { screen: activeModal, setScreen: setActiveModal, screenParams: activeModalParams } = useNavigation(null);

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

    return (
        <RecoilRoot>
            <DebugObserver />

            <AdaptivityProvider>
                <AppRoot>
                    <SplitLayout
                        modal={
                            <ModalRoot activeModal={activeModal}>
                                <CreateLocationModal
                                    id="create-location"
                                    onClose={() => setActiveModal(null)}
                                    {...activeModalParams}
                                />
                                <ChangeNameModal
                                    id="change-player-name"
                                    onClose={() => setActiveModal(null)}
                                    {...activeModalParams}
                                />
                            </ModalRoot>
                        }
                    >
                        <SplitCol>
                            <Root activeView={activeRootPanel}>
                                <View style={{ height: '100%' }} id="main">
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
                                            <Game
                                                id="root"
                                                onActivateTimer={() => setRootPanel('timer')}
                                                onOpenPlayerChangeNameModal={playerId =>
                                                    setActiveModal('change-player-name', playerId)
                                                }
                                            />
                                        </View>

                                        <View id="locations" activePanel="root">
                                            <Locations
                                                id="root"
                                                onOpenLocationModal={() => setActiveModal('create-location')}
                                                editable
                                            />
                                        </View>
                                    </Epic>
                                </View>

                                <View id="timer">
                                    <Timer
                                        onBack={() => setRootPanel('main')}
                                        onGameEnd={() => setRootPanel('result')}
                                    />
                                </View>

                                <View id="result">
                                    <GameResult onBack={() => setRootPanel('main')} />
                                </View>
                            </Root>
                        </SplitCol>
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </RecoilRoot>
    );
};

export default App;
