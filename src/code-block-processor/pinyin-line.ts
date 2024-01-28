import { HiddenZhChar } from './hidden-zh-char';
import { PinyinSpan, type PinyinSpanStyle } from './pinyin-span';

import * as styles from './style.css';

export class PinyinLine {
    #el: HTMLDivElement;

    constructor(container: HTMLDivElement) {
        this.#el = container.createDiv({
            cls: styles.pinyinLine,
            attr: { 'aria-hidden': true },
        });
    }

    appendZhCharBlock({
        zhChar,
        pinyin,
        pinyinSpanStyle,
    }: {
        zhChar: string;
        pinyin: string;
        pinyinSpanStyle: PinyinSpanStyle;
    }): {
        hiddenZhChar: HiddenZhChar;
        pinyinSpan: PinyinSpan;
    } {
        const hiddenZhBlock = this.#el.createDiv({ cls: styles.hiddenZhBlock });

        const hiddenZhChar = new HiddenZhChar(hiddenZhBlock, { zhChar });

        const pinyinSpan = new PinyinSpan(hiddenZhBlock, {
            pinyin,
            style: pinyinSpanStyle,
        });

        return { hiddenZhChar, pinyinSpan };
    }

    appendNonZhSegment({ nonZhChars }: { nonZhChars: string }): void {
        this.#el.createSpan({
            cls: styles.hiddenNonZh,
            text: nonZhChars,
        });
    }
}
