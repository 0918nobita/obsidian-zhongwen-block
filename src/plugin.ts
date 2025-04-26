import type * as Obsidian from 'obsidian';

import type { Settings } from './settings';

export interface Plugin extends Obsidian.Plugin {
    settings: Settings;

    saveSettings(): Promise<void>;
}
