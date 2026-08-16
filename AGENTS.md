# 自己紹介LP のルール（AIエージェント共通）

中川碧偉の個人プロフィールサイト。**GitHub Pages で公開中**：https://nakagawaaoi.github.io/

> **このファイル（`AGENTS.md`）が実体。** `CLAUDE.md` と `GEMINI.md` はここへのシンボリックリンク。
> 1つ直せば Claude Code / Antigravity(agy) / Gemini 全部に反映される。

---

## 構成

- `index.html` … **これ1本にすべてが入っている**（HTML・CSS・JavaScript・翻訳辞書、約1,900行）
- `profile_photo.jpg` … プロフィール写真（691×800 / 65KB）
- `deploy_lp.py` … WordPress へも配信するスクリプト（`.env` に認証情報。**コミット禁止**）

---

## 【最重要】3言語対応 — 1箇所直すと4箇所

日本語・英語・中国語の3言語。要素に `data-i18n="キー名"` が付き、`<script>` 内に `ja: {}` / `en: {}` / `zh: {}` の辞書がある。

**文言を1つ変えるとき、直す場所は4つ：**

1. HTML本文（＝初回表示。JS実行前に見えるもの）
2. `ja: { ... }` の辞書
3. `en: { ... }` の辞書
4. `zh: { ... }` の辞書

**HTMLと`ja`辞書がズレると、言語を切り替えて日本語に戻したときに文章が変わってしまう。**
実際にこの事故が起きていた（見出しが「研究関連職歴」↔「研究職歴・活動実績」で入れ替わる、説明文が短文↔長文で別物になる等）。

### 変更後に必ず走らせる検証

```bash
# ① JavaScript構文チェック（辞書を壊すとページ全体が真っ白になる）
node -e "const fs=require('fs');const h=fs.readFileSync('index.html','utf8');const s=[...h.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);let b=0;s.forEach(x=>{try{new Function(x)}catch(e){b++;console.log(e.message)}});console.log(b===0?'OK':'NG')"

# ② 3言語すべてにキーが揃っているか
python3 -c "
import re
h=open('index.html',encoding='utf-8').read()
keys=set(re.findall(r'data-i18n=\"([^\"]+)\"',h))
for lang in ['ja','en','zh']:
    d=set(re.findall(r'^\s*(\w+):',re.search(lang+r': \{(.*?)\n            \}',h,re.S).group(1),re.M))
    print(lang, sorted(keys-d) or 'OK')
"
```

③ ブラウザで **EN → ZH → JA と切り替えて、日本語が元に戻ること**を目で見る。

### 過去に起きた翻訳バグ（同じ轍を踏まない）

- 日本語の助詞「の」が **` of `** に化けていた（一括置換の事故と思われる）
- 中国語の文中に日本語の「の」やカタカナがそのまま残っていた（8箇所）
- 日本語辞書だけキーが欠けていて、他言語から戻すと前の言語の文が残っていた

---

## 公開してよい情報の線引き

- **査読前の研究内容は載せない。** 手法・結果・対象国・評価指標などの中身は、
  プロシーディングやジャーナルが公開されるまで出さない。
- 載せてよいのは、研究の**名前**と**受託元**まで（例：APOからの受託研究名）。
- 学会で発表済みのタイトルは公開情報なので載せてよい。

---

## 画像

- **リポジトリ内に実体をコピーして置く。** `~/Downloads` などを参照しない（元を消すと壊れる）。
- 原本は大きいので必ず縮小・圧縮してから入れる（目安：長辺800〜1600px、100KB以下）。
  ```bash
  sips -Z 800 -s format jpeg -s formatOptions 82 元画像.jpg --out profile_photo.jpg
  ```
- `<img>` に CSS の `width` を指定するときは **`height: auto;` も必ず付ける**。
  HTMLの `height` 属性が優先されて縦に伸びる事故が起きる。

---

## git 運用

- コミットメッセージの目印（どちらのツールが変更したか履歴で分かるように）：
  - Antigravity → 先頭に `[Antigravity]`
  - Claude Code → `Auto-commit via Claude Code: <変更内容>`
- **コミットはこまめに、push はまとめて1回。** push するたび GitHub Pages のビルドが走る。
- **push = 公開。** 試行錯誤の途中では push しない。ユーザーに一度見せてから。
- `git push --force` / `git reset --hard` / ブランチ削除は必ず事前確認。
- `.env` や認証情報は絶対にコミットしない。

---

## 注意

- このフォルダは Google Drive の同期下。`.git` と常時同期は相性が悪い。push できていれば GitHub 側に本体がある。
- ローカル確認は `python3 -m http.server 8777` を立ててから `http://localhost:8777/` を開く
  （`file://` はブラウザ拡張がブロックする）。確認が終わったらサーバーを止める。
