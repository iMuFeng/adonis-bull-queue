"use strict";
/**
 * @setten/bull-queue
 *
 * @license MIT
 * @copyright Setten - Romain Lanz <romain.lanz@setten.io>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullManager = void 0;
const bullmq_1 = require("bullmq");
class BullManager {
    constructor(options, logger, app) {
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: logger
        });
        Object.defineProperty(this, "app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: app
        });
        Object.defineProperty(this, "queues", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        this.queues.set("default", new bullmq_1.Queue('default', {
            connection: this.options.connection,
            ...this.options.queue,
        }));
    }
    dispatch(job, payload, options = {}) {
        const queueName = options.queueName || 'default';
        if (!this.queues.has(queueName)) {
            this.queues.set(queueName, new bullmq_1.Queue(queueName, {
                connection: this.options.connection,
                ...this.options.queue,
            }));
        }
        return this.queues.get(queueName).add(job, payload, {
            ...this.options.jobs,
            ...options,
        });
    }
    process({ queueName }) {
        this.logger.info(`Queue [${queueName || 'default'}] processing started...`);
        new bullmq_1.Worker(queueName || 'default', async (job) => {
            let jobHandler;
            try {
                jobHandler = this.app.container.make(job.name);
            }
            catch (e) {
                this.logger.error(`Job handler for ${job.name} not found`);
                return;
            }
            this.logger.info(`Job ${job.name} started`);
            try {
                await jobHandler.handle(job.data);
                this.logger.info(`Job ${job.name} finished`);
            }
            catch (error) {
                this.logger.error(`Job ${job.name} failed`);
                this.logger.error(JSON.stringify(error));
                // Let BullMQ knows that the job is failed, and retry it again.
                throw error;
            }
        }, {
            connection: this.options.connection,
            ...this.options.worker,
        });
        return this;
    }
}
exports.BullManager = BullManager;
