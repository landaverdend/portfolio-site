export function randomNumber(l: number, r: number) {
  return Math.floor(Math.random() * r) + l;
}


export function getRandomChanceIn(num: number) {
  return Math.floor(Math.random() * num) === 0;
}
