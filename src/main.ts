import * as Obsidian from 'obsidian';

import { codeBlockProcessor } from './code-block-processor';
import { type Settings, defaultSettings } from './settings';

export default class ZhongwenBlockPlugin extends Obsidian.Plugin {
    settings!: Settings;

    async onload() {
        this.settings = Object.assign(
            {},
            defaultSettings,
            (await this.loadData()) as Settings,
        );
        this.addSettingTab(new ZhongwenBlockPluginSettingTab(this.app, this));
        this.registerMarkdownCodeBlockProcessor('zh-cn', (source, element) =>
            codeBlockProcessor(source, element, this.settings),
        );
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class ZhongwenBlockPluginSettingTab extends Obsidian.PluginSettingTab {
    plugin: ZhongwenBlockPlugin;

    constructor(app: Obsidian.App, plugin: ZhongwenBlockPlugin) {
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
