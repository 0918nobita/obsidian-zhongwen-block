import { pinyin } from 'pinyin-pro';

import type { Settings } from './settings';

import * as styles from './style.css';

const waitAndMeasureCorrectWidth = (element: HTMLElement): Promise<number> =>
    new Promise((resolve) => {
        const observer = new IntersectionObserver((entries) => {
            if (entries.length === 0) {
                return;
            }

            const { width } = entries[0].boundingClientRect;
            if (width !== 0) {
                observer.disconnect();
                resolve(width);
            }
        });

        observer.observe(element);
    });

export const codeBlockProcessor = async (
    source: string,
    element: HTMLElement,
    settings: Settings,
): Promise<void> => {
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

    const zhCharLine = container.createDiv({
        cls: styles.zhCharLine,
    });

    for (const pinyinDatum of pinyinData) {
        const pinyinSpan = pinyinLine.createSpan({
            text: pinyinDatum.pinyin,
            cls: styles.pinyinSpan,
        });

        let pinyinWidth = pinyinSpan.getBoundingClientRect().width;
        if (pinyinDatum.pinyin !== '' && pinyinWidth === 0) {
            pinyinWidth = await waitAndMeasureCorrectWidth(pinyinSpan);
        }

        const zhCharSpan = zhCharLine.createSpan({
            text: pinyinDatum.origin,
            cls: styles.zhCharSpan,
        });
        const zhCharWidth = zhCharSpan.getBoundingClientRect().width;

        const { pinyinPadding, zhCharPadding } =
            pinyinWidth >= zhCharWidth
                ? {
                      pinyinPadding: gap,
                      zhCharPadding: (pinyinWidth - zhCharWidth) / 2 + gap,
                  }
                : {
                      pinyinPadding: (zhCharWidth - pinyinWidth) / 2 + gap,
                      zhCharPadding: gap,
                  };

        pinyinSpan.style.paddingLeft = `${pinyinPadding}px`;
        pinyinSpan.style.paddingRight = `${pinyinPadding}px`;

        zhCharSpan.style.paddingLeft = `${zhCharPadding}px`;
        zhCharSpan.style.paddingRight = `${zhCharPadding}px`;
    }
};
