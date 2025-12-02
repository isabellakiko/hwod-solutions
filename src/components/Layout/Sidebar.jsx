import { useState } from 'react';
import { ChevronDown, FileText, Star, CheckCircle, Circle, Filter } from 'lucide-react';
import './Sidebar.css';

const filterGroups = [
  {
    id: 'examType',
    label: '卷别',
    icon: FileText,
    options: [
      { value: 'all', label: '全部' },
      { value: 'A', label: 'A卷' },
      { value: 'B', label: 'B卷' },
    ],
  },
  {
    id: 'score',
    label: '分值',
    icon: Star,
    options: [
      { value: 'all', label: '全部' },
      { value: '100', label: '100分' },
      { value: '200', label: '200分' },
    ],
  },
  {
    id: 'status',
    label: '状态',
    icon: CheckCircle,
    options: [
      { value: 'all', label: '全部' },
      { value: 'completed', label: '已完成' },
      { value: 'pending', label: '未完成' },
      { value: 'favorite', label: '收藏' },
    ],
  },
];

export function Sidebar({ filters, onFilterChange, stats }) {
  const [expandedGroups, setExpandedGroups] = useState({
    examType: true,
    score: true,
    status: true,
  });

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleFilterClick = (groupId, value) => {
    onFilterChange(groupId, value);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Filter size={18} />
        <span>筛选</span>
      </div>

      <div className="sidebar-content">
        {filterGroups.map((group) => {
          const Icon = group.icon;
          const isExpanded = expandedGroups[group.id];

          return (
            <div key={group.id} className="filter-group">
              <button
                className="filter-group-header"
                onClick={() => toggleGroup(group.id)}
              >
                <div className="filter-group-title">
                  <Icon size={16} />
                  <span>{group.label}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`chevron ${isExpanded ? 'expanded' : ''}`}
                />
              </button>

              <div className={`filter-options ${isExpanded ? 'expanded' : ''}`}>
                {group.options.map((option) => {
                  const isActive = filters[group.id] === option.value;
                  const count = getOptionCount(stats, group.id, option.value);

                  return (
                    <button
                      key={option.value}
                      className={`filter-option ${isActive ? 'active' : ''}`}
                      onClick={() => handleFilterClick(group.id, option.value)}
                    >
                      <span className="option-indicator">
                        {isActive ? <CheckCircle size={14} /> : <Circle size={14} />}
                      </span>
                      <span className="option-label">{option.label}</span>
                      {count !== undefined && (
                        <span className="option-count">{count}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="sidebar-stats">
        <div className="stat-item">
          <span className="stat-value">{stats?.total || 0}</span>
          <span className="stat-label">题目总数</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{stats?.completed || 0}</span>
          <span className="stat-label">已完成</span>
        </div>
      </div>
    </aside>
  );
}

function getOptionCount(stats, groupId, value) {
  if (!stats) return undefined;

  switch (groupId) {
    case 'examType':
      if (value === 'all') return stats.total;
      if (value === 'A') return stats.examA;
      if (value === 'B') return stats.examB;
      break;
    case 'score':
      if (value === 'all') return stats.total;
      if (value === '100') return stats.score100;
      if (value === '200') return stats.score200;
      break;
    case 'status':
      if (value === 'all') return stats.total;
      if (value === 'completed') return stats.completed;
      if (value === 'pending') return stats.total - stats.completed;
      if (value === 'favorite') return stats.favorites;
      break;
  }
  return undefined;
}
