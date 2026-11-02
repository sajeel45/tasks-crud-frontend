import React from 'react';
import { Spinner, Pagination } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import { setPage } from '../redux/slices/taskSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, filters } = useSelector((state) => state.tasks);
  const { results = [], page = 1, totalPages = 1 } = tasks || {};

  const isFiltered =
    filters.search !== '' || filters.status !== 'all' || filters.priority !== 'all';

  if (loading && results.length === 0) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" role="status" />
        <p className="mt-3 text-muted">Loading your tasks...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return <EmptyState isFiltered={isFiltered} />;
  }

  return (
    <div className="task-list-container">
      {/* Task items */}
      <div className="tasks-flow">
        {results.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination className="task-pagination">
            <Pagination.Prev
              disabled={page <= 1}
              onClick={() => dispatch(setPage(page - 1))}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Pagination.Item
                key={p}
                active={p === page}
                onClick={() => dispatch(setPage(p))}
              >
                {p}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={page >= totalPages}
              onClick={() => dispatch(setPage(page + 1))}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default TaskList;
