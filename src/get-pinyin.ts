import * as PinyinPro from 'pinyin-pro';

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

export type PinyinData = ReturnType<typeof PinyinPro.pinyin>;

export const getPinyin = once(
    (sentence: string) =>
        new Promise<PinyinData>((resolve) => {
            resolve(PinyinPro.pinyin(sentence, { type: 'all' }));
        }),
);
