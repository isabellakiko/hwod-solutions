# 数据库设计文档

> 数据库 Schema 与设计说明

**数据库**: 待定
**ORM**: 待定
**最后更新**: 2025-12-02
**状态**: 📋 预留（待开发）

---

## 说明

当前项目数据以 JSON 文件形式存储，尚未使用数据库。

本文档预留用于记录未来数据库设计。

---

## 当前数据结构

### 题目数据 (JSON)

```json
{
  "id": "1",
  "title": "题目标题",
  "examType": "A",
  "score": 100,
  "description": "题目描述",
  "inputDesc": "输入说明",
  "outputDesc": "输出说明",
  "examples": [
    {
      "input": "输入示例",
      "output": "输出示例",
      "explanation": "解释"
    }
  ],
  "solution": "解题思路",
  "codes": {
    "java": "Java 代码",
    "python": "Python 代码",
    "javascript": "JavaScript 代码",
    "cpp": "C++ 代码",
    "c": "C 代码"
  }
}
```

---

## 规划中的表结构

### users（用户表）

| 字段 | 类型 | 约束 | 描述 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| email | VARCHAR(255) | UNIQUE, NOT NULL | 邮箱 |
| password_hash | VARCHAR(255) | NOT NULL | 密码哈希 |
| name | VARCHAR(100) | NOT NULL | 用户名 |
| created_at | TIMESTAMP | DEFAULT NOW() | 创建时间 |

### favorites（收藏表）

| 字段 | 类型 | 约束 | 描述 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| user_id | INT | FK → users.id | 用户 ID |
| problem_id | INT | NOT NULL | 题目 ID |
| created_at | TIMESTAMP | DEFAULT NOW() | 收藏时间 |

### progress（进度表）

| 字段 | 类型 | 约束 | 描述 |
|------|------|------|------|
| id | INT | PK, AUTO_INCREMENT | 主键 |
| user_id | INT | FK → users.id | 用户 ID |
| problem_id | INT | NOT NULL | 题目 ID |
| status | ENUM | 'todo','done' | 完成状态 |
| updated_at | TIMESTAMP | ON UPDATE NOW() | 更新时间 |

---

## ER 图（规划）

```
[users] 1 ──── N [favorites]
   │
   └── 1 ──── N [progress]
```

---

## 相关文档

- [API 文档](api.md)
- [开发规范](../DEVELOPMENT.md)
