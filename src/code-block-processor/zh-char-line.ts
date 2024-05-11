import * as styles from './style.css';

export class ZhCharLine {
    #el: HTMLDivElement;

    constructor(container: HTMLDivElement) {
        this.#el = container.createDiv({ cls: styles.zhCharLine });
    }

    appendZhBlock({
        zhChar,
        zhCharPadding,
    }: {
        zhChar: string;
        zhCharPadding: number;
    }): void {
        const zhBlock = this.#el.createDiv({
            cls: styles.visibleZhBlock,
            text: zhChar,
        });

        zhBlock.style.paddingLeft =
            zhBlock.style.paddingRight = `${String(zhCharPadding)}px`;
    }

    appendNonZhSegment({ nonZhChars }: { nonZhChars: string }): void {
        this.#el.createSpan({
            cls: styles.visibleNonZhBlock,
            text: nonZhChars,
        });
    }
}
