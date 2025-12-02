import { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProblemDetail } from './pages/ProblemDetail';
import problemIndex from './data/problems/index.json';
import './styles/variables.css';

// Initialize theme on load
if (!document.documentElement.getAttribute('data-theme')) {
  const saved = localStorage.getItem('hwod-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));
}

// 缓存已加载的题目详情
const problemCache = new Map();

// 动态加载题目详情
async function loadProblem(id) {
  if (problemCache.has(id)) {
    return problemCache.get(id);
  }

  try {
    const module = await import(`./data/problems/${id}.json`);
    const problem = module.default;
    problemCache.set(id, problem);
    return problem;
  } catch (error) {
    console.error(`Failed to load problem ${id}:`, error);
    return null;
  }
}

// 预加载所有题目（用于搜索功能）
async function loadAllProblems() {
  const problems = await Promise.all(
    problemIndex.map(async (item) => {
      const full = await loadProblem(item.id);
      return full || item;
    })
  );
  return problems;
}

function App() {
  // 题目数据状态
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 加载所有题目数据
  useEffect(() => {
    loadAllProblems().then((data) => {
      setProblems(data);
      setLoading(false);
    });
  }, []);

  // Filters state
  const [filters, setFilters] = useState({
    examType: 'all',
    score: 'all',
    status: 'all',
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Progress state (localStorage)
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('hwod-progress');
    return saved ? JSON.parse(saved) : { completed: [], favorites: [] };
  });

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('hwod-progress', JSON.stringify(progress));
  }, [progress]);

  // Filter handler
  const handleFilterChange = (filterId, value) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  };

  // Toggle completed
  const toggleCompleted = (problemId) => {
    setProgress(prev => ({
      ...prev,
      completed: prev.completed.includes(problemId)
        ? prev.completed.filter(id => id !== problemId)
        : [...prev.completed, problemId],
    }));
  };

  // Toggle favorite
  const toggleFavorite = (problemId) => {
    setProgress(prev => ({
      ...prev,
      favorites: prev.favorites.includes(problemId)
        ? prev.favorites.filter(id => id !== problemId)
        : [...prev.favorites, problemId],
    }));
  };

  // Filtered problems
  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      // Exam type filter
      if (filters.examType !== 'all' && problem.examType !== filters.examType) {
        return false;
      }

      // Score filter
      if (filters.score !== 'all' && problem.score !== parseInt(filters.score)) {
        return false;
      }

      // Status filter
      if (filters.status === 'completed' && !progress.completed.includes(problem.id)) {
        return false;
      }
      if (filters.status === 'pending' && progress.completed.includes(problem.id)) {
        return false;
      }
      if (filters.status === 'favorite' && !progress.favorites.includes(problem.id)) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          problem.title.toLowerCase().includes(query) ||
          (problem.description && problem.description.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [problems, filters, searchQuery, progress]);

  // Stats
  const stats = useMemo(() => ({
    total: problems.length,
    examA: problems.filter(p => p.examType === 'A').length,
    examB: problems.filter(p => p.examType === 'B').length,
    score100: problems.filter(p => p.score === 100).length,
    score200: problems.filter(p => p.score === 200).length,
    completed: progress.completed.length,
    favorites: progress.favorites.length,
  }), [problems, progress]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: 'var(--text-secondary)'
      }}>
        加载中...
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              filters={filters}
              onFilterChange={handleFilterChange}
              stats={stats}
            >
              <Home
                problems={filteredProblems}
                progress={progress}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onToggleCompleted={toggleCompleted}
                onToggleFavorite={toggleFavorite}
              />
            </Layout>
          }
        />
        <Route
          path="/problem/:id"
          element={
            <Layout
              filters={filters}
              onFilterChange={handleFilterChange}
              stats={stats}
              showSidebar={false}
            >
              <ProblemDetail
                problems={problems}
                progress={progress}
                onToggleCompleted={toggleCompleted}
                onToggleFavorite={toggleFavorite}
              />
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
