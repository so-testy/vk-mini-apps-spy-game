const generateRandomNumber = ({ min, max }) => {
    return Math.floor(min + Math.random() * max);
};

export { generateRandomNumber };
