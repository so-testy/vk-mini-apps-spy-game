import { useState, useMemo } from 'react';

import { Card, Text, Div, Button, Title } from '@vkontakte/vkui';
import ReactCardFlip from 'react-card-flip';

const PlayerCard = ({ playerName, onNext, location, playerType, index, currentCardIndex }) => {
    const [isFlipped, setFlipped] = useState(false);

    const playerTypeLabel = useMemo(() => {
        if (playerType === 'spy') {
            return 'Шпион';
        }

        return 'Местный житель';
    }, [playerType]);

    return (
        <Div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(${index >= currentCardIndex ? '-50%' : '-200%'}, -50%) scale(${
                    1 - (index - currentCardIndex) * 0.07
                })`,
                transition: 'all 0.2s ease-in-out',
                perspective: 10000,
            }}
        >
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <Card
                    mode="shadow"
                    style={{
                        width: '300px',
                        height: 400,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={() => setFlipped(true)}
                >
                    <Title level="1" style={{ textAlign: 'center' }}>
                        {playerName}
                    </Title>

                    <Div />

                    <Text>Нажми, чтобы перевернуть</Text>
                </Card>

                <Card
                    mode="shadow"
                    style={{
                        width: '300px',
                        height: 400,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={onNext}
                >
                    <Title level="1" style={{ textAlign: 'center' }}>
                        {playerName}
                    </Title>

                    <Div />

                    <Title level="2" style={{ textAlign: 'center' }}>
                        {playerTypeLabel}
                    </Title>

                    <Div />

                    <Text>Нажми и отдай следующему</Text>
                </Card>
            </ReactCardFlip>
        </Div>
    );
};

export default PlayerCard;
