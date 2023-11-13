import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { pinyin } from 'pinyin-pro';

import * as styles from './style.css';

interface ZhongwenBlockPluginSettings {
    alwaysDisplayPinyin: boolean;
}

const defaultSettings: ZhongwenBlockPluginSettings = {
    alwaysDisplayPinyin: false,
};

const codeBlockProcessor = async (
    source: string,
    element: HTMLElement,
    settings: ZhongwenBlockPluginSettings,
): Promise<void> => {
    const gap = 2;

    const pinyinData = pinyin(source, { type: 'all' });

    await new Promise((resolve) => {
        setTimeout(resolve, 0);
    });

    const container = element.createDiv({
        cls: styles.container,
    });

    const pinyinLine = container.createDiv({
        cls: settings.alwaysDisplayPinyin
            ? styles.pinyinLineBase
            : styles.pinyinLineDisplayedOnHover,
    });

    const chineseCharLine = container.createDiv({
        cls: styles.chineseCharLine,
    });

    for (const pinyinDatum of pinyinData) {
        const pinyinSpan = pinyinLine.createSpan({
            text: pinyinDatum.pinyin,
            cls: styles.pinyinSpan,
        });
        const pinyinWidth = pinyinSpan.getBoundingClientRect().width;

        const chineseCharSpan = chineseCharLine.createSpan({
            text: pinyinDatum.origin,
            cls: styles.chineseCharSpan,
        });
        const chineseCharWidth = chineseCharSpan.getBoundingClientRect().width;

        const { pinyinPadding, chineseCharPadding } =
            pinyinWidth >= chineseCharWidth
                ? {
                      pinyinPadding: gap,
                      chineseCharPadding:
                          (pinyinWidth - chineseCharWidth) / 2 + gap,
                  }
                : {
                      pinyinPadding: (chineseCharWidth - pinyinWidth) / 2 + gap,
                      chineseCharPadding: gap,
                  };

        pinyinSpan.style.paddingLeft = `${pinyinPadding}px`;
        pinyinSpan.style.paddingRight = `${pinyinPadding}px`;

        chineseCharSpan.style.paddingLeft = `${chineseCharPadding}px`;
        chineseCharSpan.style.paddingRight = `${chineseCharPadding}px`;
    }
};

export default class ZhongwenBlockPlugin extends Plugin {
    settings!: ZhongwenBlockPluginSettings;

    async onload() {
        this.settings = Object.assign(
            {},
            defaultSettings,
            (await this.loadData()) as ZhongwenBlockPluginSettings,
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

class ZhongwenBlockPluginSettingTab extends PluginSettingTab {
    plugin: ZhongwenBlockPlugin;

    constructor(app: App, plugin: ZhongwenBlockPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;

        containerEl.empty();

        new Setting(containerEl)
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
