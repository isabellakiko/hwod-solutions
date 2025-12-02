import './FormattedText.css';

// Keywords to highlight in problem descriptions
const HIGHLIGHT_KEYWORDS = [
  // Input/Output related
  '输入', '输出', '返回', '打印',
  // Constraints
  '范围', '限制', '约束', '保证', '假设', '条件',
  '不超过', '至少', '至多', '最多', '最少',
  // Data structures
  '数组', '字符串', '链表', '树', '图', '栈', '队列', '堆',
  '矩阵', '二叉树', '哈希', '集合', '映射',
  // Algorithms
  '排序', '搜索', '遍历', '递归', '迭代', '动态规划',
  '贪心', '回溯', '分治', 'DFS', 'BFS',
  // Common terms
  '注意', '说明', '提示', '备注', '特别',
];

// Pattern for inline code (text between backticks or specific patterns)
const CODE_PATTERN = /`([^`]+)`|(\b\d+\s*[<>=≤≥]+\s*\w+\b)|(\b[a-zA-Z_][a-zA-Z0-9_]*\s*[<>=≤≥]+\s*\d+\b)|(\b\d+\s*≤\s*\w+\s*≤\s*\d+\b)/g;

// Pattern for numbers with units
const NUMBER_PATTERN = /(\d+(?:\.\d+)?)\s*(分|个|次|秒|ms|MB|KB|GB|行|列|位|种|组|层)?(?=[^\d]|$)/g;

export function FormattedText({ text, className = '' }) {
  if (!text) return null;

  const formatLine = (line, lineIndex) => {
    if (!line.trim()) return <br key={lineIndex} />;

    // First, extract and protect code segments
    const segments = [];
    let lastIndex = 0;
    let match;

    // Find code patterns
    const codeRegex = new RegExp(CODE_PATTERN.source, 'g');
    while ((match = codeRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        segments.push({
          type: 'text',
          content: line.slice(lastIndex, match.index),
        });
      }
      segments.push({
        type: 'code',
        content: match[1] || match[0],
      });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < line.length) {
      segments.push({
        type: 'text',
        content: line.slice(lastIndex),
      });
    }

    // If no segments found, treat whole line as text
    if (segments.length === 0) {
      segments.push({ type: 'text', content: line });
    }

    // Process each segment
    const processedSegments = segments.map((segment, idx) => {
      if (segment.type === 'code') {
        return (
          <code key={idx} className="inline-code">
            {segment.content}
          </code>
        );
      }

      // Process text segment for keywords and numbers
      let content = segment.content;
      const elements = [];
      let currentIndex = 0;

      // Build a pattern for all keywords
      const keywordPattern = new RegExp(
        `(${HIGHLIGHT_KEYWORDS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
        'g'
      );

      // Find all keywords
      const keywordMatches = [];
      let keywordMatch;
      while ((keywordMatch = keywordPattern.exec(content)) !== null) {
        keywordMatches.push({
          index: keywordMatch.index,
          length: keywordMatch[0].length,
          text: keywordMatch[0],
          type: 'keyword',
        });
      }

      // Find all numbers with potential units
      const numberMatches = [];
      const numRegex = new RegExp(NUMBER_PATTERN.source, 'g');
      let numMatch;
      while ((numMatch = numRegex.exec(content)) !== null) {
        // Only highlight if it's a significant number (not just "1" or "2" alone)
        if (numMatch[2] || numMatch[0].length > 2) {
          numberMatches.push({
            index: numMatch.index,
            length: numMatch[0].length,
            text: numMatch[0],
            type: 'number',
          });
        }
      }

      // Combine and sort all matches
      const allMatches = [...keywordMatches, ...numberMatches]
        .sort((a, b) => a.index - b.index)
        .filter((match, i, arr) => {
          // Remove overlapping matches
          if (i === 0) return true;
          const prev = arr[i - 1];
          return match.index >= prev.index + prev.length;
        });

      // Build elements
      for (const m of allMatches) {
        if (m.index > currentIndex) {
          elements.push(content.slice(currentIndex, m.index));
        }
        if (m.type === 'keyword') {
          elements.push(
            <span key={`${idx}-${m.index}`} className="highlight-keyword">
              {m.text}
            </span>
          );
        } else {
          elements.push(
            <span key={`${idx}-${m.index}`} className="highlight-number">
              {m.text}
            </span>
          );
        }
        currentIndex = m.index + m.length;
      }

      if (currentIndex < content.length) {
        elements.push(content.slice(currentIndex));
      }

      return elements.length > 0 ? elements : content;
    });

    return (
      <p key={lineIndex} className="formatted-line">
        {processedSegments}
      </p>
    );
  };

  const lines = text.split('\n');

  return (
    <div className={`formatted-text ${className}`}>
      {lines.map((line, index) => formatLine(line, index))}
    </div>
  );
}

// Simpler version for short text (like solutions)
export function FormattedParagraph({ text, className = '' }) {
  if (!text) return null;

  return (
    <div className={`formatted-paragraph ${className}`}>
      {text.split('\n').map((line, i) => (
        <p key={i}>{line || <br />}</p>
      ))}
    </div>
  );
}
