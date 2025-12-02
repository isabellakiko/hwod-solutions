/**
 * 诊断题目数据质量问题
 * 识别需要手动修复的题目
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROBLEMS_DIR = path.join(__dirname, '..', 'src', 'data', 'problems');

function diagnose() {
  const files = fs.readdirSync(PROBLEMS_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');

  const issues = {
    missingExampleOutput: [],
    missingExamples: [],
    duplicateSolution: [],
    missingSolution: [],
    missingCode: [],
    shortDescription: [],
  };

  for (const file of files) {
    const filePath = path.join(PROBLEMS_DIR, file);
    const problem = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const id = problem.id;

    // 检查示例
    if (!problem.examples || problem.examples.length === 0) {
      issues.missingExamples.push({ id, title: problem.title });
    } else {
      // 检查示例输出是否缺失
      const hasEmptyOutput = problem.examples.some(ex => !ex.output || ex.output.trim() === '');
      if (hasEmptyOutput) {
        issues.missingExampleOutput.push({ id, title: problem.title });
      }
    }

    // 检查解题思路是否有重复内容
    if (problem.solution) {
      // 简单检测：如果解题思路中有大段重复文本
      const lines = problem.solution.split('\n');
      const seen = new Set();
      let hasDuplicate = false;
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.length > 30 && seen.has(trimmed)) {
          hasDuplicate = true;
          break;
        }
        if (trimmed.length > 30) seen.add(trimmed);
      }
      if (hasDuplicate) {
        issues.duplicateSolution.push({ id, title: problem.title });
      }
    } else {
      issues.missingSolution.push({ id, title: problem.title });
    }

    // 检查代码
    const missingLangs = [];
    if (!problem.codes?.java) missingLangs.push('Java');
    if (!problem.codes?.python) missingLangs.push('Python');
    if (missingLangs.length > 0) {
      issues.missingCode.push({ id, title: problem.title, missing: missingLangs });
    }

    // 检查描述是否过短
    if (!problem.description || problem.description.length < 50) {
      issues.shortDescription.push({ id, title: problem.title });
    }
  }

  console.log('==================== 诊断报告 ====================\n');
  console.log(`共检查 ${files.length} 道题目\n`);

  console.log(`\n📋 示例输出缺失 (${issues.missingExampleOutput.length} 题):`);
  issues.missingExampleOutput.slice(0, 10).forEach(p => console.log(`  #${p.id}: ${p.title}`));
  if (issues.missingExampleOutput.length > 10) console.log(`  ... 还有 ${issues.missingExampleOutput.length - 10} 题`);

  console.log(`\n📋 完全没有示例 (${issues.missingExamples.length} 题):`);
  issues.missingExamples.slice(0, 10).forEach(p => console.log(`  #${p.id}: ${p.title}`));
  if (issues.missingExamples.length > 10) console.log(`  ... 还有 ${issues.missingExamples.length - 10} 题`);

  console.log(`\n📋 解题思路有重复内容 (${issues.duplicateSolution.length} 题):`);
  issues.duplicateSolution.slice(0, 10).forEach(p => console.log(`  #${p.id}: ${p.title}`));
  if (issues.duplicateSolution.length > 10) console.log(`  ... 还有 ${issues.duplicateSolution.length - 10} 题`);

  console.log(`\n📋 缺少解题思路 (${issues.missingSolution.length} 题):`);
  issues.missingSolution.slice(0, 10).forEach(p => console.log(`  #${p.id}: ${p.title}`));
  if (issues.missingSolution.length > 10) console.log(`  ... 还有 ${issues.missingSolution.length - 10} 题`);

  console.log(`\n📋 缺少Java或Python代码 (${issues.missingCode.length} 题):`);
  issues.missingCode.slice(0, 10).forEach(p => console.log(`  #${p.id}: ${p.title} (缺: ${p.missing.join(', ')})`));
  if (issues.missingCode.length > 10) console.log(`  ... 还有 ${issues.missingCode.length - 10} 题`);

  console.log('\n==================== 统计 ====================');
  console.log(`示例输出缺失: ${issues.missingExampleOutput.length}`);
  console.log(`完全没有示例: ${issues.missingExamples.length}`);
  console.log(`解题思路重复: ${issues.duplicateSolution.length}`);
  console.log(`缺少解题思路: ${issues.missingSolution.length}`);
  console.log(`缺少代码: ${issues.missingCode.length}`);

  // 保存问题列表
  const reportPath = path.join(__dirname, 'diagnosis-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(issues, null, 2), 'utf-8');
  console.log(`\n✅ 详细报告已保存到: ${reportPath}`);
}

diagnose();
