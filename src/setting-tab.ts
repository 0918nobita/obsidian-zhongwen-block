import type * as Obsidian from 'obsidian';

import type { Plugin } from './plugin';

export interface SettingTab extends Obsidian.SettingTab {
    plugin: Plugin;
}
