import * as Obsidian from 'obsidian';
import { mount } from 'svelte';

import JyutpingCodeBlock from './components/JyutpingCodeBlock.svelte';
import PinyinCodeBlock from './components/PinyinCodeBlock.svelte';
import type { Plugin } from './plugin';
import { SettingTabImpl } from './setting-tab-impl';
import { defaultSettings, type Settings } from './settings';

export class PluginImpl extends Obsidian.Plugin implements Plugin {
    settings!: Settings;

    async onload() {
        this.settings = Object.assign(
            {},
            defaultSettings,
            (await this.loadData()) as Settings,
        );

        this.addSettingTab(new SettingTabImpl(this.app, this));

        // Register code block processor for Mandarin (Pinyin)
        this.registerMarkdownCodeBlockProcessor('zh-cn', (source, element) => {
            mount(PinyinCodeBlock, {
                target: element,
                props: {
                    source,
                    alwaysDisplayPinyin: this.settings.alwaysDisplayPinyin,
                },
            });
        });

        // Register code block processor for Cantonese (Jyutping)
        this.registerMarkdownCodeBlockProcessor('zh-hk', (source, element) => {
            mount(JyutpingCodeBlock, {
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
