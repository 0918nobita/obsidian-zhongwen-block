import { style } from '@vanilla-extract/css';

export const container = style({
    position: 'relative',
    selectors: {
        [`.cm-preview-code-block &`]: {
            marginTop: '0.5rem',
        },
    },
});

export const zhCharLine = style({
    position: 'relative',
    overflowWrap: 'anywhere',
    lineHeight: '2.7rem',
});

export const zhCharSpan = style({
    display: 'inline-block',
});

export const pinyinSpan = style({
    display: 'inline-block',
});

export const pinyinLineBase = style({
    position: 'absolute',
    overflowWrap: 'anywhere',
    lineHeight: '2.7rem',
    marginTop: '-1.3rem',
    userSelect: 'none',
    fontSize: '0.8rem',
});

export const pinyinLineDisplayedOnHover = style([
    pinyinLineBase,
    {
        opacity: '0',
        transition: 'opacity .3s ease',
        selectors: {
            [`${container}:has(> ${zhCharLine}:hover) > &`]: {
                opacity: '1',
            },
        },
    },
]);
