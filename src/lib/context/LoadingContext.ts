import {createSignal, Signal, untrack} from "solid-js";
import {setContext, getContext, createContext} from "./context";

const contextId = Symbol("@appspltfrm/solid-utils/LoadingContext");
const mainId = Symbol("main");

export interface LoadingContext {

    /**
     * Notify that main job started.
     */
    mainStart(): this;

    /**
     * Notify that given job started.
     */
    start(jobId: string | symbol): this;

    /**
     * Notify that main job stopped.
     */
    mainStop(): this;

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
    mainBusy(): boolean;
}

class LoadingContextImpl implements LoadingContext {

    private jobs: Signal<Set<string | symbol>> = createSignal(new Set());

    mainStart() {
        return this.start(mainId)
    }

    start(jobId: string | symbol): this {
        const jobs = untrack(() => this.jobs[0]());
        this.jobs[1](new Set(jobs.add(jobId ?? mainId)));
        return this;
    }

    mainStop() {
        return this.stop(mainId);
    }

    stop(jobId: string | symbol): this {
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

    mainBusy() {
        return this.jobs[0]().has(mainId);
    }
}

export function createLoadingContext(): LoadingContext {
    return createContext(contextId, new LoadingContextImpl());
}

export function getLoadingContext() {
    return getContext<LoadingContext>(contextId);
}
