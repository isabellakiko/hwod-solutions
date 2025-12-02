import { Link } from 'react-router-dom';
import { Star, CheckCircle, Circle, ChevronRight } from 'lucide-react';
import './ProblemList.css';

export function ProblemList({
  problems,
  progress,
  onToggleCompleted,
  onToggleFavorite,
}) {
  if (problems.length === 0) {
    return (
      <div className="problem-list-empty">
        <div className="empty-icon">
          <Circle size={48} />
        </div>
        <h3>未找到题目</h3>
        <p>请调整筛选条件或搜索关键词</p>
      </div>
    );
  }

  return (
    <div className="problem-list">
      {/* Table Header */}
      <div className="problem-list-header">
        <span className="col-index">#</span>
        <span className="col-title">题目</span>
        <span className="col-score">分值</span>
        <span className="col-exam">卷别</span>
        <span className="col-status">状态</span>
        <span className="col-actions">收藏</span>
      </div>

      {/* Problem Rows */}
      <div className="problem-list-body">
        {problems.map((problem, index) => {
          const isCompleted = progress.completed.includes(problem.id);
          const isFavorite = progress.favorites.includes(problem.id);

          return (
            <div
              key={problem.id}
              className={`problem-row ${isCompleted ? 'completed' : ''}`}
              style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
            >
              <span className="col-index">
                {problem.id}
              </span>

              <Link to={`/problem/${problem.id}`} className="col-title">
                <span className="problem-title">{problem.title}</span>
                <ChevronRight size={16} className="title-arrow" />
              </Link>

              <span className="col-score">
                <span className={`score-badge score-${problem.score}`}>
                  {problem.score}
                </span>
              </span>

              <span className="col-exam">
                <span className={`exam-badge exam-${problem.examType}`}>
                  {problem.examType}
                </span>
              </span>

              <span className="col-status">
                <button
                  className={`status-btn ${isCompleted ? 'completed' : ''}`}
                  onClick={() => onToggleCompleted(problem.id)}
                  title={isCompleted ? '标记为未完成' : '标记为已完成'}
                >
                  {isCompleted ? (
                    <CheckCircle size={18} />
                  ) : (
                    <Circle size={18} />
                  )}
                </button>
              </span>

              <span className="col-actions">
                <button
                  className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                  onClick={() => onToggleFavorite(problem.id)}
                  title={isFavorite ? '取消收藏' : '添加收藏'}
                >
                  <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
