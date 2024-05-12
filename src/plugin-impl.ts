import * as Obsidian from 'obsidian';

import CodeBlock from './code-block.svelte';
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

        this.registerMarkdownCodeBlockProcessor('zh-cn', (source, element) => {
            new CodeBlock({
                target: element,
                props: {
                    source,
                    alwaysDisplayPinyin: this.settings.alwaysDisplayPinyin,
                },
            });
        });
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
