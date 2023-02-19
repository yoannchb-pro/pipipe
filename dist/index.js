(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.createPipe = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class PipelineCreator {
        constructor() {
            this.pipes = [];
        }
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
        splice(start, deleteCount) {
            return this.pipes.splice(start, deleteCount);
        }
        /**
         * Add a new function to the pipeline
         * @param fn
         * @returns
         */
        pipe(fn) {
            this.pipes.push(fn);
            return this;
        }
        /**
         * Execute asynchronously the pipeline and return the result
         * @param data
         * @returns
         */
        executeAsync(data) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.pipes.reduce(function (newData, currentFunction) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const resolved = yield newData;
                        return yield currentFunction(resolved);
                    });
                }, data);
            });
        }
        /**
         * Execute the pipeline and return the result
         * @param data
         * @returns
         */
        execute(data) {
            return this.pipes.reduce((newData, currentFunction) => currentFunction(newData), data);
        }
    }
    /**
     * Create a new pipeline instance
     * @returns
     */
    function createPipe() {
        return new PipelineCreator();
    }

    return createPipe;

}));
//# sourceMappingURL=index.js.map
