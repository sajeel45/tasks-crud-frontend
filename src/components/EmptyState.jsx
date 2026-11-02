import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FiCheckSquare, FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { openTaskModal } from '../redux/layoutSlices/modelSlice';

const EmptyState = ({ isFiltered = false }) => {
  const dispatch = useDispatch();

  return (
    <Card className="empty-state-card border-0 shadow-sm text-center py-5 my-4">
      <Card.Body className="py-4">
        <div className="empty-state-icon mb-3">
          <FiCheckSquare size={54} className="text-primary opacity-50" />
        </div>
        <h4 className="fw-bold mb-2">
          {isFiltered ? 'No tasks matched your criteria' : 'No tasks created yet'}
        </h4>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '400px' }}>
          {isFiltered
            ? 'Try adjusting your search query, status filters, or priority options.'
            : 'Get started by creating your first task to stay organized and boost productivity.'}
        </p>
        <Button
          variant="primary"
          className="d-inline-flex align-items-center gap-2"
          onClick={() => dispatch(openTaskModal({ mode: 'create' }))}
        >
          <FiPlus size={18} />
          <span>Create New Task</span>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EmptyState;
