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
export declare function createLoadingContext(): LoadingContext;
export declare function getLoadingContext(): LoadingContext | undefined;
