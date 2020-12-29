# Typescript Course

Notes and exercises on Typescript course.

## Why Typescript?

Typescript is a Javascript superset, compiler, hence browsers cannot run Typescript.

- Validate types during development;
- Compile new Javascript version features into old ones;
- Enables use of Interfaces, Generics and Decorators;
- Highly configurable.

## Install

- [Get Typescript](https://www.typescriptlang.org/index.html#download-links)

```
npm install -g typescript
```

Compile:

```
tsc helloworld.ts
tsc helloworld.ts -w // watch flag
```

**Config project**

Indicate that this folder and its internal ones have typescript files. This need to be done once and it will crete the `tsconfig.json`.

```
tsc --init
```

To compile all files inside the project folder:
```
tsc // OR
tsc -w // to watch changes in files
```

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

## Classes

In Object Oriented Programming (OOP), objects are the "things you work with code" and classes are their blueprints. That said, objects can be **instances** of the classes, or based on that classes. Classes define how objects look like, which properties and methods they have.


### this

In Typescript, you can use the keyword `this` inside the parameter, which will force the class to be instanciated in order that method to be used.

```typescript
class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log('Department', this.name);
  }
}

const accounting = new Department('accounting'); // creates a new instance of Department

const accountingCopy = { describe: accounting.describe };

accountingCopy.describe(); // this is an error in typescript, because the object to be called does not follow the Department interface
```

### public and private

Both keywords are access modifiers that determine if a class variable will be accessible outside. Public variables can be changed outside of the class, while private cannot. Public is the default access modifier, that is why there is no need to add it before a variable.

```typescript
class Department {
  id: string; // is the same as public id: string;
  private name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

accounting.name = 'Nome'; // error: name is not accessible
```

**Shorthand initialization**

It is common to initialize a class with parameters and variables with the same name. In case of that happening, a shorter way can be used:

```typescript
class Department {
  constructor(public id: string, private name: string) {}
}
```

Note that here although `public` is the default value, it needs to be called to initialize that variable.

### readonly

`readonly` is a property to label a variable that cannot be changed after its initialization.

```typescript
class Department {
  constructor(public readonly id: string, private name: string) {}

  changeName(value: string) {
    this.name = name;
    this.id = 'novo id'; // error: id cannot be changed after initialization
  }
}
```

### Inheritance

Classes can be inherited using the keyword `extends`. The extended class properties and methods are passed to the new class.

The inherited class can **overwrite methods**, by writing the same method name.

If you want to use a property which is private in the base class, its access property has to be changed to `protected`, which means it's not accessible outside itself and its inherited classes.

```typescript
class Department {
  protected employees: string[] = [];

  constructor (private id: string, public name: string) {}

  describe(){
    console.log('this is department ', this.name);
  }
}

class ITDepartment extends Department {
  constructor(id: string) {
    super(id, 'IT');
  }

  describe() {
    console.log(this.id); // error: Property 'id' is private and only accessible within class 'Department'.
  }
}
```

### Getters and setters

These are special methods that can be used within classes to return or modify a value. Getters have to have a return value and when called, it doesn't need the `()`, even though it is a method. Getters and setters behave like properties when called.

```typescript
class Department {
  private lastReport: string;

  constructor (private id: string, public name: string, private reports: string[]) {
    this.lastReport = reports[0];
  }

  get mostRecentReport() {
    return this.lastReport;
  }

  set mostRecentReport(value: string) {
    this.addReport(value);
  }

  addReport(report: string) {
    this.reports.unshift(report);
    this.lastReport = this.reports[0];
  }
}

const randomDepartment = new Department('id', 'rando name', ["one report"]);

const randomDepartmentLastReport = randomDepartment.mostRecentReport; // calling the getter

randomDepartment.mostRecentReport = 'example report'; // calling the setter
```

### Static methods and properties

Static methods and properties are available for use in dettached from classes. One example in Javascript is `Math`. Static is useful for utilities methods or global constants.

```typescript
class Department {
  static fiscalYear = 2020;

  constructor (private id: string, public name: string) {
    console.log(this.fiscalYear); // error: Property 'fiscalYear' is a static member of type 'Department'.
    console.log(Department.fiscalYear); // this works
  }

  static createEmployee(name: string) {
    return { name: name };
  }
}

// static methods and properties are accessible by targeting the class name itself
const newEmployee = Department.createEmployee('nome');
const fiscalYear = Department.fiscalYear;
```

### Abstract classes

Abstract classes cannot be instanciated. An abstract method can be used when you want to make sure that method exists but needs to be defined when instanciated in an extended class.

Abstract method does not have an implementation on the abstract class and abstract classes cannot be instanciated.

```typescript
abstract class Department {
  constructor (protected id: string) {}

  abstract describe(this: Department): void;
}

class ITDepartment extends Department {
  describe() {
    console.log(this.id);
  }
}

const department = new Department('id'); // error: Cannot create an instance of an abstract class.
```

### Singleton

Singleton is a pattern in OOP that makes sure that there is only one instance of a certain class, and for that we use the private constructor.

```typescript
class ITDepartment {
  private static instance: ITDepartment;

  private constructor(private id: string) {

  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ITDepartment('id');
    return this.instance;
  }

  describe() {
    console.log(this.id);
  }
}

const companyDepartment = ITDepartment.getInstance();
```
