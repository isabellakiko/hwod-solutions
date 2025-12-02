# 前端问题排查

> 常见问题与解决方案

**最后更新**: 2025-12-02

---

## 构建问题

### 问题 1: JSON 解析失败

**现象**:
```
error during build: Failed to parse JSON file, invalid JSON syntax
```

**原因**: JSON 文件格式错误，通常是：
- 字符串中包含未转义的引号
- 字符串中包含换行符未用 `\n` 转义
- 末尾多余的逗号

**解决方案**:
1. 定位报错的 JSON 文件
2. 检查 `solution` 等长文本字段
3. 确保特殊字符正确转义
4. 使用 JSON 验证工具检查语法

---

### 问题 2: 部署后 404

**现象**: GitHub Pages 部署后，刷新页面显示 404

**原因**: React Router 使用 BrowserRouter，但 GitHub Pages 不支持 SPA 路由

**解决方案**:
1. 使用 HashRouter 替代 BrowserRouter
2. 或添加 404.html 重定向脚本

---

## 代码高亮问题

### 问题 3: 代码不高亮

**现象**: 代码块没有语法高亮

**原因**: Prism.js 未正确加载或语言未注册

**解决方案**:
1. 确保导入 Prism CSS
2. 确保导入对应语言组件
```jsx
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
```

---

## 样式问题

### 问题 4: 主题切换不生效

**现象**: 点击主题切换按钮无反应

**原因**: CSS 变量未正确定义或 data-theme 属性未设置

**解决方案**:
1. 检查 `variables.css` 中的变量定义
2. 确保 `useTheme` hook 正确更新 `document.documentElement.dataset.theme`

---

## 性能问题

### 问题 5: 首屏加载慢

**现象**: 首次加载时间过长

**原因**: 所有题目数据一次性加载

**解决方案**:
1. 使用动态导入 `import()`
2. 题目列表只加载基础信息
3. 详情页再加载完整数据

---

## 快速诊断命令

```bash
# 检查构建是否成功
npm run build

# 本地预览构建结果
npm run preview

# 代码检查
npm run lint

# 检查依赖问题
npm ls
```

---

## 相关文档

- [开发规范](../DEVELOPMENT.md)
- [组件文档](components.md)
