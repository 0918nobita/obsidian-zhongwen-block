import * as PinyinPro from 'pinyin-pro';

import type { LayoutMemo, ZhCharBlockLayout } from './memo';
import {
    NonZhSegment,
    ZhSegment,
    splitSentenceIntoSegments,
} from './split-sentence';
import type { Settings } from '../settings';

import * as styles from './style.css';

const waitAndMeasureCorrectWidth = async (
    element: HTMLElement,
): Promise<number> => {
    const { width } = element.getBoundingClientRect();
    if (width !== 0) return width;

    return new Promise((resolve) => {
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
};

const createHiddenZhBlock = (
    parent: HTMLElement,
    {
        zhChar,
        pinyin,
        pinyinSpanClass,
    }: { zhChar: string; pinyin: string; pinyinSpanClass: string },
): { hiddenZhChar: HTMLSpanElement; pinyinSpan: HTMLSpanElement } => {
    const hiddenZhBlock = parent.createDiv({
        cls: styles.hiddenZhBlock,
    });

    const hiddenZhChar = hiddenZhBlock.createSpan({
        cls: styles.hiddenZhChar,
        text: zhChar,
    });

    const pinyinSpan = hiddenZhBlock.createSpan({
        cls: pinyinSpanClass,
        text: pinyin,
    });

    return { hiddenZhChar, pinyinSpan };
};

const gap = 2;

const computePadding = ({
    zhCharWidth,
    pinyinWidth,
}: {
    zhCharWidth: number;
    pinyinWidth: number;
}): { zhCharPadding: number; pinyinPadding: number } =>
    pinyinWidth >= zhCharWidth
        ? {
              pinyinPadding: gap,
              zhCharPadding: (pinyinWidth - zhCharWidth) / 2 + gap,
          }
        : {
              pinyinPadding: (zhCharWidth - pinyinWidth) / 2 + gap,
              zhCharPadding: gap,
          };

const createVisibleZhBlock = (
    parent: HTMLElement,
    zhChar: string,
    zhCharPadding: number,
): void => {
    const visibleZhBlock = parent.createDiv({
        cls: styles.visibleZhBlock,
        text: zhChar,
    });
    visibleZhBlock.style.paddingLeft = `${zhCharPadding}px`;
    visibleZhBlock.style.paddingRight = `${zhCharPadding}px`;
};

const renderNonZhSegment = (
    segment: NonZhSegment,
    {
        pinyinLine,
        zhCharLine,
    }: { pinyinLine: HTMLDivElement; zhCharLine: HTMLDivElement },
): void => {
    pinyinLine.createSpan({
        cls: styles.hiddenNonZh,
        text: segment.nonZhChars,
    });

    zhCharLine.appendText(segment.nonZhChars);
};

const renderAndMemorizeZhSegment = async (
    segment: ZhSegment,
    {
        pinyinLine,
        zhCharLine,
    }: { pinyinLine: HTMLDivElement; zhCharLine: HTMLDivElement },
    pinyinSpanClass: string,
    memo: LayoutMemo,
): Promise<void> => {
    const zhCharBlocks: ZhCharBlockLayout[] = [];

    const pinyinData = PinyinPro.pinyin(segment.zhChars, {
        type: 'all',
    });

    for (const { pinyin, origin: zhChar } of pinyinData) {
        const { hiddenZhChar, pinyinSpan } = createHiddenZhBlock(pinyinLine, {
            zhChar,
            pinyin,
            pinyinSpanClass,
        });

        const zhCharWidth = await waitAndMeasureCorrectWidth(hiddenZhChar);

        const pinyinWidth = await waitAndMeasureCorrectWidth(pinyinSpan);

        const { zhCharPadding, pinyinPadding } = computePadding({
            zhCharWidth,
            pinyinWidth,
        });

        hiddenZhChar.style.paddingLeft = `${zhCharPadding}px`;
        hiddenZhChar.style.paddingRight = `${zhCharPadding}px`;

        pinyinSpan.style.paddingLeft = `${pinyinPadding}px`;
        pinyinSpan.style.paddingRight = `${pinyinPadding}px`;

        createVisibleZhBlock(zhCharLine, zhChar, zhCharPadding);

        zhCharBlocks.push({
            zhChar,
            zhCharWidth,
            pinyin,
            pinyinWidth,
        });
    }

    memo.set(segment.zhChars, zhCharBlocks);
};

const renderMemorizedZhSegment = (
    zhCharBlocks: ZhCharBlockLayout[],
    {
        pinyinLine,
        zhCharLine,
    }: { pinyinLine: HTMLDivElement; zhCharLine: HTMLDivElement },
    pinyinSpanClass: string,
): void => {
    for (const { zhChar, zhCharWidth, pinyin, pinyinWidth } of zhCharBlocks) {
        const { hiddenZhChar, pinyinSpan } = createHiddenZhBlock(pinyinLine, {
            zhChar,
            pinyin,
            pinyinSpanClass,
        });

        const { zhCharPadding, pinyinPadding } = computePadding({
            zhCharWidth,
            pinyinWidth,
        });

        hiddenZhChar.style.paddingLeft = `${zhCharPadding}px`;
        hiddenZhChar.style.paddingRight = `${zhCharPadding}px`;

        pinyinSpan.style.paddingLeft = `${pinyinPadding}px`;
        pinyinSpan.style.paddingRight = `${pinyinPadding}px`;

        createVisibleZhBlock(zhCharLine, zhChar, zhCharPadding);
    }
};

export const codeBlockProcessor = async (
    source: string,
    element: HTMLElement,
    settings: Settings,
    memo: LayoutMemo,
): Promise<void> => {
    const pinyinSpanClass = settings.alwaysDisplayPinyin
        ? styles.pinyin.base
        : `${styles.pinyin.base} ${styles.pinyin.displayOnHover}`;

    const container = element.createDiv({
        cls: styles.container,
    });

    const pinyinLine = container.createDiv({
        cls: styles.pinyinLine,
    });

    const zhCharLine = container.createDiv({
        cls: styles.zhCharLine,
    });

    const segments = splitSentenceIntoSegments(source.trim());

    for (const segment of segments) {
        if (segment.type === 'nonZh') {
            renderNonZhSegment(segment, { pinyinLine, zhCharLine });
            continue;
        }

        const zhCharBlocks = memo.get(segment.zhChars);

        if (zhCharBlocks === undefined) {
            await renderAndMemorizeZhSegment(
                segment,
                { pinyinLine, zhCharLine },
                pinyinSpanClass,
                memo,
            );
            continue;
        }

        renderMemorizedZhSegment(
            zhCharBlocks,
            { pinyinLine, zhCharLine },
            pinyinSpanClass,
        );
    }
};
