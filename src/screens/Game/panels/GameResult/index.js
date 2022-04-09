import React, { useCallback, useState } from 'react';

import { Panel, Div, Text, Title, Button, Spacing } from '@vkontakte/vkui';
import { useRecoilState } from 'recoil';
import { gameStore } from '../../store';
import { getPlayerTypeLabel } from '../../../../utils/enum';

const GameResult = ({ onBack }) => {
    const [game, setGame] = useRecoilState(gameStore);

    const { winnerType } = game.gameResult;

    if (!winnerType) {
        return null;
    }

    const onNewGame = () => {
        setGame({
            ...game,
            gameResult: {
                winnerType: null,
            },
        });

        onBack();
    };

    return (
        <Panel>
            <Div
                style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Title level="2" className="center-text" style={{ color: '#999' }}>
                    Побеждает
                </Title>

                <Title level="1" className="center-text">
                    {getPlayerTypeLabel(winnerType)}!
                </Title>

                <Spacing size={16} />

                <Title level="2" className="center-text">
                    Шпионы:
                </Title>

                {game.players
                    .filter(player => player.type === 'spy')
                    .map(player => {
                        return (
                            <Title level="3" key={player.id}>
                                {player.name}
                            </Title>
                        );
                    })}
            </Div>

            <Div style={{ textAlign: 'center' }}>
                <Button stretched size="l" onClick={onNewGame}>
                    Начать новую игру
                </Button>
            </Div>
        </Panel>
    );
};

export default GameResult;
