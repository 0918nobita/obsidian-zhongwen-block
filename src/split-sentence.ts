type Line = string[];

function splitCharsIntoLines(chars: string[]): Line[] {
    type Acc = Readonly<{
        lines: Line[];
        currentLine: string[];
    }>;

    const initial: Acc = {
        lines: [],
        currentLine: [],
    };

    const reducer = (acc: Acc, c: string): Acc => {
        if (c === '\n') {
            return {
                lines: [...acc.lines, acc.currentLine],
                currentLine: [],
            };
        }

        return {
            lines: acc.lines,
            currentLine: [...acc.currentLine, c],
        };
    };

    const result = chars.reduce(reducer, initial);
    const lines =
        result.currentLine.length > 0
            ? [...result.lines, result.currentLine]
            : result.lines;

    return lines;
}

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

function splitLineIntoSegments(line: Line): Segment[] {
    const result: Segment[] = [];
    let currentSegment: Segment | null = null;

    for (const c of line) {
        if (isZh(c)) {
            if (currentSegment !== null && currentSegment.type === 'zh') {
                currentSegment.zhChars += c;
                continue;
            }

            currentSegment = { type: 'zh', zhChars: c };
            result.push(currentSegment);
            continue;
        }

        if (currentSegment === null || currentSegment.type === 'zh') {
            currentSegment = { type: 'nonZh', nonZhChars: c };
            result.push(currentSegment);
            continue;
        }

        currentSegment.nonZhChars += c;
    }

    return result;
}

export function splitIntoSegmentsPerLine(sentence: string): Segment[][] {
    const lines = splitCharsIntoLines(Array.from(sentence));

    return lines.map(splitLineIntoSegments);
}
