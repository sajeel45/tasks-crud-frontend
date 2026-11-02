import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FiCheck, FiEdit2, FiTrash2, FiCalendar, FiAlertCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import {
  toggleTaskCompleteAsyncThunk,
  getTaskStatsAsyncThunk,
} from '../redux/slices/taskSlice';
import { openTaskModal, openDeleteModal } from '../redux/layoutSlices/modelSlice';
import { formatDate, isOverdue } from '../utils/formatDate';

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(
      toggleTaskCompleteAsyncThunk({
        id: task.id,
        onSuccess: () => {
          dispatch(getTaskStatsAsyncThunk());
        },
      })
    );
  };

  const handleEdit = () => {
    dispatch(openTaskModal({ mode: 'edit', task }));
  };

  const handleDelete = () => {
    dispatch(openDeleteModal({ taskId: task.id, taskTitle: task.title }));
  };

  const priorityBadgeVariant = {
    high: 'danger',
    medium: 'warning',
    low: 'info',
  }[task.priority] || 'secondary';

  const statusBadgeVariant = {
    completed: 'success',
    'in-progress': 'primary',
    pending: 'secondary',
  }[task.status] || 'secondary';

  const overdue = isOverdue(task.dueDate, task.isCompleted);

  return (
    <Card
      className={`task-card border-0 shadow-sm mb-3 position-relative ${
        task.isCompleted ? 'task-completed-card' : ''
      }`}
    >
      <Card.Body className="p-3 p-md-4">
        <div className="d-flex align-items-start gap-3">
          {/* Toggle complete button */}
          <button
            type="button"
            className={`task-checkbox-btn ${task.isCompleted ? 'checked' : ''}`}
            onClick={handleToggleComplete}
            title={task.isCompleted ? 'Mark as pending' : 'Mark as complete'}
            aria-label="Toggle Complete"
          >
            {task.isCompleted && <FiCheck size={16} />}
          </button>

          {/* Main content */}
          <div className="flex-grow-1 overflow-hidden">
            {/* Top row: Badges and Actions */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
              <div className="d-flex flex-wrap align-items-center gap-2">
                <Badge bg={priorityBadgeVariant} className="text-uppercase task-badge">
                  {task.priority}
                </Badge>
                <Badge bg={statusBadgeVariant} className="text-capitalize task-badge">
                  {task.status.replace('-', ' ')}
                </Badge>
                {overdue && (
                  <Badge bg="danger" className="d-flex align-items-center gap-1 task-badge">
                    <FiAlertCircle size={12} /> Overdue
                  </Badge>
                )}
              </div>

              {/* Action buttons */}
              <div className="task-actions d-flex align-items-center gap-1">
                <Button
                  variant="light"
                  size="sm"
                  className="btn-action-icon edit-btn"
                  onClick={handleEdit}
                  title="Edit task"
                >
                  <FiEdit2 size={15} />
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  className="btn-action-icon delete-btn"
                  onClick={handleDelete}
                  title="Delete task"
                >
                  <FiTrash2 size={15} />
                </Button>
              </div>
            </div>

            {/* Task Title */}
            <h5
              className={`task-title mb-1 ${
                task.isCompleted ? 'text-decoration-line-through text-muted' : 'text-dark'
              }`}
            >
              {task.title}
            </h5>

            {/* Task Description */}
            {task.description && (
              <p
                className={`task-desc mb-3 ${
                  task.isCompleted ? 'text-muted' : 'text-secondary'
                }`}
              >
                {task.description}
              </p>
            )}

            {/* Footer details: Due date & created timestamp */}
            <div className="d-flex flex-wrap align-items-center gap-3 text-muted small mt-2">
              {task.dueDate && (
                <div
                  className={`d-flex align-items-center gap-1 ${
                    overdue ? 'text-danger fw-semibold' : ''
                  }`}
                >
                  <FiCalendar size={14} />
                  <span>Due: {formatDate(task.dueDate)}</span>
                </div>
              )}
              <div>
                <span>Added: {formatDate(task.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
