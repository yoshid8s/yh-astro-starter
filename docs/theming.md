# テーマの分離

Y&H Astro Starter は、WordPress REST API、Astro Image、記事詳細、カテゴリー、パンくず、関連記事、SEO を共通基盤として持ちます。サイトごとのブランド表現は、この基盤に直接混ぜずテーマとして追加します。

## 共通基盤に置くもの

- WordPress REST API の取得処理と型
- 日本語スラッグを含む動的ルート
- 記事・カテゴリー・関連記事のデータ取得
- Astro Image の最適化設定
- canonical、description、OGP などの SEO
- WordPress 本文（`.wp-content`）の基本スタイル

## テーマに置くもの

- 色、書体、余白、ブレークポイント
- ヘッダー・フッター・ナビゲーション
- トップページの特集表示やカードの見せ方
- サイト名、説明文、固定文言

## JiJi Style の例

`src/styles/themes/jiji-style.css` は、JiJi Style の書体とモノトーン配色を切り出した例です。

JiJi Style 専用レイアウトからこの CSS を読み込み、`<html data-theme="jiji-style">` を指定します。記事カードの 4:3 比率、特集記事の 16:11 比率、ナビゲーションのカテゴリーメニューは、JiJi Style のテーマコンポーネント側に置きます。

旧来の `global-before-tailwind.css` は Tailwind 導入前のスタイルであるため、スターターには取り込みません。
