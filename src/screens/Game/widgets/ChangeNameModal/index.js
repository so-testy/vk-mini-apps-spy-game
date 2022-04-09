import { useState } from 'react';

import { Button, Input, ModalCard } from '@vkontakte/vkui';
import { useRecoilState } from 'recoil';

import { gameStore } from '../../store';

const ChangeNameModal = ({ onClose, playerId }) => {
    const [game, setGame] = useRecoilState(gameStore);

    const [playerName, setPlayerName] = useState(game.players.find(player => player.id === playerId)?.name);

    const saveName = () => {
        const players = [...game.players];

        const playerIndex = players.findIndex(player => player.id === playerId);

        const player = { ...players[playerIndex] };
        console.log(players, playerId, player);
        player.name = playerName;
        players.splice(playerIndex, 1, player);

        setGame({ ...game, players });

        onClose();
    };

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
            <Input type="text" value={playerName} onChange={e => setPlayerName(e.target.value)} />
        </ModalCard>
    );
};

export default ChangeNameModal;
