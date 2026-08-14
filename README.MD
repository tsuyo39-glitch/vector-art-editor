# Vector Art Editor

ブラウザで動くベクターイラストエディターです。ドットではなくパスで描くタイプで、ビルド不要、GitHub Pages やローカルHTTPサーバーからそのまま使えます。

## 使い方

1. `index.html` または `vector_art_editor.html` をブラウザで開きます。
2. ツールを選んで中央のキャンバスに描画します。
3. 選択ツールでオブジェクトを動かし、右パネルで位置や重ね順を整えます。
4. `SVG保存` または `PNG保存` から書き出します。

## 主な機能

- 選択、ノード編集、ペン、フリーハンド、直線、四角、丸、多角形/星、テキスト
- ベジェ曲線の頂点編集（頂点の移動、追加、削除、ハンドル操作）
- 塗り/線の色、線の太さ、破線、線の端と角、不透明度
- 移動、拡大縮小、回転、左右/上下反転、複製、削除
- 重ね順の変更とキャンバス/選択範囲を基準にした整列
- オブジェクト一覧（表示切替、名前変更、選択）
- ズーム、パン、グリッド表示、グリッドスナップ
- PNG/JPEG/WebP のインポート（オブジェクトとして配置）
- SVG エクスポート、PNG エクスポート（等倍〜4倍）
- 元に戻す/やり直す（60段階）
- manifest と service worker によるホーム画面追加/オフライン起動対応

## ショートカット

| キー | 動作 |
| --- | --- |
| `V` / `N` / `P` / `B` / `L` / `R` / `E` / `G` / `T` | 選択 / ノード編集 / ペン / フリーハンド / 直線 / 四角 / 丸 / 多角形 / テキスト |
| `Delete` | 選択中のオブジェクトを削除 |
| 矢印キー | 1px移動（`Shift`で10px） |
| `Cmd/Ctrl + Z` / `Shift + Cmd/Ctrl + Z` | 元に戻す / やり直す |
| `Cmd/Ctrl + D` | 複製 |
| `Cmd/Ctrl + A` | すべて選択 |
| `[` / `]` | 背面へ / 前面へ |
| `0` | 全体を表示 |
| `Space + ドラッグ` | 画面移動 |
| `Cmd/Ctrl + ホイール` | ズーム |
| `Esc` | 選択解除、ペンの中断 |

描画中の補助キー: `Shift` で正方形・正円・角度固定、`Alt` で中心から描画。ノード編集では `Alt + クリック` で頂点削除、線のダブルクリックで頂点追加。

## ファイル構成

```text
.
├─ index.html
├─ vector_art_editor.html
├─ manifest.webmanifest
├─ service-worker.js
├─ apple-touch-icon.png
├─ vector-icon-192.png
├─ vector-icon-512.png
├─ vector-icon-1024.png
└─ README.MD
```

## 公開

GitHub Pages では `Settings` > `Pages` から `main` ブランチの `/root` を公開元に設定します。トップURLへアクセスすると `index.html` からエディター本体へ移動します。

## 開発

依存パッケージやビルド手順はありません。主要なHTML、CSS、JavaScriptは `vector_art_editor.html` に集約しています。ローカル確認は次のコマンドでHTTPサーバーを立てます。

```bash
python3 -m http.server 8643
```
