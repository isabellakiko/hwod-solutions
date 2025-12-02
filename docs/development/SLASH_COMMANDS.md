# Slash Commands 使用指南

> AI 协作命令速查

**最后更新**: 2025-12-02

---

## 命令总览

| 命令 | 用途 | 使用频率 | 常用参数 |
|------|------|----------|----------|
| `/start` | 恢复项目记忆 | 每次会话开始 | `--full`, `--bug` |
| `/checkpoint` | 阶段性保存进度 | 完成一个功能后 | `--commit` |
| `/end` | 每日结束 | 每天结束时 | `--push` |
| `/weekly` | 每周文档优化 | 每周日 | `--push` |
| `/monthly` | 每月归档 | 每月初 | `--push` |
| `/audit` | 项目健康检查 | 每周/每月 | `--quick`, `--full` |

---

## 每日工作流

```
开始会话
    ↓
/start              → 恢复项目上下文
    ↓
开发功能 A
    ↓
/checkpoint         → 保存阶段进度
    ↓
开发功能 B
    ↓
/end --push         → 每日结束，推送代码
```

---

## 命令详解

### /start - 恢复项目记忆

```bash
/start              # 快速启动（读取 CONTEXT.md + CURRENT.md）
/start --full       # 完整启动（读取所有核心文档）
/start --bug        # Bug 修复模式（额外读取 troubleshooting）
/start --component  # 组件开发模式（额外读取 components.md）
```

### /checkpoint - 阶段性保存

```bash
/checkpoint         # 更新 CURRENT.md，询问是否 commit
/checkpoint --commit # 自动创建 commit
/checkpoint --skip-git # 跳过 Git 操作
```

### /end - 每日结束

```bash
/end                # 完整更新文档，询问是否推送
/end --push         # 自动推送到远程
/end --no-push      # 不推送
```

### /weekly - 每周优化

```bash
/weekly             # 优化文档，删除冗余
/weekly --push      # 优化后自动推送
```

### /monthly - 每月归档

```bash
/monthly            # 归档 CURRENT.md，创建新模板
/monthly --push     # 归档后自动推送
```

### /audit - 项目健康检查

```bash
/audit              # 标准检查
/audit --quick      # 快速检查（2-3 分钟）
/audit --full       # 完整检查（含构建测试）
/audit --security   # 安全漏洞扫描
```

---

## 最佳实践

| DO ✅ | DON'T ❌ |
|-------|----------|
| 每次会话开始执行 `/start` | 跳过 `/start` 直接开发 |
| 每次结束执行 `/end` | 不更新文档就离开 |
| 每周执行 `/weekly` | 让 CURRENT.md 膨胀 |
| 首次使用 `/start --full` | 首次只用 `/start` |

---

## 相关文档

- [CONTEXT.md](../ai-context/CONTEXT.md) - 项目上下文
- [CURRENT.md](../ai-context/CURRENT.md) - 当前进度
