import React from 'react';
import { Container, Button, Badge } from 'react-bootstrap';
import { FiCheckSquare, FiPlus, FiRefreshCw, FiGlobe } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { openTaskModal } from '../redux/layoutSlices/modelSlice';
import { getTasksAsyncThunk, getTaskStatsAsyncThunk } from '../redux/slices/taskSlice';
import { getNewsAsyncThunk } from '../redux/slices/newsSlice';

const Navbar = ({ activeTab, setActiveTab, filters }) => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.tasks);
  const { category, searchQuery } = useSelector((state) => state.news);

  const handleRefresh = () => {
    if (activeTab === 'tasks') {
      dispatch(getTasksAsyncThunk(filters));
      dispatch(getTaskStatsAsyncThunk());
    } else {
      dispatch(getNewsAsyncThunk({ category, search: searchQuery }));
    }
  };

  return (
    <header className="app-navbar sticky-top">
      <Container className="d-flex align-items-center justify-content-between py-2 py-md-3">
        {/* Brand & Logo */}
        <div className="d-flex align-items-center gap-2">
          <div className="navbar-logo-icon">
            <FiCheckSquare size={22} />
          </div>
          <div>
            <h1 className="navbar-brand-title mb-0">TaskFlow</h1>
            <span className="navbar-subtitle">MERN Workspace</span>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="nav-tabs-switcher d-flex align-items-center gap-1 p-1 bg-light rounded-pill border">
          <button
            type="button"
            className={`nav-switcher-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <FiCheckSquare size={16} />
            <span>Tasks</span>
            {stats?.total > 0 && (
              <Badge bg={activeTab === 'tasks' ? 'light' : 'secondary'} className={`ms-1 ${activeTab === 'tasks' ? 'text-primary' : ''}`}>
                {stats.total}
              </Badge>
            )}
          </button>

          <button
            type="button"
            className={`nav-switcher-btn news-tab-btn ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <FiGlobe size={16} />
            <span>NEWS</span>
            <span className="live-dot" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-secondary"
            className="btn-icon-refresh d-none d-sm-inline-flex align-items-center gap-1"
            onClick={handleRefresh}
            title="Refresh current view"
          >
            <FiRefreshCw size={15} />
            <span className="d-none d-lg-inline">Refresh</span>
          </Button>

          {activeTab === 'tasks' && (
            <Button
              variant="primary"
              className="btn-create-task d-inline-flex align-items-center gap-2"
              onClick={() => dispatch(openTaskModal({ mode: 'create' }))}
            >
              <FiPlus size={18} />
              <span className="d-none d-sm-inline">New Task</span>
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
