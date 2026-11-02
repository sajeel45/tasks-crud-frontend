import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeTaskModal } from '../redux/layoutSlices/modelSlice';
import {
  createTaskAsyncThunk,
  updateTaskAsyncThunk,
  getTaskStatsAsyncThunk,
} from '../redux/slices/taskSlice';

const TaskModal = () => {
  const dispatch = useDispatch();
  const { taskModal } = useSelector((state) => state.model);
  const { actionLoading } = useSelector((state) => state.tasks);
  const { isOpen, mode, task } = taskModal;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === 'edit' && task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: '',
      });
    }
    setErrors({});
  }, [mode, task, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title cannot exceed 200 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
    };

    if (mode === 'edit' && task) {
      dispatch(
        updateTaskAsyncThunk({
          id: task.id,
          data: payload,
          onSuccess: () => {
            dispatch(getTaskStatsAsyncThunk());
            dispatch(closeTaskModal());
          },
        })
      );
    } else {
      dispatch(
        createTaskAsyncThunk({
          data: payload,
          onSuccess: () => {
            dispatch(getTaskStatsAsyncThunk());
            dispatch(closeTaskModal());
          },
        })
      );
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={() => dispatch(closeTaskModal())}
      centered
      backdrop="static"
      className="task-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">
          {mode === 'edit' ? 'Edit Task' : 'Create New Task'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="pt-3">
          {/* Title */}
          <Form.Group className="mb-3" controlId="taskTitle">
            <Form.Label className="fw-semibold">
              Title <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="e.g. Redesign landing page"
              value={formData.title}
              onChange={handleChange}
              isInvalid={!!errors.title}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3" controlId="taskDescription">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Add key details, links, or notes..."
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="g-3 mb-3">
            {/* Status */}
            <Col xs={12} sm={6}>
              <Form.Group controlId="taskStatus">
                <Form.Label className="fw-semibold">Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleChange}>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Priority */}
            <Col xs={12} sm={6}>
              <Form.Group controlId="taskPriority">
                <Form.Label className="fw-semibold">Priority</Form.Label>
                <Form.Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Due Date */}
          <Form.Group className="mb-2" controlId="taskDueDate">
            <Form.Label className="fw-semibold">Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button
            variant="light"
            onClick={() => dispatch(closeTaskModal())}
            disabled={actionLoading}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={actionLoading}>
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
                Saving...
              </>
            ) : mode === 'edit' ? (
              'Save Changes'
            ) : (
              'Create Task'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TaskModal;
