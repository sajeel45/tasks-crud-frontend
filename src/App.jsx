import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus } from 'react-icons/fi';
import Navbar from './components/Navbar';
import TaskStats from './components/TaskStats';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import NewsSection from './components/NewsSection';
import { getTasksAsyncThunk, getTaskStatsAsyncThunk } from './redux/slices/taskSlice';
import { openTaskModal } from './redux/layoutSlices/modelSlice';

function App() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('tasks');
  const { filters } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasksAsyncThunk(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    dispatch(getTaskStatsAsyncThunk());
  }, [dispatch]);

  return (
    <div className="task-app-wrapper min-vh-100 d-flex flex-column">
      {/* Top Navigation Bar with Tasks and NEWS tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} filters={filters} />

      {/* Main Content Area */}
      <main className="flex-grow-1 py-4">
        <Container>
          {activeTab === 'tasks' ? (
            <>
              {/* Task Metrics */}
              <TaskStats />

              {/* Task Filter & Search */}
              <TaskFilter />

              {/* Task Flow Cards */}
              <TaskList />
            </>
          ) : (
            /* Open News API Section */
            <NewsSection />
          )}
        </Container>
      </main>

      {/* Floating Action Button (Mobile, shown on Tasks tab) */}
      {activeTab === 'tasks' && (
        <button
          type="button"
          className="fab-add-task d-md-none"
          onClick={() => dispatch(openTaskModal({ mode: 'create' }))}
          aria-label="Add Task"
          title="Add Task"
        >
          <FiPlus size={24} />
        </button>
      )}

      {/* Modals */}
      <TaskModal />
      <DeleteConfirmModal />

      {/* Footer */}
      <footer className="py-3 text-center text-muted small border-top bg-white">
        TaskFlow MERN • Powered by Tasks CRUD & Open News API
      </footer>
    </div>
  );
}

export default App;
