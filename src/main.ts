import { Plugin } from 'obsidian';
import { pinyin } from 'pinyin-pro';

import * as styles from './style.css';

export default class MyPlugin extends Plugin {
    onload() {
        this.registerMarkdownCodeBlockProcessor('zh-cn', (source, element) => {
            const container = element.createEl('div');
            container.className = styles.container;

            const sentence = container.createEl('div');
            sentence.className = styles.sentence;

            const allData = pinyin(source, { type: 'all' });

            for (const data of allData) {
                const charBlock = sentence.createEl('div');
                charBlock.className = styles.charBlock;

                const pinyin = charBlock.createEl('span');
                pinyin.className = styles.pinyin;
                pinyin.textContent = data.pinyin;

                const chineseChar = charBlock.createEl('span');
                chineseChar.className = styles.chineseChar;
                chineseChar.textContent = data.origin;
            }
        });
    }
}
