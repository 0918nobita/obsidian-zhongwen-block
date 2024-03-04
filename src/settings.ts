import type { Lang } from './i18n';

export interface Settings {
    alwaysDisplayPinyin: boolean;
    googleApiKey: string;
    lang: Lang;
}

export const defaultSettings: Settings = {
    alwaysDisplayPinyin: false,
    googleApiKey: '',
    lang: 'en-US',
};
