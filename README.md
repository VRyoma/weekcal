# 週間スケジュール画像メーカー

週間スケジュールを美しい画像として生成できるWebアプリケーションです。SNSでのシェアや印刷に最適な高品質な画像を作成できます。

## 🌟 特徴

- **豊富なカラーテーマ**: ライトモード・ダークモード合わせて16種類のテーマから選択可能
- **カスタマイズ可能**: メインタイトル、各曜日の予定、メッセージ欄を自由に編集
- **祝日対応**: 平日を祝日として設定可能（色分け表示）
- **キャラクター画像**: お気に入りの画像をアップロードして配置可能
- **リアルタイムプレビュー**: 編集内容が即座にプレビューに反映
- **データ保存**: ブラウザのローカルストレージに自動保存
- **高品質出力**: 1920x1080の高解像度画像として出力
- **SNSシェア**: Xへの直接シェア機能

## 🚀 使い方

1. **テーマ選択**: お好みのカラーテーマを選択
2. **タイトル設定**: メインタイトルを入力
3. **スケジュール入力**: 各曜日の予定を入力
4. **祝日設定**: 必要に応じて平日を祝日として設定
5. **メッセージ追加**: 週の目標や一言メッセージを入力
6. **画像アップロード**: キャラクター画像をアップロード（オプション）
7. **ダウンロード**: 完成した画像をダウンロードまたはSNSでシェア

## 🛠️ 技術スタック

- **フロントエンド**: HTML5, CSS3, JavaScript (ES6+)
- **スタイリング**: Tailwind CSS
- **画像生成**: HTML5 Canvas API
- **デプロイ**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📁 プロジェクト構成

```
.
├── public/
│   ├── index.html          # メインHTMLファイル
│   └── script.js           # JavaScriptロジック
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions設定
├── docker-compose.yml      # Docker設定
├── nginx.conf             # Nginx設定
└── README.md              # このファイル
```

## 🐳 ローカル開発

### Docker Composeを使用

```bash
docker-compose up -d
```

アプリケーションは `http://localhost` でアクセス可能です。

### 直接ファイルを開く

`public/index.html` をブラウザで直接開くことも可能です。

## 🌐 デプロイ

このプロジェクトはGitHub Pagesに自動デプロイされます。

1. `main` ブランチにプッシュ
2. GitHub Actionsが自動実行
3. `public` フォルダの内容がGitHub Pagesにデプロイ

## 🎨 カスタマイズ

### テーマの追加

`script.js` の `themes` オブジェクトに新しいテーマを追加できます：

```javascript
const themes = {
  // 既存のテーマ...
  customTheme: {
    bg: '#背景色',
    text: '#テキスト色',
    accent: '#アクセント色',
    border: '#ボーダー色',
    primary: '#プライマリ色'
  }
};
```

### 曜日の設定変更

`days` 配列を編集して曜日の表示をカスタマイズできます。

## 📱 対応ブラウザ

- Chrome (推奨)
- Firefox
- Safari
- Edge

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🔗 リンク

- [ライブデモ](https://weekcal.vvil.jp)
- [GitHub Pages](https://vryoma.github.io/weekcal)

---

**週間スケジュール画像メーカー** - あなたの週間スケジュールを美しい画像に ✨