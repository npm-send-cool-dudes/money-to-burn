const airFriction = (min, max) => {
  return Math.random() * (max - min) + min;
};

export default airFriction;
