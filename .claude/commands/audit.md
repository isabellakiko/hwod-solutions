# 系统健康检查

请执行系统健康检查：

## 1. 依赖检查
```bash
npm outdated
npm audit
```

## 2. 构建检查
```bash
npm run build
```

## 3. 文档完整性
检查以下文档是否存在且内容完整：
- docs/ai-context/CONTEXT.md
- docs/ai-context/CURRENT.md
- docs/development/DEVELOPMENT.md
- docs/architecture/OVERVIEW.md
- docs/project/ROADMAP.md

## 4. 代码质量
- 检查是否有 TODO 注释未处理
- 检查是否有 console.log 遗留
- 检查组件是否有 prop-types 或 TypeScript 定义

## 5. 输出报告
格式：
- 依赖状态: [正常/需更新]
- 构建状态: [成功/失败]
- 文档状态: [完整/缺失项]
- 代码质量: [问题列表]
- 建议操作: [列表]
