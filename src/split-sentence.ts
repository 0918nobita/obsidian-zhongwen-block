export interface ZhSegment {
    type: 'zh';
    zhChars: string;
}

export interface NonZhSegment {
    type: 'nonZh';
    nonZhChars: string;
}

export type Segment = ZhSegment | NonZhSegment;

function isZh(c: string): boolean {
    const charCode = c.charCodeAt(0);
    return 19968 <= charCode && charCode <= 40869;
}

export function splitSentenceIntoSegments(sentence: string): Segment[] {
    const chars = Array.from(sentence);

    const result: Segment[] = [];
    let currentSegment: Segment | null = null;

    for (const c of chars) {
        if (isZh(c)) {
            if (currentSegment !== null && currentSegment.type === 'zh') {
                currentSegment.zhChars += c;
                continue;
            }

            currentSegment = {
                type: 'zh',
                zhChars: c,
            };
            result.push(currentSegment);
            continue;
        }

        if (currentSegment === null || currentSegment.type === 'zh') {
            currentSegment = {
                type: 'nonZh',
                nonZhChars: c,
            };
            result.push(currentSegment);
            continue;
        }

        currentSegment.nonZhChars += c;
    }

    return result;
}
