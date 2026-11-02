import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { FiAlertTriangle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { closeDeleteModal } from '../redux/layoutSlices/modelSlice';
import {
  deleteTaskAsyncThunk,
  getTaskStatsAsyncThunk,
} from '../redux/slices/taskSlice';

const DeleteConfirmModal = () => {
  const dispatch = useDispatch();
  const { deleteModal } = useSelector((state) => state.model);
  const { actionLoading } = useSelector((state) => state.tasks);
  const { isOpen, taskId, taskTitle } = deleteModal;

  const handleConfirmDelete = () => {
    if (!taskId) return;
    dispatch(
      deleteTaskAsyncThunk({
        id: taskId,
        onSuccess: () => {
          dispatch(getTaskStatsAsyncThunk());
          dispatch(closeDeleteModal());
        },
      })
    );
  };

  return (
    <Modal
      show={isOpen}
      onHide={() => dispatch(closeDeleteModal())}
      centered
      className="delete-modal"
    >
      <Modal.Body className="text-center p-4">
        <div className="delete-icon-wrapper mb-3 mx-auto">
          <FiAlertTriangle size={32} className="text-danger" />
        </div>
        <h5 className="fw-bold mb-2">Delete Task</h5>
        <p className="text-muted mb-4">
          Are you sure you want to delete{' '}
          <strong className="text-dark">"{taskTitle || 'this task'}"</strong>? This action
          cannot be undone.
        </p>

        <div className="d-flex justify-content-center gap-2">
          <Button
            variant="light"
            onClick={() => dispatch(closeDeleteModal())}
            disabled={actionLoading}
            className="px-4"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={actionLoading}
            className="px-4"
          >
            {actionLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmModal;
