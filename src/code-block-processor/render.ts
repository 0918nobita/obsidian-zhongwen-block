import * as PinyinPro from 'pinyin-pro';

import { waitAndMeasureCorrectWidth } from './measure-width';
import type { LayoutMemo, ZhCharBlockLayout } from './memo';
import {
    NonZhSegment,
    ZhSegment,
    splitSentenceIntoSegments,
} from './split-sentence';
import type { Branded } from '../branded';
import type { Settings } from '../settings';

import * as styles from './style.css';

type PinyinLine = Branded<HTMLDivElement, 'pinyinLine'>;

type HiddenZhChar = Branded<HTMLSpanElement, 'hiddenZhChar'>;

type PinyinSpan = Branded<HTMLSpanElement, 'pinyinSpan'>;

type ZhCharLine = Branded<HTMLDivElement, 'zhCharLine'>;

const createHiddenZhBlock = (
    pinyinLine: PinyinLine,
    {
        zhChar,
        pinyin,
        pinyinSpanClass,
    }: { zhChar: string; pinyin: string; pinyinSpanClass: string },
): { hiddenZhChar: HiddenZhChar; pinyinSpan: PinyinSpan } => {
    const hiddenZhBlock = pinyinLine.createDiv({
        cls: styles.hiddenZhBlock,
    });

    const hiddenZhChar = hiddenZhBlock.createSpan({
        cls: styles.hiddenZhChar,
        text: zhChar,
    }) as HiddenZhChar;

    const pinyinSpan = hiddenZhBlock.createSpan({
        cls: pinyinSpanClass,
        text: pinyin,
    }) as PinyinSpan;

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
    zhCharLine: ZhCharLine,
    zhChar: string,
    zhCharPadding: number,
): void => {
    const visibleZhBlock = zhCharLine.createDiv({
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
    }: { pinyinLine: PinyinLine; zhCharLine: ZhCharLine },
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
    }: { pinyinLine: PinyinLine; zhCharLine: ZhCharLine },
    pinyinSpanClass: string,
    layoutMemo: LayoutMemo,
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

    layoutMemo.set(segment.zhChars, zhCharBlocks);
};

const renderMemorizedZhSegment = (
    zhCharBlocks: ZhCharBlockLayout[],
    {
        pinyinLine,
        zhCharLine,
    }: { pinyinLine: PinyinLine; zhCharLine: ZhCharLine },
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
    layoutMemo: LayoutMemo,
): Promise<void> => {
    const pinyinSpanClass = settings.alwaysDisplayPinyin
        ? styles.pinyin.base
        : `${styles.pinyin.base} ${styles.pinyin.displayOnHover}`;

    const container = element.createDiv({
        cls: styles.container,
    });

    const pinyinLine = container.createDiv({
        cls: styles.pinyinLine,
    }) as PinyinLine;

    const zhCharLine = container.createDiv({
        cls: styles.zhCharLine,
    }) as ZhCharLine;

    const segments = splitSentenceIntoSegments(source.trim());

    for (const segment of segments) {
        if (segment.type === 'nonZh') {
            renderNonZhSegment(segment, { pinyinLine, zhCharLine });
            continue;
        }

        const zhCharBlocks = layoutMemo.get(segment.zhChars);

        if (zhCharBlocks === undefined) {
            await renderAndMemorizeZhSegment(
                segment,
                { pinyinLine, zhCharLine },
                pinyinSpanClass,
                layoutMemo,
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
