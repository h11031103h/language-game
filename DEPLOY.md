# GitHub Pages でデプロイ（無料・GitHubアカウントのみ）

## 手順

### 1. リポジトリを作成

1. GitHub で [New repository](https://github.com/new) を開く
2. リポジトリ名: **language-game**
3. Public で作成

### 2. コードを push

```bash
cd language-game
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/h11031103h/language-game.git
git push -u origin main
```

### 3. GitHub Pages を有効化

1. リポジトリの **Settings** → **Pages**
2. **Source**: GitHub Actions を選択

### 4. デプロイ

push すると自動でビルド＆デプロイされます。

**公開URL:** https://h11031103h.github.io/language-game/

---

## リポジトリ名を変える場合

`vite.config.ts` の `base` を変更してください。

```ts
base: "/あなたのリポジトリ名/",
```
