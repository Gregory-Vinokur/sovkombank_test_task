export const getRandomWinners = (max: number, count: number): number[] => {
  const indexes: number[] = [];
  while (indexes.length < count) {
    const randomIndex = Math.floor(Math.random() * max);
    if (indexes.indexOf(randomIndex) === -1) {
      indexes.push(randomIndex);
    }
  }
  return indexes;
}