import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTML 文件所在目录
const HTML_DIRS = [
  '/Users/stephen/Downloads/00_project/103_算法/hwod机试/2025E卷-2025A卷',
  '/Users/stephen/Downloads/00_project/103_算法/hwod机试/最新2025B卷-持续收录更新'
];

// 输出目录
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data');

// 从文件名提取元信息
function parseFileName(fileName) {
  const info = {
    examType: '',
    score: 0,
    title: ''
  };

  // 匹配卷别
  if (fileName.includes('A卷') || fileName.includes('2025A') || fileName.includes('2025E')) {
    info.examType = 'A';
  } else if (fileName.includes('B卷') || fileName.includes('2025B')) {
    info.examType = 'B';
  }

  // 匹配分值
  const scoreMatch = fileName.match(/(\d{3})分/);
  if (scoreMatch) {
    info.score = parseInt(scoreMatch[1]);
  }

  // 提取题目名称
  let titleMatch = fileName.match(/[-–]\s*(.+?)（/);
  if (titleMatch) {
    info.title = titleMatch[1].trim();
  } else {
    titleMatch = fileName.match(/分[)）]\s*[-–]?\s*(.+?)（/);
    if (titleMatch) {
      info.title = titleMatch[1].trim();
    }
  }

  // 清理题目名称
  if (info.title) {
    info.title = info.title
      .replace(/^\d+\s*/, '')
      .replace(/^[-–]\s*/, '')
      .trim();
  }

  return info;
}

// 将 HTML 转换为 Markdown 格式（保留格式）
function htmlToMarkdown($, element) {
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
        case 'sub':
          result += `~${$node.text()}~`;
          break;
        case 'sup':
          result += `^${$node.text()}^`;
          break;
        case 'br':
          result += '\n';
          break;
        default:
          result += $node.text();
      }
    }
  });

  return result.trim();
}

// 清理文本（保留换行）
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/<!--.*?-->/g, '')
    .replace(/[ \t]+/g, ' ')  // 只压缩空格和tab，保留换行
    .replace(/\n\s*\n/g, '\n')  // 多个换行变成一个
    .trim();
}

// 处理列表为 Markdown 格式
function processList($, element) {
  const el = $(element);
  const tagName = element.tagName.toLowerCase();
  const items = [];
  let index = 1;

  el.find('> li').each((i, li) => {
    const text = htmlToMarkdown($, li);
    if (tagName === 'ol') {
      items.push(`${index}. ${text}`);
      index++;
    } else {
      items.push(`- ${text}`);
    }
  });

  return items.join('\n');
}

// 提取代码块内容（修复行号问题）
function extractCode($, element) {
  const codeEl = $(element).find('code');
  let code = '';

  if (codeEl.length > 0) {
    // 获取代码元素的直接文本内容
    code = codeEl.clone().children('div, ul').remove().end().text();
  } else {
    code = $(element).text();
  }

  // 清理代码
  return code
    .replace(/复制$/gm, '')  // 移除"复制"按钮文字
    .replace(/^\s*\d+\s*$/gm, '')  // 移除只有行号的行
    .split('\n')
    .map(line => {
      // 更精确地移除行号：只移除行首的纯数字（如果后面紧跟空格或换行）
      return line.replace(/^(\d+)\s{2,}/, '');
    })
    .join('\n')
    .trim();
}

// 从 HTML 内容解析题目信息
function parseHtmlContent(html, fileName) {
  const $ = cheerio.load(html);

  const problem = {
    id: '',
    title: '',
    examType: '',
    score: 0,
    description: '',
    inputDesc: '',
    outputDesc: '',
    examples: [],
    solution: '',
    codes: {
      java: '',
      python: '',
      javascript: '',
      cpp: '',
      c: ''
    }
  };

  // 从文件名获取基本信息
  const fileInfo = parseFileName(fileName);
  problem.examType = fileInfo.examType;
  problem.score = fileInfo.score;
  problem.title = fileInfo.title;

  // 定义章节映射
  const sections = {
    'description': ['题目描述'],
    'input': ['输入描述'],
    'output': ['输出描述'],
    'solution': ['解题思路', '思路', '解题步骤', '解题方法'],
    'java': ['Java'],
    'python': ['Python'],
    'javascript': ['JavaScript', 'JS'],
    'cpp': ['C++', 'Cpp', 'CPP'],
    'c': ['C语言', 'C 语言']
  };

  // 获取当前章节类型
  function getSectionType(text) {
    // 检查是否是示例章节
    if (/示例\s*\d*/i.test(text)) {
      return 'example';
    }

    for (const [type, keywords] of Object.entries(sections)) {
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          // 特殊处理：C语言 vs C++
          if (type === 'c' && text.includes('C++')) {
            continue;
          }
          // 特殊处理：Java vs JavaScript
          if (type === 'java' && text.includes('JavaScript')) {
            continue;
          }
          return type;
        }
      }
    }
    return null;
  }

  let currentSection = '';
  let currentExample = null;
  let expectingInput = false;
  let expectingOutput = false;

  // 遍历所有元素
  $('h2, h3, h4, h5, h6, p, pre, ul, ol, blockquote').each((i, el) => {
    const tagName = el.tagName.toLowerCase();
    const $el = $(el);
    const text = $el.text().trim();

    // 识别章节标题
    if (['h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
      const sectionType = getSectionType(text);
      if (sectionType) {
        currentSection = sectionType;

        // 如果是新的示例章节，保存之前的示例并创建新的
        if (sectionType === 'example') {
          if (currentExample && (currentExample.input || currentExample.output)) {
            problem.examples.push({ ...currentExample });
          }
          currentExample = { input: '', output: '', explanation: '' };
          expectingInput = false;
          expectingOutput = false;
        }
        return;
      }
    }

    // 在示例章节中检测"输入"/"输出"标签
    if (currentSection === 'example' && tagName === 'p') {
      const lowerText = text.toLowerCase();
      if (lowerText === '输入' || lowerText.startsWith('输入：') || lowerText.startsWith('输入:')) {
        expectingInput = true;
        expectingOutput = false;
        return;
      }
      if (lowerText === '输出' || lowerText.startsWith('输出：') || lowerText.startsWith('输出:')) {
        expectingInput = false;
        expectingOutput = true;
        return;
      }
      if (lowerText === '说明' || lowerText.startsWith('说明：') || lowerText.startsWith('说明:')) {
        expectingInput = false;
        expectingOutput = false;
        // 后续内容作为说明
        return;
      }
    }

    // 根据当前章节收集内容
    switch (currentSection) {
      case 'description':
        if (tagName === 'p') {
          const content = htmlToMarkdown($, el);
          if (content) {
            problem.description += (problem.description ? '\n' : '') + content;
          }
        } else if (tagName === 'ul' || tagName === 'ol') {
          const content = processList($, el);
          if (content) {
            problem.description += (problem.description ? '\n' : '') + content;
          }
        }
        break;

      case 'input':
        if (tagName === 'p') {
          const content = htmlToMarkdown($, el);
          if (content) {
            problem.inputDesc += (problem.inputDesc ? '\n' : '') + content;
          }
        } else if (tagName === 'ul' || tagName === 'ol') {
          const content = processList($, el);
          if (content) {
            problem.inputDesc += (problem.inputDesc ? '\n' : '') + content;
          }
        }
        break;

      case 'output':
        if (tagName === 'p') {
          const content = htmlToMarkdown($, el);
          if (content) {
            problem.outputDesc += (problem.outputDesc ? '\n' : '') + content;
          }
        } else if (tagName === 'ul' || tagName === 'ol') {
          const content = processList($, el);
          if (content) {
            problem.outputDesc += (problem.outputDesc ? '\n' : '') + content;
          }
        }
        break;

      case 'example':
        if (currentExample) {
          if (tagName === 'pre') {
            const code = extractCode($, el);
            if (expectingInput) {
              currentExample.input = code;
              expectingInput = false;
            } else if (expectingOutput) {
              currentExample.output = code;
              expectingOutput = false;
            } else if (!currentExample.input) {
              // 如果没有明确标记，第一个 pre 是输入
              currentExample.input = code;
            } else if (!currentExample.output) {
              // 第二个 pre 是输出
              currentExample.output = code;
            }
          } else if (tagName === 'blockquote') {
            currentExample.explanation = cleanText(text);
          } else if (tagName === 'p' && !expectingInput && !expectingOutput) {
            // 可能是说明文字
            if (currentExample.input && currentExample.output && !currentExample.explanation) {
              if (text && text !== '输入' && text !== '输出' && text !== '说明') {
                currentExample.explanation = cleanText(text);
              }
            }
          }
        }
        break;

      case 'solution':
        if (tagName === 'p') {
          const content = htmlToMarkdown($, el);
          if (content) {
            problem.solution += (problem.solution ? '\n' : '') + content;
          }
        } else if (tagName === 'ul' || tagName === 'ol') {
          const content = processList($, el);
          if (content) {
            problem.solution += (problem.solution ? '\n' : '') + content;
          }
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

// 主函数
async function main() {
  console.log('开始提取题目数据...\n');

  const problems = [];
  let id = 1;
  const seenTitles = new Set();
  const stats = {
    total: 0,
    withExamples: 0,
    withSolution: 0,
    withAllCodes: 0,
    missingExampleOutput: 0,
  };

  for (const dir of HTML_DIRS) {
    console.log(`处理目录: ${path.basename(dir)}`);

    let files;
    try {
      files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    } catch (err) {
      console.log(`  ❌ 无法读取目录: ${err.message}`);
      continue;
    }

    console.log(`  找到 ${files.length} 个 HTML 文件`);

    for (const file of files) {
      try {
        const filePath = path.join(dir, file);
        const html = fs.readFileSync(filePath, 'utf-8');
        const problem = parseHtmlContent(html, file);

        // 去重：跳过重复标题
        if (seenTitles.has(problem.title)) {
          continue;
        }

        // 设置 ID
        problem.id = String(id++);

        // 只保存有效题目
        if (problem.title && problem.description) {
          problems.push(problem);
          seenTitles.add(problem.title);

          // 统计
          stats.total++;
          if (problem.examples.length > 0) stats.withExamples++;
          if (problem.solution) stats.withSolution++;
          if (problem.codes.java && problem.codes.python) stats.withAllCodes++;
          if (problem.examples.some(e => !e.output)) stats.missingExampleOutput++;
        }
      } catch (err) {
        console.log(`  ❌ 解析失败: ${file} - ${err.message}`);
      }
    }
  }

  // 确保输出目录存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 写入 JSON 文件
  const outputPath = path.join(OUTPUT_DIR, 'problems.json');
  fs.writeFileSync(outputPath, JSON.stringify(problems, null, 2), 'utf-8');

  console.log(`\n✅ 完成！共提取 ${problems.length} 道题目`);
  console.log(`📁 输出文件: ${outputPath}`);

  // 统计信息
  const examStats = {
    examA: problems.filter(p => p.examType === 'A').length,
    examB: problems.filter(p => p.examType === 'B').length,
    score100: problems.filter(p => p.score === 100).length,
    score200: problems.filter(p => p.score === 200).length,
  };

  console.log('\n📊 统计:');
  console.log(`  A卷: ${examStats.examA} 题`);
  console.log(`  B卷: ${examStats.examB} 题`);
  console.log(`  100分: ${examStats.score100} 题`);
  console.log(`  200分: ${examStats.score200} 题`);
  console.log(`\n📋 数据质量:`);
  console.log(`  有示例: ${stats.withExamples}/${stats.total} (${(stats.withExamples/stats.total*100).toFixed(1)}%)`);
  console.log(`  有解题思路: ${stats.withSolution}/${stats.total} (${(stats.withSolution/stats.total*100).toFixed(1)}%)`);
  console.log(`  有Java+Python代码: ${stats.withAllCodes}/${stats.total} (${(stats.withAllCodes/stats.total*100).toFixed(1)}%)`);
  console.log(`  示例输出缺失: ${stats.missingExampleOutput}/${stats.total}`);
}

main().catch(console.error);
