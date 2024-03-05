import * as Obsidian from 'obsidian';

import { type Lang, t } from './i18n';
import type { Plugin } from './plugin.interface';

const languageOptions = {
    'en-US': 'English',
    'ja-JP': '日本語',
} as const satisfies Record<Lang, string>;

export class SettingTab extends Obsidian.SettingTab {
    constructor(private plugin: Plugin) {
        super();
    }

    display() {
        const { containerEl } = this;

        containerEl.empty();

        new Obsidian.Setting(containerEl)
            .setName(t(this.plugin.settings.lang, 'language'))
            .addDropdown((dropdown) => {
                dropdown
                    .addOptions(languageOptions)
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
