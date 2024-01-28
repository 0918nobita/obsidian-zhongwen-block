import * as PinyinPro from 'pinyin-pro';

import { LayoutMemo, ZhCharBlockLayout } from './memo';
import { NonZhSegment, ZhSegment } from './split-sentence';
import { PinyinLine } from './pinyin-line';
import { PinyinSpanStyle } from './pinyin-span';
import { ZhCharLine } from './zh-char-line';

import * as styles from './style.css';

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

export class Container {
    #pinyinLine: PinyinLine;
    #zhCharLine: ZhCharLine;

    constructor(parent: HTMLElement) {
        const el = parent.createDiv({
            cls: styles.container,
            attr: { lang: 'zh-CN' },
        });

        this.#pinyinLine = new PinyinLine(el);

        this.#zhCharLine = new ZhCharLine(el);
    }

    appendNonZhSegment({ nonZhChars }: NonZhSegment) {
        this.#pinyinLine.appendNonZhSegment({ nonZhChars });

        this.#zhCharLine.appendNonZhSegment({ nonZhChars });
    }

    async appendAndMemorizeZhSegment({
        zhSegment: { zhChars },
        pinyinSpanStyle,
        layoutMemo,
    }: {
        zhSegment: ZhSegment;
        pinyinSpanStyle: PinyinSpanStyle;
        layoutMemo: LayoutMemo;
    }): Promise<void> {
        const zhCharBlocks: ZhCharBlockLayout[] = [];

        const pinyinData = PinyinPro.pinyin(zhChars, { type: 'all' });

        for (const { pinyin, origin: zhChar } of pinyinData) {
            const { hiddenZhChar, pinyinSpan } =
                this.#pinyinLine.appendZhCharBlock({
                    zhChar,
                    pinyin,
                    pinyinSpanStyle,
                });

            const zhCharWidth = await hiddenZhChar.waitAndMeasureCorrectWidth();
            const pinyinWidth = await pinyinSpan.waitAndMeasureCorrectWidth();

            const { zhCharPadding, pinyinPadding } = computePadding({
                zhCharWidth,
                pinyinWidth,
            });

            hiddenZhChar.setPadding(zhCharPadding);
            pinyinSpan.setPadding(pinyinPadding);

            this.#zhCharLine.appendZhBlock({ zhChar, zhCharPadding });

            zhCharBlocks.push({ zhChar, zhCharWidth, pinyin, pinyinWidth });
        }

        layoutMemo.set(zhChars, zhCharBlocks);
    }

    appendMemorizedZhSegment({
        zhCharBlocks,
        pinyinSpanStyle,
    }: {
        zhCharBlocks: ZhCharBlockLayout[];
        pinyinSpanStyle: PinyinSpanStyle;
    }): void {
        for (const {
            zhChar,
            zhCharWidth,
            pinyin,
            pinyinWidth,
        } of zhCharBlocks) {
            const { hiddenZhChar, pinyinSpan } =
                this.#pinyinLine.appendZhCharBlock({
                    zhChar,
                    pinyin,
                    pinyinSpanStyle,
                });

            const { zhCharPadding, pinyinPadding } = computePadding({
                zhCharWidth,
                pinyinWidth,
            });

            hiddenZhChar.setPadding(zhCharPadding);
            pinyinSpan.setPadding(pinyinPadding);

            this.#zhCharLine.appendZhBlock({ zhChar, zhCharPadding });
        }
    }
}
