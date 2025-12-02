# 前端页面文档

> 页面组件快速参考

**最后更新**: 2025-12-02

---

## 页面概览

| 页面 | 路径 | 路由 | 描述 |
|------|------|------|------|
| Home | `pages/Home.jsx` | `/` | 题目列表首页 |
| ProblemDetail | `pages/ProblemDetail.jsx` | `/problem/:id` | 题目详情页 |

---

## Home 页面

**路径**: `src/pages/Home.jsx`
**路由**: `/`

**描述**: 题目列表首页，展示所有题目

**功能**:
- 显示题目列表
- 支持按分值筛选
- 支持按考试类型筛选
- 点击跳转到详情页

**状态**:
- `problems`: 题目数据数组
- `filter`: 当前筛选条件

---

## ProblemDetail 页面

**路径**: `src/pages/ProblemDetail.jsx`
**路由**: `/problem/:id`

**描述**: 题目详情页，展示题目完整信息

**功能**:
- 显示题目描述
- 显示输入/输出说明
- 显示示例用例
- 显示解题思路
- 多语言代码切换（Java/Python/JavaScript）
- 代码高亮显示

**状态**:
- `problem`: 当前题目数据
- `activeLanguage`: 当前选中的语言

**URL 参数**:
| 参数 | 描述 |
|------|------|
| id | 题目 ID（1-212） |

---

## 路由配置

```jsx
// App.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/problem/:id" element={<ProblemDetail />} />
</Routes>
```

---

## 页面数据流

```
URL 变化
    ↓
React Router 匹配路由
    ↓
加载对应页面组件
    ↓
从 JSON 文件获取数据
    ↓
渲染页面内容
```

---

## 相关文档

- [组件文档](components.md)
- [开发规范](../DEVELOPMENT.md)
