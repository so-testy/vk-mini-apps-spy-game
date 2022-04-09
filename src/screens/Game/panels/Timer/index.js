import React, { useCallback, useState } from 'react';

import { Panel, Div, Title, Button, PopoutWrapper, Spacing } from '@vkontakte/vkui';
import { useRecoilState } from 'recoil';
import { gameStore } from '../../store';
import { useTimer } from 'react-timer-hook';

const Timer = ({ onGameEnd }) => {
    const [game, setGame] = useRecoilState(gameStore);

    const [isGameEnded, setGameEnded] = useState(false);

    const { seconds, minutes, isRunning, pause, resume } = useTimer({
        autoStart: true,
        expiryTimestamp: new Date().setMinutes(new Date().getMinutes() + game.playerNumber),
        onExpire: () => {
            setGameEnded(true);
        },
    });

    const onPause = useCallback(() => (isRunning ? pause() : resume()), [isRunning]);

    const endGame = useCallback(
        winnerType => {
            setGame({ ...game, gameResult: { winnerType } });

            onGameEnd();
        },
        [onGameEnd],
    );

    return (
        <Panel>
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    flex: 1,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        filter: `blur(${isRunning ? '0px' : '2px'})`,
                        transition: 'all 0.2s ease-in-out',
                    }}
                >
                    <Div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1,
                            flexDirection: 'column',
                        }}
                    >
                        <Title level="1" style={{ fontSize: 60, lineHeight: '60px' }}>
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </Title>

                        <Div />

                        <Button size="l" onClick={onPause}>
                            {'Пауза'}
                        </Button>
                    </Div>
                </div>

                <PopoutWrapper
                    alignY="center"
                    alignX="center"
                    style={{
                        opacity: isRunning ? 0 : 1,
                        pointerEvents: isRunning ? 'none' : 'all',
                        transition: 'all 0.2s ease-in-out',
                    }}
                >
                    <Div
                        style={{
                            position: 'absolute',
                            top: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            maxWidth: 300,
                        }}
                    >
                        <Button size="l" onClick={() => endGame('civilian')}>
                            Выиграли местные
                        </Button>

                        <Spacing size={16} />

                        <Title level="2" style={{ color: 'white', textAlign: 'center' }}>
                            Если все проголосовали и раскрыли шпиона
                        </Title>
                    </Div>

                    {!isGameEnded && (
                        <Button size="l" onClick={onPause} mode="">
                            {'Продолжить'}
                        </Button>
                    )}

                    <Div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            maxWidth: 300,
                        }}
                    >
                        <Button size="l" onClick={() => endGame('spy')}>
                            Выиграл шпион
                        </Button>

                        <Spacing size={16} />

                        <Title level="2" style={{ color: 'white', textAlign: 'center' }}>
                            Если шпион верно назвал локацию
                        </Title>
                    </Div>
                </PopoutWrapper>
            </div>
        </Panel>
    );
};

export default Timer;
