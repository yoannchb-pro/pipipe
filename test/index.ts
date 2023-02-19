import createPipe from "../dist";

createPipe()
  .pipe((e) => e.toLowerCase())
  .pipe(async (e) => await new Promise((r) => setTimeout((s) => r(e), 2000)))
  .pipe((e) => e.split(" "))
  .executeAsync("Hello World")
  .then((e) => console.log(e));

const lowerCasePipe = createPipe().pipe((e) => e.toLowerCase());

const lowerSplitPipe = lowerCasePipe.copy().pipe((e) => e.split(" "));

console.log(
  lowerCasePipe.execute("Hello World"),
  lowerSplitPipe.execute("Hello World"),
  lowerCasePipe.execute("Hello World")
);
