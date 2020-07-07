function add(a: number, b: number, printResult: boolean) {
  if (printResult)
    return a + b;
  return;
} 

const a = 5;
const b = 2.8;
const printResult = true;

const result = add(a, b, printResult);
console.log(result);

