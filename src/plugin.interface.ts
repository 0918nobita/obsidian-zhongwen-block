import { type Settings } from './settings';

export interface Plugin {
    settings: Settings;

    saveSettings(): Promise<void>;
}
