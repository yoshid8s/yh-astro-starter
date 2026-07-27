# Y&H Astro Starter

WordPress を Headless CMS として利用し、Astro 7、Tailwind CSS 4、Astro Image で Web サイトを開発するための、Y&H の再利用可能なスターターです。

最初の実装・検証サイトは [JiJi Style](https://style.yh-inc.jp/) です。WordPress REST API 接続、トップページ、記事詳細、Astro Image、日本語スラッグ対応までを検証済みとし、ここから汎用化していきます。

## 技術構成

- Astro 7
- Tailwind CSS 4
- Astro Image
- WordPress REST API（Headless CMS）
- TypeScript
- pnpm

## 目標

WordPress の編集性を維持しながら、Astro による高速な表示、柔軟なデザイン、画像最適化を備えたサイトを、案件ごとに再利用できる形で構築します。

このスターターは、特定サイトのデザインや記事データではなく、複数サイトに共通する実装方針・コンポーネント・データ取得処理を蓄積する場所です。

## 現在の検証済み範囲

- WordPress REST API からの記事取得
- 記事一覧（トップページ）
- 記事詳細ページ
- 日本語を含む WordPress スラッグのルーティング
- Astro Image による画像最適化
- Tailwind CSS 4 によるスタイリング

## 次の実装

優先順と完了条件は [開発ロードマップ](docs/roadmap.md) にまとめています。

1. カテゴリーページ
2. パンくずリスト
3. 関連記事
4. SEO 共通化
5. OP / Content Attestation コンポーネント

## 想定する構成

```text
src/
├── components/       # サイト共通 UI
├── layouts/          # 共通レイアウト
├── lib/
│   ├── wordpress/    # REST API クライアント・型・取得処理
│   └── seo/          # メタデータ生成
├── pages/            # Astro のルーティング
├── styles/           # 共通スタイル・Tailwind の入口
└── types/            # 共有型定義
```

## 開発を始めるには

Astro プロジェクトを初期化後、環境変数で WordPress REST API のベース URL を指定します。

```bash
pnpm install
pnpm dev
```

サイト固有の WordPress URL、サイト名、OGP の初期値などは、環境変数または設定ファイルに分離します。実際の変数名・セットアップ手順は、初期実装と同時に確定します。

## 運用方針

- WordPress は記事作成・メディア管理に集中する
- 表示・ルーティング・画像最適化は Astro 側で担う
- 共通機能は特定サイトに依存しない名前と構造で実装する
- 実装は小さな単位で Issue / Draft PR に分けて検証する

## ライセンス

ライセンスは、外部公開・再利用の条件を整理したうえで設定します。
