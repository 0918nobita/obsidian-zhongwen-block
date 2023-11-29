import * as Obsidian from 'obsidian';

import type { SettingTab } from './setting-tab';
import type { Plugin } from './plugin';

export class SettingTabImpl
    extends Obsidian.PluginSettingTab
    implements SettingTab
{
    plugin: Plugin;

    constructor(app: Obsidian.App, plugin: Plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;

        containerEl.empty();

        new Obsidian.Setting(containerEl)
            .setName('Always display pinyin')
            .addToggle((toggle) =>
                toggle
                    .setValue(this.plugin.settings.alwaysDisplayPinyin)
                    .onChange(async (value) => {
                        this.plugin.settings.alwaysDisplayPinyin = value;
                        await this.plugin.saveSettings();
                    }),
            );
    }
}
