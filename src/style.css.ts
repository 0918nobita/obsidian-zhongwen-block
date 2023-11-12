import { style } from '@vanilla-extract/css';

export const measureChineseCharWidth = style({
    position: 'absolute',
    visibility: 'hidden',
});

export const measurePinyinWidth = style({
    position: 'absolute',
    visibility: 'hidden',
    fontSize: '0.8rem',
});

export const container = style({
    position: 'relative',
});

export const chineseCharLine = style({
    position: 'relative',
    overflowWrap: 'anywhere',
    lineHeight: '2.7rem',
});

export const pinyinLine = style({
    position: 'absolute',
    overflowWrap: 'anywhere',
    lineHeight: '2.7rem',
    marginTop: '-1.3rem',
    userSelect: 'none',
    fontSize: '0.8rem',
    opacity: '0',
    transition: 'opacity .3s ease',
    selectors: {
        [`${container}:has(> ${chineseCharLine}:hover) > &`]: {
            opacity: '1',
        },
    },
});
