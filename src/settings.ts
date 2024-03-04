import type { Lang } from './i18n';

export interface Settings {
    alwaysDisplayPinyin: boolean;
    lang: Lang;
}

export const defaultSettings: Settings = {
    alwaysDisplayPinyin: false,
    lang: 'en-US',
};
