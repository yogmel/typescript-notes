# Typescript Course

Notes and exercises on Typescript course.

## Why Typescript?

Typescript is a Javascript superset, compiler, hence browsers cannot run Typescript.

- Validate types during development;
- Compile new Javascript version features into old ones;
- Enables use of Interfaces, Generics and Decorators;
- Highly configurable.

## Core Types

- [Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)

To add a type spec in a parameter or variable, do `param: type`:

```typescript
function add(a: number, b: number) {
  return a + b;
}

let number: number;
number = 5;

const person: {
  name: string;
  age: number;
} = {
  name: "Mell",
  age: 18,
};
```

| Type      |           Example           | Obs.                                                            |
| --------- | :-------------------------: | --------------------------------------------------------------- |
| `number`  |          1, 2, 5.8          |
| `string`  |      "Hi", 'Hi', `Hi`       |
| `boolean` |        true or false        |
| object    |      { name: "Mell" }       | can be nested                                                   |
| array     |          [1, 2, 3]          | can be nested                                                   |
| tuple     |           [1, 2]            | added by typescript: fixed-length array                         |
| `enum`    |      enum { NEW, OLD }      | added by typescript: automatically enumerate global constant id |
| `any`     |             \*              | should be avoided                                               |
| function  | (param) => { return param } |

There is not always the need to specify the type. When creating a variable with certain value, Typescript _infers_ its type:

```typescript
// number, string, boolean
let number: number = 6; // not necessary, ts already knows it is a number

// object
const obj = {
  name: "Mell",
  age: 18,
};
/*
ts infers each property type, as such:
const obj: {
  age: string;
  age: number;
}
*/

// array
let arr: string[];
arr = ["One", "Two"];

// tuple
let role: [number, string];
role = [2, "author"];
// be careful with .push(), it still works and it doesn't verify its length

// enum
enum Role {
  ADMIN = 5,
  READ_ONLY,
  AUTHOR,
} // if assigned a number, the enumaration starts with this number, and it is incremented by 1 for the next ones

// function
let func: Function; // no specification on number and type of parameters, nor the returned value
let combineValues: (a: number, b: number) => number;
```

## Literal, Aliases/Custom and Union Types

- **Aliases/Custom**: create a type, like the way a variable is created;
- **Literal**: variable can be only equals to the pre-specified values;
- **Union**: data can be of multiple types.

```typescript
type Combinable = number | string;
type CombinableResult = ["as-number" | "as-text"];

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: CombinableResult
) {
  //..
}
```

## Function Types

We can specify the type of the returned value in a function. If no return is detected, the typescript type for it would be `void`.

When `void` is used in a callback specification though, the callback return is not validaded, only the parameter type.

```typescript
function addAndHandle(a: number, b: number, cb(num: number) => void): number {
  const result = a + b;
  cb(result);
  return result;
}

addAndHandle(1, 2, (result) => {
  console.log(result);
})

function printResult(num: number): void {
  console.log("Result is: ", num);
}

printResult(add(1, 2));
```

Other types:

- `unknown`: a little bit more restrictive than any, as it will block assignments if are type specific.

```typescript
let userInput: unknown;
let userName: string;

// userName = userInput; // this does not work, as there is no guarantee that userInput will be a string

if (typeof userInput === "string") {
  userName = userInput;
}
```

- `never`: used in a function return, when a returned value should never exist

```typescript
function generateError(message: string, errorCode: number): never {
  throw { message, errorCode };
}
```
