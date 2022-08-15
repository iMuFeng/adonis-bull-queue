/**
 * @setten/bull-queue
 *
 * @license MIT
 * @copyright Setten - Romain Lanz <romain.lanz@setten.io>
 */
/// <reference types="@adonisjs/application/build/adonis-typings" />
import * as sinkStatic from '@adonisjs/sink';
import type { ApplicationContract } from '@ioc:Adonis/Core/Application';
export default function instructions(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic): Promise<void>;
