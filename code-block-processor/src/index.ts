type Branded<B> = string & { __brand: B };

export type ZhChar = Branded<'zhChar'>;

export type Pinyin = Branded<'pinyin'>;

export interface ZhCharLayout {
    zhChar: ZhChar;
    zhCharWidth: number;
    pinyin: Pinyin;
    pinyinWidth: number;
}

export type LayoutMemo = Map<string, ZhCharLayout[]>;

type Context = {
    layoutMemo: LayoutMemo;
    alwaysDisplayPinyin: boolean;
};

export function codeBlockProcessor(
    source: string,
    element: HTMLElement,
    { layoutMemo }: Context,
): void {}
