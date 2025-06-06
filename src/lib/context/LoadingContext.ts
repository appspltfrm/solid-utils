import {
    createEffect,
    createResource,
    createSignal,
    createUniqueId,
    onCleanup,
    Resource,
    Signal,
    untrack
} from "solid-js";
import {setContext, getContext, createContext} from "./context";
import resourceFactory = LoadingContext.jobFactory;

const contextId = Symbol("@appspltfrm/solid-utils/LoadingContext");
const mainId = Symbol("main");

export interface LoadingContext {

    /**
     * Notify that main job started.
     */
    mainStart(): this;

    start(job: Resource<any> | LoadingContext.JobFactory): this;

    start(job: Promise<any>): this;

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
     * Returns list of busy jobs.
     */
    jobs(): Array<string | symbol>;

    /**
     * If the main job is loading.
     */
    mainBusy(): boolean;
}

class LoadingContextImpl implements LoadingContext {

    #jobs: Signal<Set<string | symbol>> = createSignal(new Set());

    mainStart() {
        return this.start(mainId)
    }

    start(job: string | symbol | Resource<any> | LoadingContext.JobFactory | Promise<any>): this {

        let jobId: string | symbol | undefined;
        let resource: Resource<any> | undefined;

        if (job instanceof Promise) {
            const [r] = createResource(() => job);
            resource = r;
        } else if ((job as LoadingContext.JobFactory)[LoadingContext.jobFactory]) {
            resource = (job as LoadingContext.JobFactory)[LoadingContext.jobFactory]();
        } else if (job && typeof job === "object") {
            resource = job as unknown as Resource<any>;
        } else {
            jobId = job as string | symbol;
        }

        if (resource) {
            const id = Symbol(`Resource ${createUniqueId()}`);
            this.start(id);
            createEffect(() => !resource.loading && this.stop(id));
            onCleanup(() => this.stop(id));
        } else if (jobId) {
            const jobs = untrack(() => this.#jobs[0]());
            this.#jobs[1](new Set(jobs.add(jobId)));
        }

        return this;
    }

    mainStop() {
        return this.stop(mainId);
    }

    stop(jobId: string | symbol): this {
        const jobs = untrack(() => this.#jobs[0]());
        if (jobs.delete(jobId)) {
            this.#jobs[1](new Set(jobs));
        }

        return this;
    }

    size() {
        return this.#jobs[0]().size;
    }

    busy() {
        return this.#jobs[0]().size > 0;
    }

    mainBusy() {
        return this.#jobs[0]().has(mainId);
    }

    jobs(): Array<string | symbol> {
        return [...this.#jobs[0]()]
    }
}

export namespace LoadingContext {

    export const jobFactory = Symbol("LoadingContextJobFactory");

    export interface JobFactory<T = any> {
        [jobFactory]: () => Resource<T>
    }
}

export function createLoadingContext(): LoadingContext {
    return createContext(contextId, new LoadingContextImpl());
}

export function getLoadingContext() {
    return getContext<LoadingContext>(contextId);
}
