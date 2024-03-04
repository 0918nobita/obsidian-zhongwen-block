import * as Obsidian from 'obsidian';

import { type Lang, t } from './i18n';
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
            .setName(t(this.plugin.settings.lang, 'language'))
            .addDropdown((dropdown) => {
                const options = {
                    'en-US': 'English',
                    'ja-JP': '日本語',
                } as const satisfies Record<Lang, string>;

                dropdown
                    .addOptions(options)
                    .setValue(this.plugin.settings.lang)
                    .onChange(async (value) => {
                        this.plugin.settings.lang = value as Lang;
                        await this.plugin.saveSettings();
                        this.display();
                    });
            });

        new Obsidian.Setting(containerEl)
            .setName(t(this.plugin.settings.lang, 'alwaysDisplayPinyin'))
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
