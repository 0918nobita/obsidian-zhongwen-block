# Obsidian Zhongwen Block

[![README-ja](https://img.shields.io/badge/lang-ja-blue)](https://github.com/0918nobita/obsidian-zhongwen-block/blob/main/README.ja.md)

An Obsidian plugin which provides code blocks with features for Chinese learners

Each Chinese sentence in `zh-cn` code block will be annotated with corresponding pinyin as ruby.

Each Chinese sentence in `zh-hk` code block will be annotated with corresponding jyutping as ruby.

In order to help you remember the pronunciation, each pinyin/jyutping is displayed only while the Chinese sentence is hovered.

![Screen recording](images/screen-recording.gif)

Editing view:

````markdown
```zh-cn
他先去医院，再去学校。
```

彼女はまず病院に行って、次に学校に行きます。
````

Reading view:

(Default)

![Reading view (default)](images/reading-view-default.png)

(On hover)

![Reading view (on hover)](images/reading-view-on-hover.png)

## Settings

### Language

Default: English

This plugin supports English and Japanese.

### Always show pinyin

Default: `false`

When `true`, each pinyin will be displayed from the beginning.

## Attribution

- Zhongwen Block depends on [pinyin-pro](https://github.com/zh-lx/pinyin-pro) in order to convert Chinese into pinyin.
- Zhongwen Block depends on [to-jyutping](https://github.com/CanCLID/to-jyutping) in order to convert Chinese into jyutping.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2F0918nobita%2Fobsidian-zhongwen-block.svg?type=large&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2F0918nobita%2Fobsidian-zhongwen-block?ref=badge_large&issueType=license)

## Development

### Install dependencies

```bash
$ bun i
```

### Build

```bash
$ bun run build
```

### Lint

```bash
$ bun run lint
```

### Format

```bash
$ bun run format
```


### Test

```bash
$ bun test
```
