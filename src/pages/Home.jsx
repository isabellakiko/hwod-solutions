import { Search } from 'lucide-react';
import { ProblemList } from '../components/Problem/ProblemList';
import './Home.css';

export function Home({
  problems,
  progress,
  searchQuery,
  onSearchChange,
  onToggleCompleted,
  onToggleFavorite,
}) {
  return (
    <div className="home">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="搜索题目名称或描述..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => onSearchChange('')}
            >
              清除
            </button>
          )}
        </div>
        <div className="search-results-count">
          共 {problems.length} 道题目
        </div>
      </div>

      {/* Problem List */}
      <ProblemList
        problems={problems}
        progress={progress}
        onToggleCompleted={onToggleCompleted}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}
