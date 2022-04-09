import React from 'react';

import { useRecoilState } from 'recoil';
import { Panel, PanelHeader, Group, Cell, Div, List, IconButton, Footer, Button } from '@vkontakte/vkui';

import { locationsStore } from './store';

const Locations = ({ editable }) => {
    const [locations] = useRecoilState(locationsStore);

    return (
        <Panel>
            <PanelHeader>Локации</PanelHeader>

            <List style={{ flex: 1 }}>
                {locations.map(location => (
                    <Cell removable={editable} key={location.id}>
                        {location.name}
                    </Cell>
                ))}
            </List>

            {editable && (
                <Div>
                    <Button stretched size="l">
                        Добавить локацию
                    </Button>
                </Div>
            )}
        </Panel>
    );
};
export default Locations;
