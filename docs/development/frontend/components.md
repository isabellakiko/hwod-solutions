# 前端组件文档

> React 组件快速参考

**最后更新**: 2025-12-02

---

## 组件概览

| 组件 | 路径 | 描述 |
|------|------|------|
| Layout | `components/Layout/` | 页面布局容器 |
| Header | `components/Layout/` | 顶部导航栏 |
| Sidebar | `components/Layout/` | 侧边栏（题目筛选） |
| ProblemList | `components/Problem/` | 题目列表 |
| FormattedText | `components/FormattedText/` | Markdown 渲染 |

---

## Layout 组件

**路径**: `src/components/Layout/Layout.jsx`

**描述**: 页面整体布局，包含 Header + Sidebar + 内容区

**Props**: 无

**使用示例**:
```jsx
<Layout>
  <Home />
</Layout>
```

---

## Header 组件

**路径**: `src/components/Layout/Header.jsx`

**描述**: 顶部导航栏，包含 Logo 和主题切换

**Props**: 无

**功能**:
- 显示项目标题
- 深色/浅色主题切换

---

## Sidebar 组件

**路径**: `src/components/Layout/Sidebar.jsx`

**描述**: 侧边栏，提供题目筛选功能

**Props**: 无

**功能**:
- 按分值筛选（100分/200分）
- 按考试类型筛选（A卷/B卷）

---

## ProblemList 组件

**路径**: `src/components/Problem/ProblemList.jsx`

**描述**: 题目列表展示

**Props**:
| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| problems | Array | 是 | 题目数组 |
| filter | Object | 否 | 筛选条件 |

**使用示例**:
```jsx
<ProblemList
  problems={problems}
  filter={{ score: 200, examType: 'B' }}
/>
```

---

## FormattedText 组件

**路径**: `src/components/FormattedText/FormattedText.jsx`

**描述**: Markdown 文本渲染，支持代码高亮

**Props**:
| 属性 | 类型 | 必填 | 描述 |
|------|------|------|------|
| content | String | 是 | Markdown 内容 |

**使用示例**:
```jsx
<FormattedText content={solution} />
```

---

## 组件依赖关系

```
App
└── Layout
    ├── Header
    ├── Sidebar
    └── Routes
        ├── Home
        │   └── ProblemList
        └── ProblemDetail
            └── FormattedText
```

---

## 相关文档

- [页面文档](pages.md)
- [开发规范](../DEVELOPMENT.md)
