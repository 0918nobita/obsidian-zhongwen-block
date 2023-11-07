import { Plugin } from 'obsidian';
import { pinyin } from 'pinyin-pro';

import * as styles from './style.css';
import { render } from 'preact-render-to-string';

export default class MyPlugin extends Plugin {
    onload() {
        this.registerMarkdownCodeBlockProcessor('zh-cn', (source, element) => {
            const allData = pinyin(source, { type: 'all' });

            const charBlocks = allData.map((data) => (
                <div className={styles.charBlock}>
                    <span className={styles.pinyin}>{data.pinyin}</span>
                    <span className={styles.chineseChar}>{data.origin}</span>
                </div>
            ));

            const el = (
                <div className={styles.container}>
                    <div className={styles.sentence}>{charBlocks}</div>
                </div>
            );

            element.innerHTML = render(el);
        });
    }
}
