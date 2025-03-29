export const add = (a, b) => a + b + 5;
export const subtract = (a, b) => a - b;

window.subtract = subtract;
console.log(subtract(3, 2))

export default { add, subtract };
