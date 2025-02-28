/**
 * @setten/bull-queue
 *
 * @license MIT
 * @copyright Setten - Romain Lanz <romain.lanz@setten.io>
 */
import { BaseCommand } from '@adonisjs/core/build/standalone';
export default class QueueListener extends BaseCommand {
    static commandName: string;
    static description: string;
    queue: string;
    static settings: {
        loadApp: boolean;
        stayAlive: boolean;
    };
    run(): Promise<void>;
}
