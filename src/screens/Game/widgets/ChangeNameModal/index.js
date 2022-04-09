import { useState, useCallback } from 'react';

import { Button, Input, ModalCard } from '@vkontakte/vkui';
import { useRecoilState } from 'recoil';

import { gameStore } from '../../store';

const ChangeNameModal = ({ onClose, playerId }) => {
    const [game, setGame] = useRecoilState(gameStore);

    const [playerName, setPlayerName] = useState(game.players.find(player => player.id === playerId)?.name);

    const saveName = useCallback(() => {
        const players = [...game.players];
        const playerIndex = players.findIndex(player => player.id === playerId);

        players.splice(playerIndex, 1, { ...players[playerIndex], name: playerName });

        setGame({ ...game, players });

        onClose();
    }, [onClose, game, playerId]);

    const onChange = useCallback(e => setPlayerName(e.target.value), []);

    return (
        <ModalCard
            id="change-player-name"
            onClose={onClose}
            header="Введите название локации"
            actions={
                <Button size="l" mode="primary" onClick={saveName}>
                    Сохранить
                </Button>
            }
        >
            <Input type="text" value={playerName} onChange={onChange} />
        </ModalCard>
    );
};

export default ChangeNameModal;
