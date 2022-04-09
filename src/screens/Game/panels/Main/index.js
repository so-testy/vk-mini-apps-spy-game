import React, { useState } from 'react';

import { useRecoilState } from 'recoil';
import { Panel, PanelHeader, Cell, Div, List, Button } from '@vkontakte/vkui';

import NumberPicker from '../../../../ui/NumberPicker';
import { gameStore } from '../../store';
import { generateRandomNumber } from '../../../../utils/generateRandomNumber';
import { locationsStore } from '../../../Locations/store';

const MAX_PLAYERS = 12;

const Main = ({ onGameStart }) => {
    const [form, setForm] = useRecoilState(gameStore);
    const [locations] = useRecoilState(locationsStore);

    const onSubmit = () => {
        const gameLocation =
            locations[
                generateRandomNumber({
                    min: 0,
                    max: locations.length - 1,
                })
            ];

        const spyPlaces = [];

        while (spyPlaces.length !== form.spyNumber) {
            const randomPlace = generateRandomNumber({
                min: 0,
                max: form.playerNumber - 1,
            });

            if (spyPlaces.find(place => place === randomPlace) === undefined) {
                spyPlaces.push(randomPlace);
            }
        }

        const players = [...form.players].map((player, index) => {
            let playerType = 'civilian';

            if (spyPlaces.includes(index)) {
                playerType = 'spy';
            }

            return {
                ...form.players[index],
                type: playerType,
            };
        });

        setForm({
            ...form,
            gameLocation,
            players,
        });

        onGameStart();
    };

    const onPlayersChange = value => {
        const players =
            form.players.length > value
                ? form.players.slice(0, value)
                : [
                      ...form.players,
                      ...new Array(value - form.players.length).fill(0).map((_, index) => ({
                          id: form.players.length + index + 1,
                          name: `Игрок ${form.players.length + index + 1}`,
                      })),
                  ];

        setForm({ ...form, playerNumber: value, players });
    };

    const onSpyChange = value => {
        setForm({ ...form, spyNumber: value });
    };

    return (
        <Panel>
            <PanelHeader>Игра</PanelHeader>

            <List style={{ flex: 1 }}>
                <Cell
                    after={
                        <NumberPicker value={form.playerNumber} min={3} max={MAX_PLAYERS} setValue={onPlayersChange} />
                    }
                >
                    Количество игроков
                </Cell>

                <Cell after={<NumberPicker value={form.spyNumber} min={1} max={2} setValue={onSpyChange} />}>
                    Количество шпионов
                </Cell>
            </List>

            <Div>
                <Button stretched size="l" onClick={onSubmit}>
                    Начать игру
                </Button>
            </Div>
        </Panel>
    );
};

export default Main;
