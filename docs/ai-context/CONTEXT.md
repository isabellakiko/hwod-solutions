# 项目上下文（AI 快速恢复）

> AI 协作记忆文件 - 快速恢复项目上下文，立即开始工作

**最后更新**: 2025-12-02 16:45
**项目阶段**: Phase 1.0 - MVP 已完成
**当前状态**: 已上线运行

---

## TL;DR（30秒速览）

**项目名称**: hwod-solutions（华为OD机试算法题库）
**项目性质**: 静态展示型 Web 应用
**技术栈**: React 19 + Vite 7 + React Router 7
**核心特点**:
- 212 道华为 OD 机试真题
- Java/Python/JavaScript 多语言解答
- 按分值/类型筛选

**开发进度**: MVP 已完成，已部署到 GitHub Pages
**下一步**: 功能增强或后端开发

---

## 项目本质

这是一个 **算法题库复习系统**，主要功能：

- 浏览 212 道华为 OD 机试算法题
- 查看题目描述、示例、解题思路
- 切换查看 Java/Python/JavaScript 代码
- 按分值（100分/200分）筛选
- 按考试类型（A卷/B卷）筛选

**设计理念**:
- 简洁高效的复习体验
- 代码高亮便于阅读
- 响应式设计支持移动端

---

## 当前开发状态

### ✅ 已完成

- 题目数据整理（212 道题）
- 题目列表页面
- 题目详情页面
- 多语言代码切换
- 筛选功能（分值/类型）
- 深色/浅色主题
- GitHub Pages 部署

### 🚧 进行中

- 无

### 📋 待开始

- 搜索功能
- 收藏功能
- 后端 API（可选）
- 用户系统（可选）

---

## 技术栈

### 前端
- **框架**: React 19
- **语言**: JavaScript
- **构建工具**: Vite 7
- **路由**: React Router 7
- **代码高亮**: Prism.js
- **包管理**: npm

### 后端（预留）
- **框架**: 待定
- **语言**: 待定
- **数据库**: 待定

### 部署
- **平台**: GitHub Pages
- **地址**: https://isabellakiko.github.io/hwod-solutions

---

## 目录结构

```
hwod-review/
├── src/
│   ├── components/       # React 组件
│   │   ├── Layout/       # 布局组件
│   │   ├── Problem/      # 题目相关组件
│   │   └── FormattedText/# 文本格式化
│   ├── pages/            # 页面组件
│   ├── data/problems/    # 题目 JSON 数据
│   ├── hooks/            # 自定义 hooks
│   └── styles/           # 全局样式
├── scripts/              # 数据处理脚本
├── docs/                 # 项目文档
├── public/               # 静态资源
└── dist/                 # 构建产物
```

---

## 下一步任务

### 当前焦点
无紧急任务，项目已稳定运行

### 优先级 1（如需迭代）
1. 添加题目搜索功能
2. 添加题目收藏功能

### 优先级 2（长期规划）
1. 后端 API 开发
2. 用户登录系统
3. 学习进度追踪

---

## 协作偏好（重要！必读）

### 开发节奏
- ✅ **每次只执行一步** - 不要一次性做太多改动
- ✅ **说明原因和目的** - 每一步都要解释为什么
- ✅ **等待确认** - 完成一步后等待用户确认

### 设计风格
- ✅ 简洁清晰的界面
- ✅ 代码高亮便于阅读
- ❌ 避免过度设计

### Git 提交规范
```
<type>(<scope>): <subject>

type: feat | fix | docs | refactor | perf | test | chore
```

---

## 快速导航

- [当前进度](CURRENT.md) ⭐
- [开发规范](../development/DEVELOPMENT.md)
- [架构总览](../architecture/OVERVIEW.md)
- [项目愿景](../project/vision.md) ⭐

---

## 快速恢复上下文

```bash
/start              # 快速启动（默认）
/start --full       # 完整启动（首次使用）
/start --bug        # Bug 修复模式
/start --component  # 组件开发模式
```

---

**Token 效率**: ~2500 tokens
**更新频率**: 每周或重大变更时
