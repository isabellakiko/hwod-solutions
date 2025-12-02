import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Star, CheckCircle, Circle, Copy, Check, FileText, Terminal, Lightbulb, Code2, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import './ProblemDetail.css';
import { FormattedText, FormattedParagraph } from '../components/FormattedText';

// Code syntax highlighting (basic)
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';

const languageLabels = {
  java: 'Java',
  python: 'Python',
  javascript: 'JavaScript',
  cpp: 'C++',
  c: 'C',
};

const languagePrism = {
  java: 'java',
  python: 'python',
  javascript: 'javascript',
  cpp: 'cpp',
  c: 'c',
};

export function ProblemDetail({
  problems,
  progress,
  onToggleCompleted,
  onToggleFavorite,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeLanguage, setActiveLanguage] = useState('java');
  const [copied, setCopied] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const problem = problems.find(p => p.id === id);
  const currentIndex = problems.findIndex(p => p.id === id);
  const prevProblem = currentIndex > 0 ? problems[currentIndex - 1] : null;
  const nextProblem = currentIndex < problems.length - 1 ? problems[currentIndex + 1] : null;

  const isCompleted = progress.completed.includes(id);
  const isFavorite = progress.favorites.includes(id);

  // Highlight code on change
  useEffect(() => {
    Prism.highlightAll();
  }, [activeLanguage, problem]);

  // Handle copy
  const handleCopy = async () => {
    const code = problem?.codes[activeLanguage];
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && prevProblem) {
        navigate(`/problem/${prevProblem.id}`);
      } else if (e.key === 'ArrowRight' && nextProblem) {
        navigate(`/problem/${nextProblem.id}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevProblem, nextProblem, navigate]);

  if (!problem) {
    return (
      <div className="problem-not-found">
        <h2>题目未找到</h2>
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          返回列表
        </Link>
      </div>
    );
  }

  return (
    <div className="problem-detail">
      {/* Header */}
      <div className="detail-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          <span>返回列表</span>
        </Link>

        <div className="detail-actions">
          <button
            className={`action-btn ${isCompleted ? 'completed' : ''}`}
            onClick={() => onToggleCompleted(id)}
          >
            {isCompleted ? <CheckCircle size={18} /> : <Circle size={18} />}
            <span>{isCompleted ? '已完成' : '标记完成'}</span>
          </button>
          <button
            className={`action-btn favorite ${isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(id)}
          >
            <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} />
            <span>{isFavorite ? '已收藏' : '收藏'}</span>
          </button>
        </div>
      </div>

      {/* Title Section */}
      <div className="detail-title-section">
        <h1 className="detail-title">{problem.title}</h1>
        <div className="detail-meta">
          <span className={`meta-badge exam-${problem.examType}`}>
            {problem.examType}卷
          </span>
          <span className={`meta-badge score-${problem.score}`}>
            {problem.score}分
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="detail-content">
        {/* Description */}
        <section className="content-section">
          <h2 className="section-title">
            <FileText size={18} />
            题目描述
          </h2>
          <div className="section-body description-text">
            <FormattedText text={problem.description} />
          </div>
        </section>

        {/* Input/Output */}
        <div className="io-grid">
          <section className="content-section">
            <h2 className="section-title">
              <Terminal size={18} />
              输入描述
            </h2>
            <div className="section-body">
              <FormattedText text={problem.inputDesc} className="io-text" />
            </div>
          </section>

          <section className="content-section">
            <h2 className="section-title">
              <Terminal size={18} />
              输出描述
            </h2>
            <div className="section-body">
              <FormattedText text={problem.outputDesc} className="io-text" />
            </div>
          </section>
        </div>

        {/* Examples */}
        {problem.examples.length > 0 && (
          <section className="content-section">
            <h2 className="section-title">
              <Lightbulb size={18} />
              示例
            </h2>
            <div className="examples-list">
              {problem.examples.map((example, index) => (
                <div key={index} className="example-item">
                  <div className="example-header">示例 {index + 1}</div>
                  <div className="example-content">
                    {example.input && (
                      <div className="example-block">
                        <span className="example-label">输入</span>
                        <pre className="example-code">{example.input}</pre>
                      </div>
                    )}
                    {example.output && (
                      <div className="example-block">
                        <span className="example-label">输出</span>
                        <pre className="example-code">{example.output}</pre>
                      </div>
                    )}
                    {example.explanation && (
                      <div className="example-explanation">
                        <span className="example-label">说明</span>
                        <p>{example.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Solution (collapsible) */}
        {problem.solution && (
          <section className="content-section">
            <button
              className="section-toggle"
              onClick={() => setShowSolution(!showSolution)}
            >
              <h2 className="section-title">
                <BookOpen size={18} />
                解题思路
              </h2>
              <span className={`toggle-icon ${showSolution ? 'open' : ''}`}>
                {showSolution ? '−' : '+'}
              </span>
            </button>
            {showSolution && (
              <div className="section-body solution-text animate-fade-in">
                <FormattedParagraph text={problem.solution} />
              </div>
            )}
          </section>
        )}

        {/* Code */}
        <section className="content-section code-section">
          <div className="code-header">
            <h2 className="section-title">
              <Code2 size={18} />
              代码实现
            </h2>
            <button
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? '已复制' : '复制'}</span>
            </button>
          </div>

          {/* Language Tabs */}
          <div className="language-tabs">
            {Object.entries(languageLabels).map(([key, label]) => (
              <button
                key={key}
                className={`lang-tab ${activeLanguage === key ? 'active' : ''}`}
                onClick={() => setActiveLanguage(key)}
                disabled={!problem.codes[key]}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="code-block">
            <pre className={`language-${languagePrism[activeLanguage]}`}>
              <code className={`language-${languagePrism[activeLanguage]}`}>
                {problem.codes[activeLanguage] || '// 该语言暂无代码'}
              </code>
            </pre>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="detail-navigation">
        {prevProblem ? (
          <Link to={`/problem/${prevProblem.id}`} className="nav-btn prev">
            <ArrowLeft size={18} />
            <div className="nav-info">
              <span className="nav-label">上一题</span>
              <span className="nav-title">{prevProblem.title}</span>
            </div>
          </Link>
        ) : (
          <div className="nav-placeholder" />
        )}

        {nextProblem ? (
          <Link to={`/problem/${nextProblem.id}`} className="nav-btn next">
            <div className="nav-info">
              <span className="nav-label">下一题</span>
              <span className="nav-title">{nextProblem.title}</span>
            </div>
            <ArrowRight size={18} />
          </Link>
        ) : (
          <div className="nav-placeholder" />
        )}
      </div>
    </div>
  );
}
