import { useState } from 'react';

import { v4 } from 'uuid';

import { Button, Input, ModalCard } from '@vkontakte/vkui';
import { useRecoilState } from 'recoil';

import { locationsStore } from '../../store';

const CreateLocationModal = ({ onClose }) => {
    const [locationName, setLocationName] = useState('');
    const [locations, setLocations] = useRecoilState(locationsStore);

    const saveLocation = () => {
        setLocations([...locations, { id: v4(), name: locationName }]);

        onClose();
    };

    return (
        <ModalCard
            id="create-location"
            onClose={onClose}
            header="Введите название локации"
            actions={
                <Button size="l" mode="primary" onClick={saveLocation}>
                    Сохранить
                </Button>
            }
        >
            <Input type="text" value={locationName} onChange={e => setLocationName(e.target.value)} />
        </ModalCard>
    );
};

export default CreateLocationModal;
