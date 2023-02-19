declare class PipelineCreator {
    private pipes;
    /**
     * Create a copy of the current pipeline
     * @returns
     */
    /**
     * Create a copy of the current pipeline
     * @returns
     */
    copy(): PipelineCreator;
    /**
     * Remove the first function of the pipeline
     * @returns
     */
    /**
     * Remove the first function of the pipeline
     * @returns
     */
    shift(): Function;
    /**
     * Remove the last function of the pipeline
     * @returns
     */
    /**
     * Remove the last function of the pipeline
     * @returns
     */
    pop(): Function;
    /**
     * Remove a specific function in the pipeline (work like Array.prototype.splice)
     * @param start
     * @param deleteCount
     * @returns
     */
    /**
     * Remove a specific function in the pipeline (work like Array.prototype.splice)
     * @param start
     * @param deleteCount
     * @returns
     */
    splice(start: number, deleteCount?: number): Function[];
    /**
     * Add a new function to the pipeline
     * @param fn
     * @returns
     */
    /**
     * Add a new function to the pipeline
     * @param fn
     * @returns
     */
    pipe(fn: Function): this;
    /**
     * Execute asynchronously the pipeline and return the result
     * @param data
     * @returns
     */
    /**
     * Execute asynchronously the pipeline and return the result
     * @param data
     * @returns
     */
    executeAsync(data?: unknown): Promise<unknown>;
    /**
     * Execute the pipeline and return the result
     * @param data
     * @returns
     */
    /**
     * Execute the pipeline and return the result
     * @param data
     * @returns
     */
    execute(data?: unknown): unknown;
}
/**
 * Create a new pipeline instance
 * @returns
 */
declare function createPipe(): PipelineCreator;
export { createPipe as default };
