export const getRandomCover = () => {
  const index = Math.floor(Math.random() * 9);
  return `assets/images/covers/default/cover${index}.jpg`;
};
