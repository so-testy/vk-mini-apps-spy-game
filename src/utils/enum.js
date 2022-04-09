const getPlayerTypeLabel = playerType => {
    if (playerType === 'spy') {
        return 'Шпион';
    }

    return 'Местный житель';
};

export { getPlayerTypeLabel };
