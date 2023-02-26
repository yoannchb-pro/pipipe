class PipelineCreator {
  private pipes: Function[] = [];

  /**
   * Create a copy of the current pipeline
   * @returns
   */
  copy() {
    const newPipe = new PipelineCreator();
    for (const fn of this.pipes) {
      newPipe.pipe(fn);
    }
    return newPipe;
  }

  /**
   * Remove the first function of the pipeline
   * @returns
   */
  shift() {
    return this.pipes.shift();
  }

  /**
   * Remove the last function of the pipeline
   * @returns
   */
  pop() {
    return this.pipes.pop();
  }

  /**
   * Remove a specific function in the pipeline (work like Array.prototype.splice)
   * @param start
   * @param deleteCount
   * @returns
   */
  splice(start: number, deleteCount?: number) {
    return this.pipes.splice(start, deleteCount);
  }

  /**
   * Add a new function to the pipeline
   * @param fn
   * @returns
   */
  pipe(fn: Function) {
    this.pipes.push(fn);
    return this;
  }

  /**
   * Add a new function to a specific position to the pipeline
   * @param fn
   * @param position
   */
  pipeInsert(fn: Function, position: number) {
    const pipes: Function[] = [];
    this.pipes.forEach((pipe, index) => {
      if (index === position) {
        pipes.push(fn);
      }

      pipes.push(pipe);
    });
    this.pipes = pipes;
  }

  /**
   * Execute asynchronously the pipeline and return the result
   * @param data
   * @returns
   */
  async executeAsync(data?: unknown) {
    return await this.pipes.reduce(async function (newData, currentFunction) {
      const resolved = await newData;
      return await currentFunction(resolved);
    }, data);
  }

  /**
   * Execute the pipeline and return the result
   * @param data
   * @returns
   */
  execute(data?: unknown) {
    return this.pipes.reduce(
      (newData, currentFunction) => currentFunction(newData),
      data
    );
  }
}

/**
 * Create a new pipeline instance
 * @returns
 */
function createPipe() {
  return new PipelineCreator();
}

export default createPipe;
