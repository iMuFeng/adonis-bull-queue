"use strict";
/**
 * @setten/bull-queue
 *
 * @license MIT
 * @copyright Setten - Romain Lanz <romain.lanz@setten.io>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Queue_1 = require("../src/Queue");
class QueueProvider {
    constructor(app) {
        Object.defineProperty(this, "app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: app
        });
    }
    boot() {
        this.app.container.bind('Setten/Queue', () => {
            const config = this.app.container.resolveBinding('Adonis/Core/Config').get('queue');
            const logger = this.app.container.resolveBinding('Adonis/Core/Logger');
            const application = this.app.container.resolveBinding('Adonis/Core/Application');
            return {
                Queue: new Queue_1.BullManager(config, logger, application),
            };
        });
    }
}
exports.default = QueueProvider;
