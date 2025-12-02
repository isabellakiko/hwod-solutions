# 开发规范

> 项目开发规范与约定

**最后更新**: 2025-12-02

---

## 目录结构

```
src/
├── components/           # 可复用组件
│   ├── Layout/           # 布局组件（Header, Sidebar, Layout）
│   ├── Problem/          # 题目组件（ProblemList）
│   └── FormattedText/    # 文本格式化组件
├── pages/                # 页面组件
│   ├── Home.jsx          # 首页（题目列表）
│   └── ProblemDetail.jsx # 题目详情页
├── data/                 # 静态数据
│   └── problems/         # 题目 JSON 文件
├── hooks/                # 自定义 Hooks
│   └── useTheme.js       # 主题切换
└── styles/               # 全局样式
    └── variables.css     # CSS 变量
```

---

## 命名规范

### 文件命名
- **组件**: PascalCase（如 `ProblemList.jsx`）
- **样式**: 与组件同名（如 `ProblemList.css`）
- **Hooks**: camelCase + use 前缀（如 `useTheme.js`）
- **数据**: 小写数字（如 `1.json`, `212.json`）

### 变量命名
- **组件**: PascalCase（如 `ProblemList`）
- **函数**: camelCase（如 `handleClick`）
- **常量**: UPPER_SNAKE_CASE（如 `MAX_COUNT`）

---

## 组件规范

### 组件结构
```jsx
// 1. 导入
import React from 'react';
import './Component.css';

// 2. 组件定义
function Component({ prop1, prop2 }) {
  // 3. Hooks
  const [state, setState] = useState();

  // 4. 事件处理
  const handleClick = () => {};

  // 5. 渲染
  return (
    <div className="component">
      {/* JSX */}
    </div>
  );
}

// 6. 导出
export default Component;
```

### 样式规范
- 使用 CSS Modules 或独立 CSS 文件
- 类名使用 kebab-case（如 `.problem-list`）
- 使用 CSS 变量统一主题

---

## Git 规范

### Commit Message
```
<type>(<scope>): <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Type 类型
| Type | 描述 | 示例 |
|------|------|------|
| `feat` | 新功能 | feat(search): 添加搜索功能 |
| `fix` | Bug 修复 | fix(detail): 修复代码高亮 |
| `docs` | 文档更新 | docs: 更新 README |
| `refactor` | 重构 | refactor(list): 优化列表渲染 |
| `perf` | 性能优化 | perf: 优化图片加载 |
| `chore` | 构建/工具 | chore: 更新依赖 |

---

## 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 代码检查
npm run lint

# 部署到 GitHub Pages
npm run deploy
```

---

## 相关文档

- [组件文档](frontend/components.md)
- [页面文档](frontend/pages.md)
- [问题排查](frontend/troubleshooting.md)
- [后端 API](backend/api.md)（预留）
