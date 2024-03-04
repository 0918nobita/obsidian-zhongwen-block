import { style } from '@vanilla-extract/css';

export const container = style({
    position: 'relative',
    backgroundColor: '#22272E',
    border: '1px solid #333a45',
    borderRadius: '5px',
    paddingTop: '0.8rem',
    paddingLeft: '0.5rem',
});

export const pinyinLine = style({
    position: 'absolute',
    top: '0.8rem',
    left: '0.5rem',
    width: 'calc(100% - 0.5rem * 2)',
    lineHeight: '2.7rem',
    zIndex: '0',
});

export const hiddenZhBlock = style({
    display: 'inline-block',
    position: 'relative',
});

export const hiddenZhChar = style({
    opacity: '0',
});

export const hiddenNonZh = style({
    opacity: '0',
});

export const pinyin = {
    base: style({
        position: 'absolute',
        top: '-1.3rem',
        left: '0',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        fontSize: '0.8rem',
    }),

    displayOnHover: style({
        transition: 'opacity .3s ease',
        opacity: '0',
        selectors: {
            [`${container}:has(*:hover) &`]: {
                opacity: '1',
            },
        },
    }),
};

export const zhCharLine = style({
    position: 'relative',
    lineHeight: '2.7rem',
    zIndex: '1',
});

export const visibleZhBlock = style({
    display: 'inline-block',
});
