/**
 * @setten/bull-queue
 *
 * @license MIT
 * @copyright Setten - Romain Lanz <romain.lanz@setten.io>
 */
declare module '@ioc:Setten/Queue' {
    import type { ConnectionOptions, WorkerOptions, QueueOptions, JobsOptions } from 'bullmq';
    type DataForJob<K extends string> = K extends keyof JobsList ? JobsList[K] : Record<string, unknown>;
    type QueueConfig = {
        connection: ConnectionOptions;
        queue: QueueOptions;
        worker: WorkerOptions;
        jobs: JobsOptions;
    };
    interface QueueContract {
        dispatch<K extends keyof JobsList>(job: K, payload: DataForJob<K>, options?: JobsOptions): Promise<string>;
        dispatch<K extends string>(job: K, payload: DataForJob<K>, options?: JobsOptions): Promise<string>;
        process(): Promise<void>;
    }
    /**
     * An interface to define typed queues/jobs
     */
    interface JobsList {
    }
    const Queue: QueueContract;
}
