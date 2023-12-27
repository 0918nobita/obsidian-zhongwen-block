export interface ZhCharBlockLayout {
    zhChar: string;
    zhCharWidth: number;
    pinyin: string;
    pinyinWidth: number;
}

export type LayoutMemo = Map<string, ZhCharBlockLayout[]>;
