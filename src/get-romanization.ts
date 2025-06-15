import * as PinyinPro from 'pinyin-pro';
import { getJyutpingList } from 'to-jyutping';

/** 非同期関数をメモ化する */
const once = <T, U>(fn: (arg: T) => Promise<U>): ((arg: T) => Promise<U>) => {
    const memo = new Map<T, Promise<U>>();

    return async (arg: T): Promise<U> => {
        const memorizedPromise = memo.get(arg);

        if (memorizedPromise === undefined) {
            const promise = fn(arg);
            memo.set(arg, promise);
            return promise;
        }

        return memorizedPromise;
    };
};

export type RomanizationData = {
    romanization: string;
    origin: string;
};

export const getPinyin = once(
    (sentence: string) =>
        new Promise<RomanizationData[]>((resolve) => {
            resolve(
                PinyinPro.pinyin(sentence, { type: 'all' }).map(
                    ({ pinyin, origin }) => ({ romanization: pinyin, origin }),
                ),
            );
        }),
);

export const getJyutping = once(
    (sentence: string) =>
        new Promise<RomanizationData[]>((resolve) => {
            resolve(
                getJyutpingList(sentence).map(([char, jyutping]) => ({
                    // this function will only be called on chinese characters
                    // so we are guaranteed to return a string here.
                    // In worst case, lets return an empty string.
                    romanization: jyutping ?? '',
                    origin: char,
                })),
            );
        }),
);
