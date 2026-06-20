# Ministry Hub Library Redesign

ライブラリ部分を再設計した版です。

- 配布物・動画・ホワイトボードのサムネイルを `app.js` に埋め込み済み
- `assets/thumbs` や日本語フォルダの公開パスに依存しません
- GitHub Pagesで画像フォルダが読めなくてもサムネイルが表示されます
- 既存の localStorage / Firebase データ構造は維持します

アップロード方法:
1. ZIPを解凍
2. 中身をリポジトリ直下へ全部上書き
3. Commit
4. Pages反映後、`?v=library-redesign1` を付けて確認
