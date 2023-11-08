import { render } from 'preact-render-to-string';
import { pinyin } from 'pinyin-pro';

const input = '你先来学校，(然后)我们再一起去找老师。';
const allData = pinyin(input, { type: 'all' });

const app = document.getElementById('app')!;

type CharBlock = Readonly<{
    pinyin: readonly [string, number];
    chineseChar: readonly [string, number];
}>;

const charBlocks: CharBlock[] = [];

const gap = 2;

for (const data of allData) {
    const charBlock = document.createElement('span');
    charBlock.style.position = 'absolute';
    charBlock.style.visibility = 'hidden';
    charBlock.textContent = data.origin;
    app.appendChild(charBlock);

    const chineseCharWidth = charBlock.getBoundingClientRect().width;

    charBlock.textContent = data.pinyin;
    const pinyinWidth = charBlock.getBoundingClientRect().width;

    charBlocks.push(
        pinyinWidth >= chineseCharWidth
            ? ({
                  pinyin: [data.pinyin, gap],
                  chineseChar: [
                      data.origin,
                      (pinyinWidth - chineseCharWidth) / 2 + gap,
                  ],
              } as const)
            : ({
                  pinyin: [
                      data.pinyin,
                      (chineseCharWidth - pinyinWidth) / 2 + gap,
                  ],
                  chineseChar: [data.origin, gap],
              } as const),
    );

    app.removeChild(charBlock);
}

const output = document.createElement('div');
output.style.position = 'relative';

output.innerHTML = render(
    <>
        <div
            style={{
                position: 'absolute',
                overflowWrap: 'anywhere',
                lineHeight: '3em',
                marginTop: '-1.3em',
                userSelect: 'none',
            }}
        >
            {charBlocks.map(({ pinyin }) => (
                <span
                    style={{
                        display: 'inline-block',
                        marginLeft: `${pinyin[1]}px`,
                        marginRight: `${pinyin[1]}px`,
                    }}
                >
                    {pinyin[0]}
                </span>
            ))}
        </div>
        <div
            style={{
                overflowWrap: 'anywhere',
                lineHeight: '3em',
            }}
        >
            {charBlocks.map(({ chineseChar }) => (
                <span
                    style={{
                        display: 'inline-block',
                        marginLeft: `${chineseChar[1]}px`,
                        marginRight: `${chineseChar[1]}px`,
                    }}
                >
                    {chineseChar[0]}
                </span>
            ))}
        </div>
    </>,
);

app.appendChild(output);
