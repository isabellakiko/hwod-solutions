# 开发会话结束

请执行会话收尾流程：

## 1. 进度总结
列出本次会话完成的所有任务

## 2. 代码提交
```bash
git status
git add -A
git commit -m "feat: [本次主要变更描述]"
```

## 3. 更新文档
- 更新 `docs/ai-context/CURRENT.md` 添加今日记录
- 如有架构变更，更新 `docs/ai-context/CONTEXT.md`

## 4. 会话报告
输出：
- 完成任务清单
- 未完成/待续任务
- 下次启动时的注意事项
