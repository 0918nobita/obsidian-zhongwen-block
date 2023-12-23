import { pinyin } from 'pinyin-pro';

import type { Settings } from './settings';

import * as styles from './style.css';

export const codeBlockProcessor = (
    source: string,
    element: HTMLElement,
    settings: Settings,
): void => {
    const gap = 2;

    const pinyinData = pinyin(source, { type: 'all' });

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
