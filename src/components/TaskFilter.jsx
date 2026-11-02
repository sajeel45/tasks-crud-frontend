import React from 'react';
import { Row, Col, Form, InputGroup, Nav } from 'react-bootstrap';
import { FiSearch, FiSliders, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilterStatus,
  setFilterPriority,
  setSearchQuery,
  setSortBy,
  resetFilters,
} from '../redux/slices/taskSlice';

const TaskFilter = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.tasks);

  const statusTabs = [
    { key: 'all', label: 'All Tasks' },
    { key: 'pending', label: 'Pending' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
  ];

  const hasActiveFilters =
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.sortBy !== 'createdAt:desc';

  return (
    <div className="task-filter-panel mb-4 bg-white p-3 rounded-3 shadow-sm">
      <Row className="g-3 align-items-center">
        {/* Search input */}
        <Col xs={12} lg={5}>
          <InputGroup className="search-input-group">
            <InputGroup.Text className="bg-light border-end-0">
              <FiSearch className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search tasks by title or details..."
              value={filters.search}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="bg-light border-start-0 ps-0"
            />
            {filters.search && (
              <InputGroup.Text
                className="bg-light border-start-0 cursor-pointer"
                onClick={() => dispatch(setSearchQuery(''))}
                title="Clear search"
              >
                <FiX className="text-muted" />
              </InputGroup.Text>
            )}
          </InputGroup>
        </Col>

        {/* Priority Filter */}
        <Col xs={6} sm={4} lg={3}>
          <Form.Select
            value={filters.priority}
            onChange={(e) => dispatch(setFilterPriority(e.target.value))}
            className="filter-select"
          >
            <option value="all">Priority: All</option>
            <option value="high">🔴 High Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="low">🟢 Low Priority</option>
          </Form.Select>
        </Col>

        {/* Sort selector */}
        <Col xs={6} sm={4} lg={3}>
          <Form.Select
            value={filters.sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="filter-select"
          >
            <option value="createdAt:desc">Newest First</option>
            <option value="createdAt:asc">Oldest First</option>
            <option value="dueDate:asc">Due Date (Earliest)</option>
            <option value="dueDate:desc">Due Date (Latest)</option>
            <option value="title:asc">Title (A-Z)</option>
          </Form.Select>
        </Col>

        {/* Reset filters button (if active) */}
        {hasActiveFilters && (
          <Col xs={12} sm={4} lg={1} className="text-end">
            <button
              className="btn btn-link text-decoration-none text-muted p-0 small"
              onClick={() => dispatch(resetFilters())}
            >
              Reset
            </button>
          </Col>
        )}
      </Row>

      {/* Status tabs */}
      <div className="status-tabs-wrapper mt-3 pt-3 border-top">
        <Nav
          variant="pills"
          activeKey={filters.status}
          onSelect={(key) => dispatch(setFilterStatus(key))}
          className="gap-2"
        >
          {statusTabs.map((tab) => (
            <Nav.Item key={tab.key}>
              <Nav.Link eventKey={tab.key} className="status-tab-btn">
                {tab.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default TaskFilter;
