import React, { useState } from 'react';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import PlayerCard from '../../ui/PlayerCard';
import { useRecoilState } from 'recoil';
import { gameStore } from '../../store';

const Cards = ({ onBack }) => {
    const [game, setGame] = useRecoilState(gameStore);

    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    return (
        <Panel>
            <PanelHeader left={<PanelHeaderBack onClick={onBack} />}>Раздача карт</PanelHeader>

            <div style={{ width: '100%', position: 'relative', flex: 1 }}>
                {game.players
                    .map((player, index) => {
                        const { name, type, id } = player;

                        return (
                            <PlayerCard
                                key={id}
                                playerName={name}
                                playerType={type}
                                location={game.gameLocation}
                                onNext={() => {
                                    setCurrentCardIndex(prev => prev + 1);
                                }}
                                index={index}
                                currentCardIndex={currentCardIndex}
                            />
                        );
                    })
                    .reverse()}
            </div>
        </Panel>
    );
};

export default Cards;
