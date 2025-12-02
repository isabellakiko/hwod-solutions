/**
 * 单题目提取脚本
 * 用法: node scripts/extract-single.js <文件路径> <题目ID>
 *
 * 提取后会输出到控制台和保存到 src/data/problems/<id>.json
 * 需要手动核查输出内容
 */

import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 从文件名提取元信息
function parseFileName(fileName) {
  const info = { examType: '', score: 0, title: '' };

  if (fileName.includes('A卷') || fileName.includes('2025A') || fileName.includes('2025E')) {
    info.examType = 'A';
  } else if (fileName.includes('B卷') || fileName.includes('2025B')) {
    info.examType = 'B';
  }

  const scoreMatch = fileName.match(/(\d{3})分/);
  if (scoreMatch) info.score = parseInt(scoreMatch[1]);

  let titleMatch = fileName.match(/[-–]\s*(.+?)（/);
  if (titleMatch) {
    info.title = titleMatch[1].trim();
  } else {
    titleMatch = fileName.match(/分[)）]\s*[-–]?\s*(.+?)（/);
    if (titleMatch) info.title = titleMatch[1].trim();
  }

  if (info.title) {
    info.title = info.title.replace(/^\d+\s*/, '').replace(/^[-–]\s*/, '').trim();
  }

  return info;
}

// 将 HTML 转换为可读文本（保留格式标记）
function htmlToText($, element) {
  const el = $(element);
  let result = '';

  el.contents().each((i, node) => {
    if (node.type === 'text') {
      result += node.data;
    } else if (node.type === 'tag') {
      const $node = $(node);
      const tagName = node.tagName.toLowerCase();

      switch (tagName) {
        case 'strong':
        case 'b':
          result += `**${$node.text()}**`;
          break;
        case 'em':
        case 'i':
          result += `*${$node.text()}*`;
          break;
        case 'code':
          result += `\`${$node.text()}\``;
          break;
        case 'br':
          result += '\n';
          break;
        case 'a':
          result += $node.text(); // 忽略链接，只保留文字
          break;
        case 'sub':
          result += `_${$node.text()}`;
          break;
        case 'sup':
          result += `^${$node.text()}`;
          break;
        default:
          result += htmlToText($, node);
      }
    }
  });

  return result.trim();
}

// 处理列表
function processList($, element) {
  const el = $(element);
  const tagName = element.tagName.toLowerCase();
  const items = [];
  let index = 1;

  el.find('> li').each((i, li) => {
    const text = htmlToText($, li);
    if (tagName === 'ol') {
      items.push(`${index}. ${text}`);
      index++;
    } else {
      items.push(`- ${text}`);
    }
  });

  return items.join('\n');
}

// 提取代码
function extractCode($, preElement) {
  const codeEl = $(preElement).find('code');
  let code = '';

  if (codeEl.length > 0) {
    // 克隆并移除UI元素
    code = codeEl.clone().children('div, ul, .hljs-button').remove().end().text();
  } else {
    code = $(preElement).text();
  }

  // 清理
  return code
    .replace(/复制$/gm, '')
    .replace(/^\s*\d+\s*$/gm, '')
    .trim();
}

// 主解析函数
function parseProblem(html, fileName, problemId) {
  const $ = cheerio.load(html);
  const fileInfo = parseFileName(fileName);

  const problem = {
    id: problemId,
    title: fileInfo.title,
    examType: fileInfo.examType,
    score: fileInfo.score,
    description: '',
    inputDesc: '',
    outputDesc: '',
    examples: [],
    solution: '',
    codes: { java: '', python: '', javascript: '', cpp: '', c: '' }
  };

  // 收集所有内容
  const sections = {
    description: [],
    input: [],
    output: [],
    solution: [],
    examples: []
  };

  let currentSection = '';
  let currentExample = null;
  let waitingFor = null; // 'input' | 'output' | null

  // 遍历所有元素
  $('h2, h3, h4, h5, p, pre, ul, ol, blockquote').each((i, el) => {
    const tagName = el.tagName.toLowerCase();
    const $el = $(el);
    const text = $el.text().trim();

    // 检测章节标题
    if (['h2', 'h3', 'h4', 'h5'].includes(tagName)) {
      if (text.includes('题目描述')) {
        currentSection = 'description';
        return;
      }
      if (text.includes('输入描述')) {
        currentSection = 'input';
        return;
      }
      if (text.includes('输出描述')) {
        currentSection = 'output';
        return;
      }
      if (/示例\s*\d*/.test(text)) {
        // 保存之前的示例
        if (currentExample && (currentExample.input || currentExample.output)) {
          problem.examples.push({ ...currentExample });
        }
        currentSection = 'example';
        currentExample = { input: '', output: '', explanation: '' };
        waitingFor = null;
        return;
      }
      if (text.includes('解题思路') || text.includes('思路') || text.includes('解题步骤')) {
        currentSection = 'solution';
        return;
      }
      if (text.includes('注意事项')) {
        currentSection = 'notes'; // 也归入solution
        return;
      }
      if (text === 'Java' || (text.includes('Java') && !text.includes('JavaScript'))) {
        currentSection = 'java';
        return;
      }
      if (text.includes('Python')) {
        currentSection = 'python';
        return;
      }
      if (text.includes('JavaScript') || text === 'JS') {
        currentSection = 'javascript';
        return;
      }
      if (text.includes('C++') || text === 'CPP' || text === 'Cpp') {
        currentSection = 'cpp';
        return;
      }
      if (text === 'C' || text.includes('C语言') || text === 'C 语言') {
        // 确保不是 C++
        if (!text.includes('++')) {
          currentSection = 'c';
          return;
        }
      }
      if (text.includes('完整用例') || text.includes('备注')) {
        currentSection = 'skip';
        return;
      }
    }

    // 根据章节收集内容
    switch (currentSection) {
      case 'description':
        if (tagName === 'p') {
          const content = htmlToText($, el);
          if (content) problem.description += (problem.description ? '\n' : '') + content;
        } else if (tagName === 'ul' || tagName === 'ol') {
          const content = processList($, el);
          if (content) problem.description += (problem.description ? '\n' : '') + content;
        }
        break;

      case 'input':
        if (tagName === 'p') {
          const content = htmlToText($, el);
          if (content) problem.inputDesc += (problem.inputDesc ? '\n' : '') + content;
        } else if (tagName === 'ul' || tagName === 'ol') {
          const content = processList($, el);
          if (content) problem.inputDesc += (problem.inputDesc ? '\n' : '') + content;
        }
        break;

      case 'output':
        if (tagName === 'p') {
          const content = htmlToText($, el);
          if (content) problem.outputDesc += (problem.outputDesc ? '\n' : '') + content;
        } else if (tagName === 'ul' || tagName === 'ol') {
          const content = processList($, el);
          if (content) problem.outputDesc += (problem.outputDesc ? '\n' : '') + content;
        }
        break;

      case 'example':
        if (currentExample) {
          if (tagName === 'p') {
            const lowerText = text.toLowerCase();
            if (lowerText === '输入' || lowerText.startsWith('输入：') || lowerText.startsWith('输入:')) {
              waitingFor = 'input';
              return;
            }
            if (lowerText === '输出' || lowerText.startsWith('输出：') || lowerText.startsWith('输出:')) {
              waitingFor = 'output';
              return;
            }
            if (lowerText === '说明' || lowerText.startsWith('说明：') || lowerText.startsWith('说明:')) {
              waitingFor = 'explanation';
              return;
            }
          }
          if (tagName === 'pre') {
            const code = extractCode($, el);
            if (waitingFor === 'input') {
              currentExample.input = code;
              waitingFor = null;
            } else if (waitingFor === 'output') {
              currentExample.output = code;
              waitingFor = null;
            } else if (!currentExample.input) {
              currentExample.input = code;
            } else if (!currentExample.output) {
              currentExample.output = code;
            }
          }
          if (tagName === 'blockquote' && text) {
            currentExample.explanation = text;
          }
        }
        break;

      case 'solution':
      case 'notes':
        if (tagName === 'p') {
          const content = htmlToText($, el);
          if (content) problem.solution += (problem.solution ? '\n' : '') + content;
        } else if (tagName === 'ul' || tagName === 'ol') {
          const content = processList($, el);
          if (content) problem.solution += (problem.solution ? '\n' : '') + content;
        }
        break;

      case 'java':
        if (tagName === 'pre' && !problem.codes.java) {
          problem.codes.java = extractCode($, el);
        }
        break;

      case 'python':
        if (tagName === 'pre' && !problem.codes.python) {
          problem.codes.python = extractCode($, el);
        }
        break;

      case 'javascript':
        if (tagName === 'pre' && !problem.codes.javascript) {
          problem.codes.javascript = extractCode($, el);
        }
        break;

      case 'cpp':
        if (tagName === 'pre' && !problem.codes.cpp) {
          problem.codes.cpp = extractCode($, el);
        }
        break;

      case 'c':
        if (tagName === 'pre' && !problem.codes.c) {
          problem.codes.c = extractCode($, el);
        }
        break;
    }
  });

  // 保存最后一个示例
  if (currentExample && (currentExample.input || currentExample.output)) {
    problem.examples.push(currentExample);
  }

  return problem;
}

// 主程序
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('用法: node scripts/extract-single.js <文件路径> <题目ID>');
    console.log('示例: node scripts/extract-single.js "/path/to/file.html" 1');
    process.exit(1);
  }

  const [filePath, problemId] = args;

  if (!fs.existsSync(filePath)) {
    console.error(`❌ 文件不存在: ${filePath}`);
    process.exit(1);
  }

  const html = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  const problem = parseProblem(html, fileName, problemId);

  // 输出到控制台
  console.log('\n==================== 提取结果 ====================\n');
  console.log(`ID: ${problem.id}`);
  console.log(`标题: ${problem.title}`);
  console.log(`卷别: ${problem.examType}卷`);
  console.log(`分值: ${problem.score}分`);
  console.log(`\n--- 题目描述 ---\n${problem.description}`);
  console.log(`\n--- 输入描述 ---\n${problem.inputDesc}`);
  console.log(`\n--- 输出描述 ---\n${problem.outputDesc}`);
  console.log(`\n--- 示例 (${problem.examples.length}个) ---`);
  problem.examples.forEach((ex, i) => {
    console.log(`\n示例${i + 1}:`);
    console.log(`  输入: ${ex.input}`);
    console.log(`  输出: ${ex.output}`);
    if (ex.explanation) console.log(`  说明: ${ex.explanation}`);
  });
  console.log(`\n--- 解题思路 ---\n${problem.solution || '(无)'}`);
  console.log(`\n--- 代码 ---`);
  console.log(`  Java: ${problem.codes.java ? '✓' : '✗'} (${problem.codes.java?.length || 0} chars)`);
  console.log(`  Python: ${problem.codes.python ? '✓' : '✗'} (${problem.codes.python?.length || 0} chars)`);
  console.log(`  JavaScript: ${problem.codes.javascript ? '✓' : '✗'} (${problem.codes.javascript?.length || 0} chars)`);
  console.log(`  C++: ${problem.codes.cpp ? '✓' : '✗'} (${problem.codes.cpp?.length || 0} chars)`);
  console.log(`  C: ${problem.codes.c ? '✓' : '✗'} (${problem.codes.c?.length || 0} chars)`);

  // 保存到文件
  const outputDir = path.join(__dirname, '..', 'src', 'data', 'problems');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${problemId}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(problem, null, 2), 'utf-8');
  console.log(`\n✅ 已保存到: ${outputPath}`);
}

main().catch(console.error);
