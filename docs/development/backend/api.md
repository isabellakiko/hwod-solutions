# 后端 API 文档

> 后端 API 接口快速参考

**框架**: 待定
**Base URL**: 待定
**最后更新**: 2025-12-02
**状态**: 📋 预留（待开发）

---

## 说明

当前项目为纯前端静态应用，后端 API 尚未开发。

本文档预留用于记录未来后端 API 设计。

---

## 规划中的 API

### 用户模块（规划中）

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | /api/auth/login | 用户登录 |
| POST | /api/auth/register | 用户注册 |
| GET | /api/user/profile | 获取用户信息 |

### 题目模块（规划中）

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | /api/problems | 获取题目列表 |
| GET | /api/problems/:id | 获取题目详情 |
| POST | /api/problems/:id/favorite | 收藏题目 |

### 进度模块（规划中）

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | /api/progress | 获取学习进度 |
| POST | /api/progress/:id/complete | 标记题目完成 |

---

## 相关文档

- [数据库设计](database.md)
- [开发规范](../DEVELOPMENT.md)
