import { style } from '@vanilla-extract/css';

export const container = style({});

export const sentence = style({
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: '0.2em',
});

export const charBlock = style({
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'end',
});

export const pinyin = style({
    fontSize: '0.8em',
    textAlign: 'center',
    userSelect: 'none',
    transition: 'opacity .3s ease',
    opacity: '0',
    selectors: {
        [`${container}:hover &`]: {
            opacity: '1',
        },
    },
});

export const chineseChar = style({
    textAlign: 'center',
});
