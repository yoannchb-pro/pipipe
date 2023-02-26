# pipipe

Create pipeline, execute them, modify them, copy them ...

## Update

- See [changelog](CHANGELOG.md)

## Found a bug ?

- Tell it in my github issues dont be afraid :)

## Installation

```
npm i pipipe
```

## Import

```js
const createPipeline = require("pipipe");
// OR
import createPipeline from "pipipe";
```

Or in the browser

```html
<script src="https://unpkg.com/pipipe@1.0.0/dist/index.js"></script>
```

## How to use ?

### Simple example

```ts
const reverseStrPipeline = createPipe()
  .pipe((str: string) => str.split(""))
  .pipe((arr: string[]) => arr.reverse())
  .pipe((arr: string[]) => arr.join(""));

const result = reverseStrPipeline.execute("hello world");

console.log(result); //dlrow olleh
```

### Copy

Copy a pipeline to create a new one from it

```ts
const lowerCasePipeline = createPipe().pipe((str: string) => str.toLowerCase());
const splitPipepline = lowerCasePipeline
  .copy()
  .pipe((str: string) => str.split(""));

console.log(
  splitPipepline.execute("HI"), // "hi"
  lowerCasePipeline.execute("HI") // ["h", "i"]
);
```

### Async

Execute asynchronously the pipeline

```ts
type UserList = { id: string; name: string; token: string }[];

const getUserTokenPipeline = createPipe()
  .pipe(async (id: string) => {
    const req = await fetch(`/userById/${id}`);
    return await req.json();
  })
  .pipe((result: UserList) => result[0]?.token)
  .catch(handleErr);

const token = await getUserTokenPipeline.executeAsync("123456789");
```

### pipeInsert

Insert a new pipe to a specific position

```ts
const reverseStrPipeline = createPipe()
  .pipe((str: string) => str.split(""))
  .pipe((arr: string[]) => arr.join(""))
  .pipeInsert((arr: string[]) => arr.reverse(), 1);

const result = reverseStrPipeline.execute("hello world");

console.log(result); //dlrow olleh
```

### pop, shift, splice

Same as the pop, shift, splice array method to remove pipe(s) from the pipeline
