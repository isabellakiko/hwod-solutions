import { Sun, Moon, BookOpen, Github } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import './Header.css';

export function Header({ completedCount, totalCount }) {
  const { theme, toggleTheme } = useTheme();

  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="header-logo">
          <div className="logo-icon">
            <BookOpen size={24} />
          </div>
          <span className="logo-text">HWOD Review</span>
        </div>

        {/* Progress */}
        <div className="header-progress">
          <div className="progress-info">
            <span className="progress-label">学习进度</span>
            <span className="progress-count">
              <span className="count-current">{completedCount}</span>
              <span className="count-separator">/</span>
              <span className="count-total">{totalCount}</span>
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="header-actions">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn"
            title="GitHub 仓库"
          >
            <Github size={20} />
          </a>
          <button
            className="action-btn theme-toggle"
            onClick={toggleTheme}
            title={theme === 'light' ? '切换深色模式' : '切换浅色模式'}
          >
            <span className="theme-icon">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
