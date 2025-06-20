import { Resource } from "solid-js";
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
export declare namespace LoadingContext {
    const jobFactory: unique symbol;
    interface JobFactory<T = any> {
        [jobFactory]: () => Resource<T>;
    }
}
export declare function createLoadingContext(): LoadingContext;
export declare function getLoadingContext(): LoadingContext | undefined;
