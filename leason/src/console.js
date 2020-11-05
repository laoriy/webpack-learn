import { add } from "./math.js";

const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map((item) => {
  console.log(item);
});
console.log(add(1, 9));
