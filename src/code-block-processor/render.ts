import { Container } from './container';
import type { LayoutMemo } from './memo';
import { splitSentenceIntoSegments } from './split-sentence';
import type { Settings } from '../settings';
import { PinyinSpanStyle } from './pinyin-span';

export const codeBlockProcessor = async (
    source: string,
    element: HTMLElement,
    settings: Settings,
    layoutMemo: LayoutMemo,
): Promise<void> => {
    const pinyinSpanStyle: PinyinSpanStyle = settings.alwaysDisplayPinyin
        ? 'alwaysDisplay'
        : 'displayOnHover';

    const container = new Container(element);

    const segments = splitSentenceIntoSegments(source.trim());

    for (const segment of segments) {
        if (segment.type === 'nonZh') {
            container.appendNonZhSegment(segment);
            continue;
        }

        const zhCharBlocks = layoutMemo.get(segment.zhChars);

        if (zhCharBlocks === undefined) {
            await container.appendAndMemorizeZhSegment({
                zhSegment: segment,
                pinyinSpanStyle,
                layoutMemo,
            });
            continue;
        }

        container.appendMemorizedZhSegment({ zhCharBlocks, pinyinSpanStyle });
    }
};
