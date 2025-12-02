import { Header } from './Header';
import { Sidebar } from './Sidebar';
import './Layout.css';

export function Layout({
  children,
  filters,
  onFilterChange,
  stats,
  showSidebar = true,
}) {
  return (
    <div className="layout">
      <Header
        completedCount={stats?.completed || 0}
        totalCount={stats?.total || 0}
      />
      <div className="layout-container">
        <div className="layout-content">
          {showSidebar && (
            <Sidebar
              filters={filters}
              onFilterChange={onFilterChange}
              stats={stats}
            />
          )}
          <main className={`main-content ${!showSidebar ? 'full-width' : ''}`}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
