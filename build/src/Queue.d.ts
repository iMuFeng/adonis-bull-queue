/**
 * @setten/bull-queue
 *
 * @license MIT
 * @copyright Setten - Romain Lanz <romain.lanz@setten.io>
 */
/// <reference types="@adonisjs/logger/build/adonis-typings/logger" />
/// <reference types="@adonisjs/application/build/adonis-typings" />
import type { JobsOptions } from 'bullmq';
import type { LoggerContract } from '@ioc:Adonis/Core/Logger';
import type { ApplicationContract } from '@ioc:Adonis/Core/Application';
import type { DataForJob, JobsList, QueueConfig } from '@ioc:Setten/Queue';
export declare class BullManager {
    private options;
    private logger;
    private app;
    private queues;
    constructor(options: QueueConfig, logger: LoggerContract, app: ApplicationContract);
    dispatch<K extends keyof JobsList | string>(job: K, payload: DataForJob<K>, options?: JobsOptions & {
        queueName?: string;
    }): Promise<import("bullmq").Job<any, any, string>>;
    process({ queueName }: {
        queueName?: string;
    }): this;
}
