import { waitAndMeasureCorrectWidth } from './measure-width';

import * as styles from './style.css';

export type PinyinSpanStyle = 'alwaysDisplay' | 'displayOnHover';

export class PinyinSpan {
    #el: HTMLSpanElement;

    constructor(
        pinyinLineZhBlock: HTMLDivElement,
        {
            pinyin,
            style: pinyinSpanStyle,
        }: { pinyin: string; style: PinyinSpanStyle },
    ) {
        this.#el = pinyinLineZhBlock.createSpan({
            cls:
                pinyinSpanStyle === 'alwaysDisplay'
                    ? styles.pinyin.base
                    : `${styles.pinyin.base} ${styles.pinyin.displayOnHover}`,
            text: pinyin,
        });
    }

    waitAndMeasureCorrectWidth(): Promise<number> {
        return waitAndMeasureCorrectWidth(this.#el);
    }

    setPadding(padding: number): void {
        this.#el.style.paddingLeft =
            this.#el.style.paddingRight = `${String(padding)}px`;
    }
}
