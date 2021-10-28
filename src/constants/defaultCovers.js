export const getRandomCover = () => {
  const index = Math.floor(Math.random() * 9);
  return `static/images/covers/default/cover${index}.jpg`;
};
