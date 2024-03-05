import * as Obsidian from 'obsidian';

import type { Plugin } from './plugin.interface';
import { type Settings, settings } from './settings';

export default class PluginImpl extends Obsidian.Plugin implements Plugin {
    settings!: Settings;

    async onload() {
        this.settings = settings.parse(await this.loadData());
    }

    async saveSettings(): Promise<void> {
        await this.saveData(this.settings);
    }
}
