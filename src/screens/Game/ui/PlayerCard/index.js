import { useState, useMemo, useCallback } from 'react';

import { Card, Text, Div, Title, Button, Spacing } from '@vkontakte/vkui';
import ReactCardFlip from 'react-card-flip';

import { getPlayerTypeLabel } from '../../../../utils/enum';

import './index.css';

const PlayerCard = ({
    playerName,
    onNext,
    location,
    playerType,
    index,
    currentCardIndex,
    onOpenChangePlayerNameModal,
}) => {
    const [isFlipped, setFlipped] = useState(false);

    const playerTypeLabel = useMemo(() => getPlayerTypeLabel(playerType), [playerType]);

    const transformStyle = useMemo(() => {
        const translateX = index >= currentCardIndex ? '-50%' : '-200%';
        const scale = 1 - (index - currentCardIndex) * 0.1;

        return `translate(${translateX}, -50%) scale(${scale})`;
    }, [index, currentCardIndex]);

    const flipCard = useCallback(() => setFlipped(true), []);

    const openPlayerNameModal = useCallback(
        e => {
            e.stopPropagation();

            onOpenChangePlayerNameModal();
        },
        [onOpenChangePlayerNameModal],
    );

    return (
        <Div style={{ transform: transformStyle }} className="player-card-container">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <Card mode="shadow" className="player-card" onClick={flipCard}>
                    <Div className="center-column-content">
                        <Title level="1" className="center-text">
                            {playerName}
                        </Title>

                        <Spacing size={8} />

                        <Button mode="secondary" onClick={openPlayerNameModal}>
                            Изменить имя
                        </Button>

                        <Spacing size={16} />

                        <Text>Нажми, чтобы узнать кто ты</Text>
                    </Div>
                </Card>

                <Card mode="shadow" className="player-card" onClick={onNext}>
                    <Div className="center-column-content">
                        <Title level="2" className="center-text">
                            {playerName}, ты:
                        </Title>

                        <Title level="1" className="center-text">
                            {playerTypeLabel}
                        </Title>

                        <Spacing size={16} />

                        {playerType !== 'spy' && (
                            <>
                                <Title level="3" className="center-text">
                                    Локация: {location.name}
                                </Title>

                                <Spacing size={16} />
                            </>
                        )}

                        <Text>Нажми и отдай следующему</Text>
                    </Div>
                </Card>
            </ReactCardFlip>
        </Div>
    );
};

export default PlayerCard;
