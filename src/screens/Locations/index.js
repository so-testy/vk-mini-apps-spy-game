import React from 'react';

import { useRecoilState } from 'recoil';
import { Panel, PanelHeader, Cell, Div, List, Button, ModalRoot, ModalCard, Input } from '@vkontakte/vkui';

import { locationsStore } from './store';

const Locations = ({ editable, onOpenLocationModal }) => {
    const [locations, setLocations] = useRecoilState(locationsStore);

    const deleteLocation = id => {
        const newLocations = [...locations].filter(location => location.id !== id);

        setLocations(newLocations);
    };

    return (
        <Panel>
            <PanelHeader>Локации</PanelHeader>

            <List style={{ flex: 1 }}>
                {locations.map(location => (
                    <Cell removable={editable} onRemove={() => deleteLocation(location.id)} key={location.id}>
                        {location.name}
                    </Cell>
                ))}
            </List>

            {editable && (
                <Div>
                    <Button stretched size="l" onClick={onOpenLocationModal}>
                        Добавить локацию
                    </Button>
                </Div>
            )}
        </Panel>
    );
};
export default Locations;
