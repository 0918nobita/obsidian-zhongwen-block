import { waitAndMeasureCorrectWidth } from './measure-width';

import * as styles from './style.css';

export class HiddenZhChar {
    #el: HTMLSpanElement;

    constructor(hiddenZhBlock: HTMLDivElement, { zhChar }: { zhChar: string }) {
        this.#el = hiddenZhBlock.createSpan({
            cls: styles.hiddenZhChar,
            text: zhChar,
        });
    }

    waitAndMeasureCorrectWidth(): Promise<number> {
        return waitAndMeasureCorrectWidth(this.#el);
    }

    setPadding(padding: number): void {
        this.#el.style.paddingLeft =
            this.#el.style.paddingRight = `${padding}px`;
    }
}
