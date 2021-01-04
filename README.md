# 開発環境構築（npm scripts）

## install
```zsh
npm install
```

## dev
```zsh
npm run dev
```
- サーバー立ち上げ
- ファイル変更監視

## build
```zsh
npm run build
```

# 解説

## pug2html

src 配下の pug ファイルを html ファイルにコンパイル

```zsh
npm i github:pugjs/pug-cli#master -D
```
`npm i pug-cli` でインストールした `pug-cli` で pug をコンパイルすると、_がついたファイルやディレクトリもコンパイルされてしまう。  
現在 npm にあがっている `pug-cli 1.0.0-alpha6` に問題があるため、インストール先を変更。  
参考：https://qiita.com/soarflat/items/48cec8fb19252a3fc4ad

### Options
- `--hierarchy`：ディレクトリ構造を保つ
- `-P (--Pretty)`：インデントを保つ

---

## scss2css

src/assets/scss 配下の scss ファイルを css ファイルにコンパイル

```zsh
npm i sass -D
```
DartSass の npm である `sass` をインストール。  
LibSass が Sass の公式ブログで非推奨宣言されたことや、近い将来 SASS の `@import` が廃止され `@use` に置き換わることから、今回は DartSass を採用。  
参考：https://blog.photosynthesic.jp/2020/11/libsass-to-dartsass/

### Options
- `--style=compressed`：圧縮
- `--no-charset`：`@charset` を自動出力しない
- `--no-source-map`：ソースマップなし

---

## autoprefixer

`postcss-cli` は、CSSを変換できるツール PostCSS をコマンドから利用できるパッケージで、`autoprefixer` は、その PostCSS でベンダープレフィックスを追加できるプラグイン。  
参考）postcss-cli 公式：https://www.npmjs.com/package/postcss-cli

```zsh
npm i postcss postcss-cli autoprefixer -D
```

### Options
- `-u (--use)`： 使用するプラグインの指定
- `--no-map`：ソースマップなし
- `--replace`：既存のファイルに上書き

---

## babel

```zsh
npm i @babel/cli @babel/core @babel/preset-env babel-core -D
```
今回は最新の Babel 7 を導入。`babel-preset-es2015` は非推奨となっているため、`@babel/preset-env` をインストール。  
Babel 6 までは `babel-cli`、Babel 7 以降は `@babel/cli` を使用するようだが、`@babel/cli` のみのインストールだと、以下のエラーが発生する。
```zsh
Requires Babel "^7.0.0-0", but was loaded with "6.26.3".
```
そのため、`babel-core@7.0.0-bridge.0` を併せてインストールし、エラーを回避する。  
参考：  
https://qiita.com/kazmaw/items/45a1b2f5c58f0dd8afd4
https://mae.chab.in/archives/2845#post2845-5
https://qiita.com/soarflat/items/21b8955f992bf7d38581  

```zsh
npm i core-js@3 regenerator-runtime -D
```
また、`@babel/polyfill` が非推奨となったため、`@babel/preset-env` の `useBuiltIns` を利用して、`core-js@3` から必要な polyfill のみを import する。  
（`core-js` などを import すると、利用していない不要な polyfill も import されてしまい、トランスパイル後のファイルサイズが非常に大きくなってしまう。）  
`regenerator-runtime` は async/await を利用するために必要な polyfill。  
参考：https://qiita.com/soarflat/items/21b8955f992bf7d38581  

### Options
- `--out-dir (--d)`：出力先ディレクトリの指定

---

## 変更監視

```zsh
npm i chokidar-cli -D
```
`witch` と `chokidar` を npm trends で比較し、 利用者数が多い `chokidar` を採用。  
`chokidar-cli` はファイルの変更を監視するモジュール `chokidar` のコマンドライン版。

### Options
- `-c (--command)`：監視しているファイルやディレクトリで変更が起きた際に走らせるコマンドを指定

---

## 画像圧縮

```zsh
npm i imagemin imagemin-keep-folder imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D
```
`imagemin-keep-folder` はディレクトリ構造を維持したまま画像を圧縮するためのモジュール。  
imagemin.js に圧縮処理を記述し、`node imagemin.js` でファイルの内容を実行する。  
参考）imagemin 公式：https://github.com/imagemin/imagemin  
参考：https://techblog.lclco.com/entry/2018/08/31/180000

---

## BrowserSync

```zsh
npm i browser-sync -D
```

### Options
- start：browser-sync を開始
- -s (--server)：サーバを立ち上げるディレクトリを指定（指定がなければ cwd となる）
- f (--files)：監視するディレクトリやファイルを指定  
参考：  
https://cdgrph.com/ja/blog/2017-07-31
https://browsersync.io/docs/command-line

---

## npm-run-all

```zsh
npm i npm-run-all -D
```
script をまとめて実行（直列 / 並列）することができる。  
& と && で記述することもできるが、沢山のタスクをまとめて実行させる記述を楽したいとか少しでも可読性を高くしたい場合に便利。  
参考：https://www.nxworld.net/support-modules-for-npm-scripts-task.html

- npm s：直列実行
- npm-p：並列実行

---

## cpx

```cpx
npm i cpx -D
```
ディレクトリ構造を維持しながらファイルをコピーする。

### Options
- -C：コピー元に存在しないファイルをコピー先のディレクトリから削除

参考：  
https://www.nxworld.net/support-modules-for-npm-scripts-task.html  
https://maku77.github.io/nodejs/npm/npm-run-copy-file.html