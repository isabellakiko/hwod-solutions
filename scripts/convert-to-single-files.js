/**
 * 将 problems.json 转换为单文件结构
 * 生成:
 * - src/data/problems/index.json (索引文件)
 * - src/data/problems/{id}.json (每个题目的单独文件)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const PROBLEMS_DIR = path.join(DATA_DIR, 'problems');

async function main() {
  // 读取现有的 problems.json
  const problemsPath = path.join(DATA_DIR, 'problems.json');
  if (!fs.existsSync(problemsPath)) {
    console.error('❌ problems.json 不存在');
    process.exit(1);
  }

  const problems = JSON.parse(fs.readFileSync(problemsPath, 'utf-8'));
  console.log(`📖 读取到 ${problems.length} 道题目`);

  // 确保输出目录存在
  if (!fs.existsSync(PROBLEMS_DIR)) {
    fs.mkdirSync(PROBLEMS_DIR, { recursive: true });
  }

  // 生成索引文件
  const index = problems.map(p => ({
    id: p.id,
    title: p.title,
    examType: p.examType,
    score: p.score,
    hasExamples: p.examples && p.examples.length > 0,
    hasSolution: !!p.solution,
    hasCodes: {
      java: !!p.codes?.java,
      python: !!p.codes?.python,
      javascript: !!p.codes?.javascript,
      cpp: !!p.codes?.cpp,
      c: !!p.codes?.c
    }
  }));

  // 写入索引文件
  const indexPath = path.join(PROBLEMS_DIR, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');
  console.log(`✅ 索引文件已生成: ${indexPath}`);

  // 写入每个题目的单独文件
  let created = 0;
  let skipped = 0;

  for (const problem of problems) {
    const filePath = path.join(PROBLEMS_DIR, `${problem.id}.json`);

    // 如果文件已存在，跳过（保留手动修复的内容）
    if (fs.existsSync(filePath)) {
      skipped++;
      continue;
    }

    fs.writeFileSync(filePath, JSON.stringify(problem, null, 2), 'utf-8');
    created++;
  }

  console.log(`\n📊 结果:`);
  console.log(`  新建: ${created} 个文件`);
  console.log(`  跳过: ${skipped} 个文件 (已存在)`);
  console.log(`\n💡 接下来请逐一核查每个题目文件，修复问题后保存`);
}

main().catch(console.error);
