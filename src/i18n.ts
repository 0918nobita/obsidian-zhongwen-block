export type Lang = 'en-US' | 'ja-JP';

const translation = {
    alwaysDisplayPinyin: {
        'en-US': 'Always display pinyin',
        'ja-JP': 'ピンインを常に表示する',
    },
    language: {
        'en-US': 'Language',
        'ja-JP': '言語',
    },
} as const satisfies Record<string, Record<Lang, string>>;

export function t(lang: Lang, key: keyof typeof translation): string {
    return translation[key][lang];
}
