"use strict";
/**
 * @setten/bull-queue
 *
 * @license MIT
 * @copyright Setten - Romain Lanz <romain.lanz@setten.io>
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
class QueueListener extends standalone_1.BaseCommand {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'default'
        });
    }
    async run() {
        const { Queue } = this.application.container.resolveBinding('Setten/Queue');
        await Queue.process({
            queueName: this.queue,
        });
    }
}
Object.defineProperty(QueueListener, "commandName", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'queue:listen'
});
Object.defineProperty(QueueListener, "description", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: ''
});
Object.defineProperty(QueueListener, "settings", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        loadApp: true,
        stayAlive: true,
    }
});
__decorate([
    standalone_1.flags.string({ alias: 'q', description: 'The queue to listen on' })
], QueueListener.prototype, "queue", void 0);
exports.default = QueueListener;
