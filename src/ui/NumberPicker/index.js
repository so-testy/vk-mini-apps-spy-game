import { Button, Div, Text } from '@vkontakte/vkui';
import { Icon16Add, Icon16Minus } from '@vkontakte/icons';

const NumberPicker = ({ value = 0, setValue, min, max }) => {
    return (
        <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
            <Button
                mode="secondary"
                disabled={value === min}
                onClick={() => {
                    setValue(value - 1);
                }}
            >
                <Icon16Minus />
            </Button>

            <Text style={{ width: 40, textAlign: 'center' }}>{value}</Text>

            <Button
                mode="secondary"
                disabled={value === max}
                onClick={() => {
                    setValue(value + 1);
                }}
            >
                <Icon16Add />
            </Button>
        </div>
    );
};

export default NumberPicker;
