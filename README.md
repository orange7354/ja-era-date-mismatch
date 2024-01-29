# textlint-rule-ja-era-date-mismatch

# 開発中

このtextlintルールは、文書内で西暦と和暦（元号）が正しく対応していない場合を検出します。
西暦と和暦の間に矛盾がある場合、このルールによって指摘されます。

例
```
誤り)2016年(平成12年)は良い年だった。
```


## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-ja-era-date-mismatch

## Usage

Via `.textlintrc.json`(Recommended)

```json
{
    "rules": {
        "ja-era-date-mismatch": true
    }
}
```

Via CLI

```
textlint --rule ja-era-date-mismatch README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

ISC © 
