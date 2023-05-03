import {createSignal, Signal, untrack} from "solid-js";
import {setContext, getContext} from "./context";

const contextId = Symbol("@appspltfrm/solid-utils/LoadingContext");
const mainId = Symbol("main");

export interface LoadingContext {

    /**
     * Notify that main job started.
     */
    start(): this;

    /**
     * Notify that given job started.
     */
    start(jobId: string | symbol): this;

    /**
     * Notify that main job stopped.
     */
    stop(): this;

    /**
     * Notify that given job stopped.
     */
    stop(jobId: string | symbol): this;

    /**
     * Returns the number of jobs that are still working.
     */
    size(): number;

    /**
     * If there is any job that still loading.
     */
    busy(): boolean;

    /**
     * If the main job is loading.
     */
    main(): boolean;
}

class LoadingContextImpl implements LoadingContext {

    private jobs: Signal<Set<string | symbol>> = createSignal(new Set());

    start(): this;

    start(jobId: string | symbol): this;

    start(): this {
        const jobId: string | symbol = arguments.length === 1 ? arguments[0] : mainId;
        const jobs = untrack(() => this.jobs[0]());
        this.jobs[1](new Set(jobs.add(jobId ?? mainId)));
        return this;
    }

    stop(): this

    stop(jobId: string | symbol): this;

    stop(): this {
        const jobId: string | symbol = arguments.length === 1 ? arguments[0] : mainId;
        const jobs = untrack(() => this.jobs[0]());
        if (jobs.delete(jobId ?? mainId)) {
            this.jobs[1](new Set(jobs));
        }

        return this;
    }

    size() {
        return this.jobs[0]().size;
    }

    busy() {
        return this.jobs[0]().size > 0;
    }

    main() {
        return this.jobs[0]().has(mainId);
    }
}

export function createLoadingContext(): LoadingContext {
    return setContext(contextId, new LoadingContextImpl());
}

export function getLoadingContext() {
    return getContext<LoadingContext>(contextId);
}
