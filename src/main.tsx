import { Plugin } from 'obsidian';
import { pinyin } from 'pinyin-pro';

import * as styles from './style.css';

const gap = 2;

const codeBlockProcessor = async (
    source: string,
    element: HTMLElement,
): Promise<void> => {
    const pinyinData = pinyin(source, { type: 'all' });

    await new Promise((resolve) => {
        setTimeout(resolve, 0);
    });

    const container = element.createDiv();
    container.className = styles.container;

    const pinyinLine = container.createDiv();
    pinyinLine.className = styles.pinyinLine;

    const chineseCharLine = container.createDiv();
    chineseCharLine.className = styles.chineseCharLine;

    for (const pinyinDatum of pinyinData) {
        const pinyinSpan = pinyinLine.createSpan();
        pinyinSpan.textContent = pinyinDatum.pinyin;
        const pinyinWidth = pinyinSpan.getBoundingClientRect().width;

        const chineseCharSpan = chineseCharLine.createSpan();
        chineseCharSpan.textContent = pinyinDatum.origin;
        const chineseCharWidth = chineseCharSpan.getBoundingClientRect().width;

        const { pinyinPadding, chineseCharPadding } =
            pinyinWidth >= chineseCharWidth
                ? ({
                      pinyinPadding: `${gap}px`,
                      chineseCharPadding: `${
                          (pinyinWidth - chineseCharWidth) / 2 + gap
                      }px`,
                  } as const)
                : ({
                      pinyinPadding: `${
                          (chineseCharWidth - pinyinWidth) / 2 + gap
                      }px`,
                      chineseCharPadding: `${gap}px`,
                  } as const);

        pinyinSpan.style.paddingLeft = pinyinPadding;
        pinyinSpan.style.paddingRight = pinyinPadding;

        chineseCharSpan.style.paddingLeft = chineseCharPadding;
        chineseCharSpan.style.paddingRight = chineseCharPadding;
    }
};

export default class MyPlugin extends Plugin {
    onload() {
        this.registerMarkdownCodeBlockProcessor('zh-cn', codeBlockProcessor);
    }
}
