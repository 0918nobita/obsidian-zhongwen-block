## [0.7.3](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.7.2...0.7.3) (2025-04-29)

- Fix display issue where long texts don't wrap at screen edges (Issue: [#100](https://github.com/0918nobita/obsidian-zhongwen-block/issues/100), huge thanks to [@fredricsanjaya](https://github.com/fredricsanjaya) for continuously helping improve this plugin!)

## [0.7.2](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.7.1...0.7.2) (2025-04-26)

- Migrate Svelte from v4 to v5

### Bug fixes

- Fix the line break rendering problem in code blocks (Issue: [#94](https://github.com/0918nobita/obsidian-zhongwen-block/issues/94), huge thanks to [@fredricsanjaya](https://github.com/fredricsanjaya) and [@dannephew](https://github.com/dannephew) for helping!)

### Update dependencies

| package | from | to |
| --- | --- | --- |
| obsidian | 1.7.2 | 1.8.7 |
| pinyin-pro | 3.25.0 | 3.26.0 |
| typescript | 5.5.4 | 5.8.3 |
| vite | 5.4.8 | 6.3.3 |

## [0.7.1](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.7.0...0.7.1) (2024-10-05)

### Update dependencies

| package    | from    | to     |
| ---------- | ------- | ------ |
| obsidian   | 1.5.7-1 | 1.7.2  |
| pinyin-pro | 3.20.4  | 3.25.0 |
| typescript | 5.4.5   | 5.5.4  |
| vite       | 5.2.11  | 5.4.8  |

## [0.7.0](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.6.2...0.7.0) (2024-05-12)

- Reimplement the code block processor using Svelte (PR: [#86](https://github.com/0918nobita/obsidian-zhongwen-block/pull/86))

## [0.6.2](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.6.1...0.6.2) (2024-05-09)

### Update dependencies

| package                      | from   | to     |
| ---------------------------- | ------ | ------ |
| @vanilla-extract/css         | 1.14.1 | 1.15.1 |
| @vanilla-extract/vite-plugin | 4.0.6  | 4.0.9  |
| pinyin-pro                   | 3.19.6 | 3.20.4 |
| typescript                   | 5.3.3  | 5.4.5  |
| vite                         | 5.1.5  | 5.2.11 |

## [0.6.1](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.6.0...0.6.1) (2024-03-10)

### Bug fixes

- Fix the styles of code block processor to display line breaks as they are (PR: [#80](https://github.com/0918nobita/obsidian-zhongwen-block/issues/80)) (Issue: [#75](https://github.com/0918nobita/obsidian-zhongwen-block/issues/75)), huge thanks to [@orkunzozturk](https://github.com/orkunzozturk) for helping!

### Update dependencies

| package                      | from  | to    |
| ---------------------------- | ----- | ----- |
| @vanilla-extract/vite-plugin | 4.0.4 | 4.0.6 |
| vite                         | 5.1.4 | 5.1.5 |

## [0.6.0](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.5.1...0.6.0) (2024-03-04)

### Features

- Support for Japanese in settings tab (PR: [#72](https://github.com/0918nobita/obsidian-zhongwen-block/pull/72))

## [0.5.1](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.5.0...0.5.1) (2024-03-02)

- Migrate `typescript-eslint` from v6 to v7 (flat config) (PR: [#69](https://github.com/0918nobita/obsidian-zhongwen-block/pull/69))

### Update dependencies

| package                      | from   | to     |
| ---------------------------- | ------ | ------ |
| @vanilla-extract/vite-plugin | 3.9.5  | 4.0.4  |
| pinyin-pro                   | 3.19.3 | 3.19.6 |
| vite                         | 5.0.12 | 5.1.4  |

## [0.5.0](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.4.1...0.5.0) (2024-01-28)

- Refactor code block processor (PR: [#52](https://github.com/0918nobita/obsidian-zhongwen-block/pull/52))

### Update dependencies

| package                      | from   | to     |
| ---------------------------- | ------ | ------ |
| @vanilla-extract/css         | 1.14.0 | 1.14.1 |
| @vanilla-extract/vite-plugin | 3.9.3  | 3.9.5  |
| pinyin-pro                   | 3.18.5 | 3.19.3 |
| vite                         | 5.0.10 | 5.0.12 |

## [0.4.1](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.4.0...0.4.1) (2023-12-30)

- Improve accessibiity of rendered content (PR: [#42](https://github.com/0918nobita/obsidian-zhongwen-block/pull/42))
- Migrate this npm package to fully ESM (PR: [#44](https://github.com/0918nobita/obsidian-zhongwen-block/pull/44) and [#45](https://github.com/0918nobita/obsidian-zhongwen-block/pull/45))

### Update dependencies

| package | from  | to     |
| ------- | ----- | ------ |
| vite    | 4.5.1 | 5.0.10 |

## [0.4.0](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.3.3...0.4.0) (2023-12-27)

- Improve the performance of this plugin's code block processor using memorization (PR: [#36](https://github.com/0918nobita/obsidian-zhongwen-block/pull/36))

## [0.3.3](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.3.2...0.3.3) (2023-12-25)

### Bug Fixes

- Fix a bug that broke the layout of elements drawn off-screen by this plugin (PR: [#32](https://github.com/0918nobita/obsidian-zhongwen-block/pull/32))

## [0.3.2](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.3.1...0.3.2) (2023-12-23)

### Update dependencies

| package                      | from   | to     |
| ---------------------------- | ------ | ------ |
| @vanilla-extract/vite-plugin | 3.9.2  | 3.9.3  |
| pinyin-pro                   | 3.18.2 | 3.18.5 |
| typescript                   | 5.3.2  | 5.3.3  |
| vite                         | 4.5.0  | 4.5.1  |

## [0.3.1](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.3.0...0.3.1) (2023-11-28)

### Bug Fixes

- Fix a display bug in Live Preview mode (PR: [#18](https://github.com/0918nobita/obsidian-zhongwen-block/pull/18)) (Issue: [#16](https://github.com/0918nobita/obsidian-zhongwen-block/issues/16)), huge thanks to [@mariomui](https://github.com/mariomui) for helping!

## [0.3.0](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.2.0...0.3.0) (2023-11-13)

### Features

- Add settings tab
- Support for toggling whether each pinyin is always displayed or not from the settings tab

## [0.2.0](https://github.com/0918nobita/obsidian-zhongwen-block/compare/0.1.0...0.2.0) (2023-11-12)

- Refactor DOM manipulation
- Remove dependencies that are no longer needed

## 0.1.0 (2023-11-12)

First release
