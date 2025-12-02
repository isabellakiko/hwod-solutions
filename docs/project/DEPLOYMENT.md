# 部署文档

> 部署流程与配置说明

**最后更新**: 2025-12-02

---

## 部署概览

| 环境 | 平台 | 地址 |
|------|------|------|
| 生产 | GitHub Pages | https://isabellakiko.github.io/hwod-solutions |

---

## GitHub Pages 部署

### 前置条件
- GitHub 仓库已创建
- 已安装 gh-pages 包

### 配置文件

**vite.config.js**:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/hwod-solutions/',
})
```

**package.json**:
```json
{
  "homepage": "https://isabellakiko.github.io/hwod-solutions",
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

### 部署步骤

```bash
# 1. 构建生产版本
npm run build

# 2. 部署到 GitHub Pages
npm run deploy

# 3. 等待 1-2 分钟后访问
```

### 一键部署
```bash
npm run build && npm run deploy
```

---

## 部署验证

### 检查清单
- [ ] 访问地址正常打开
- [ ] 路由跳转正常
- [ ] 样式加载正确
- [ ] 代码高亮正常
- [ ] 主题切换正常

### 常见问题

**问题 1: 404 错误**
- 检查 `base` 配置是否正确
- 确认 GitHub Pages 设置为 gh-pages 分支

**问题 2: 样式丢失**
- 检查 CSS 文件是否正确打包
- 检查路径是否包含 base 前缀

**问题 3: 刷新后 404**
- React Router 使用 HashRouter
- 或添加 404.html 重定向

---

## 自动化部署（可选）

### GitHub Actions

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 相关文档

- [开发规范](../development/DEVELOPMENT.md)
- [问题排查](../development/frontend/troubleshooting.md)
