import createPipe from "../dist/index";

describe("Test pipeline creation and execution", function () {
  it("Create a simple pipeline", function () {
    const reverseStringPipeline = createPipe()
      .pipe((str: string) => str.split(""))
      .pipe((arr: string[]) => arr.reverse())
      .pipe((arr: string[]) => arr.join(""));

    const HelloWorld = reverseStringPipeline.execute("hello world");
    const Pipeline = reverseStringPipeline.execute("pipeline");
    expect(HelloWorld).toBe("dlrow olleh");
    expect(Pipeline).toBe("enilepip");
  });

  it("Copy pipeline", function () {
    const lowerCasePipeline = createPipe().pipe((str: string) =>
      str.toLowerCase()
    );
    const splitPipepline = lowerCasePipeline
      .copy()
      .pipe((str: string) => str.split(""));

    expect(splitPipepline.execute("HI")).toEqual(["h", "i"]);
    expect(lowerCasePipeline.execute("HI")).toBe("hi");
  });

  it("Async pipeline", async function () {
    const asyncPipeline = createPipe()
      .pipe((str: string) => str.toLowerCase())
      .pipe(
        async (str: string) =>
          await new Promise((r) => setTimeout(() => r(str), 100))
      )
      .pipe((str: string) => str.split(""));

    expect(await asyncPipeline.executeAsync("HI")).toEqual(["h", "i"]);
  });

  it("pipeInsert, shift, pop, splice", function () {
    const reverseStringPipeline = createPipe()
      .pipe((str: string) => str.split(""))
      .pipe((arr: string[]) => arr.join(""));

    reverseStringPipeline.pipeInsert((arr: string[]) => arr.reverse(), 1);
    const HelloWorld = reverseStringPipeline.execute("hello world");
    expect(HelloWorld).toBe("dlrow olleh");

    reverseStringPipeline.pop();
    expect(reverseStringPipeline.execute("hi")).toEqual(["i", "h"]);

    reverseStringPipeline.splice(1, 2);
    reverseStringPipeline.shift();
    reverseStringPipeline.pipe((str: string) => {
      let word = "";
      for (let i = str.length - 1; i >= 0; --i) {
        word += str[i];
      }
      return word;
    });
    expect(reverseStringPipeline.execute("hello world")).toBe("dlrow olleh");
  });
});
