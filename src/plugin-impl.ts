import * as Obsidian from 'obsidian';

import { codeBlockProcessor } from './code-block-processor';
import type { Plugin } from './plugin';
import { type Settings, defaultSettings } from './settings';
import { SettingTabImpl } from './setting-tab-impl';

export class PluginImpl extends Obsidian.Plugin implements Plugin {
    settings!: Settings;

    async onload() {
        this.settings = Object.assign(
            {},
            defaultSettings,
            (await this.loadData()) as Settings,
        );
        this.addSettingTab(new SettingTabImpl(this.app, this));
        this.registerMarkdownCodeBlockProcessor('zh-cn', (source, element) =>
            codeBlockProcessor(source, element, this.settings),
        );
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
