let covers = [];
export const getRandomCover = () => {
  if (covers.length === 0) {
    for (let i = 0; i < 9; i++) {
      covers.push(require(`~/assets/images/covers/default/cover${i}.jpg`));
    }
  }
  const index = Math.floor(Math.random() * 9);
  return covers[index].default;
};

export const getRandomCoverIndex = () => {
  return Math.floor(Math.random() * 9);
};

export const loadCover = (index) => {
  if (covers.length === 0) {
    for (let i = 0; i < 9; i++) {
      covers.push(require(`~/assets/images/covers/default/cover${i}.jpg`));
    }
  }
  return covers[index % 9].default;
};
