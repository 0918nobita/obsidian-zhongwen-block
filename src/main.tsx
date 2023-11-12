import { Plugin } from 'obsidian';
import { pinyin } from 'pinyin-pro';

import * as styles from './style.css';
import { render } from 'preact-render-to-string';

type CharBlock = Readonly<{
    chineseChar: Readonly<{
        text: string;
        horizontalPadding: number;
    }>;
    pinyin: Readonly<{
        text: string;
        horizontalPadding: number;
    }>;
}>;

const gap = 2;

const codeBlockProcessor = async (
    source: string,
    element: HTMLElement,
): Promise<void> => {
    const allData = pinyin(source, { type: 'all' });

    const charBlocks: CharBlock[] = [];

    await new Promise((resolve) => {
        setTimeout(resolve, 0);
    });

    const measureChineseCharWidth = document.createElement('span');
    measureChineseCharWidth.className = styles.measureChineseCharWidth;
    element.appendChild(measureChineseCharWidth);

    const measurePinyinWidth = document.createElement('span');
    measurePinyinWidth.className = styles.measurePinyinWidth;
    element.appendChild(measurePinyinWidth);

    for (const data of allData) {
        measureChineseCharWidth.textContent = data.origin;
        const chineseCharWidth =
            measureChineseCharWidth.getBoundingClientRect().width;

        measurePinyinWidth.textContent = data.pinyin;
        const pinyinWidth = measurePinyinWidth.getBoundingClientRect().width;

        const charBlock: CharBlock =
            pinyinWidth >= chineseCharWidth
                ? ({
                      chineseChar: {
                          text: data.origin,
                          horizontalPadding:
                              (pinyinWidth - chineseCharWidth) / 2 + gap,
                      },
                      pinyin: {
                          text: data.pinyin,
                          horizontalPadding: gap,
                      },
                  } as const)
                : ({
                      chineseChar: {
                          text: data.origin,
                          horizontalPadding: gap,
                      },
                      pinyin: {
                          text: data.pinyin,
                          horizontalPadding:
                              (chineseCharWidth - pinyinWidth) / 2 + gap,
                      },
                  } as const);

        charBlocks.push(charBlock);
    }

    const pinyinLine = (
        <div className={styles.pinyinLine}>
            {charBlocks.map(({ pinyin }) => (
                <span
                    style={{
                        display: 'inline-block',
                        paddingLeft: `${pinyin.horizontalPadding}px`,
                        paddingRight: `${pinyin.horizontalPadding}px`,
                    }}
                >
                    {pinyin.text}
                </span>
            ))}
        </div>
    );

    const chineseCharLine = (
        <div className={styles.chineseCharLine}>
            {charBlocks.map(({ chineseChar }) => (
                <span
                    style={{
                        display: 'inline-block',
                        paddingLeft: `${chineseChar.horizontalPadding}px`,
                        paddingRight: `${chineseChar.horizontalPadding}px`,
                    }}
                >
                    {chineseChar.text}
                </span>
            ))}
        </div>
    );

    const el = (
        <div className={styles.container}>
            {pinyinLine}
            {chineseCharLine}
        </div>
    );

    element.innerHTML = render(el);
};

export default class MyPlugin extends Plugin {
    onload() {
        this.registerMarkdownCodeBlockProcessor('zh-cn', codeBlockProcessor);
    }
}
