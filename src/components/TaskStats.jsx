import React from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { FiCheckCircle, FiClock, FiActivity, FiLayers } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const TaskStats = () => {
  const { stats, statsLoading } = useSelector((state) => state.tasks);

  const statItems = [
    {
      title: 'Total Tasks',
      value: stats?.total ?? 0,
      icon: <FiLayers size={22} />,
      colorClass: 'stat-total',
      bgClass: 'bg-soft-primary',
    },
    {
      title: 'Completed',
      value: stats?.completed ?? 0,
      icon: <FiCheckCircle size={22} />,
      colorClass: 'stat-completed',
      bgClass: 'bg-soft-success',
    },
    {
      title: 'In Progress',
      value: stats?.inProgress ?? 0,
      icon: <FiActivity size={22} />,
      colorClass: 'stat-in-progress',
      bgClass: 'bg-soft-warning',
    },
    {
      title: 'Pending',
      value: stats?.pending ?? 0,
      icon: <FiClock size={22} />,
      colorClass: 'stat-pending',
      bgClass: 'bg-soft-info',
    },
  ];

  const completionRate = stats?.completionRate ?? 0;

  return (
    <div className="task-stats-section mb-4">
      <Row className="g-3">
        {statItems.map((item, index) => (
          <Col xs={6} md={3} key={index}>
            <Card className="stat-card border-0 shadow-sm h-100">
              <Card.Body className="p-3 d-flex align-items-center gap-3">
                <div className={`stat-icon-wrapper ${item.bgClass} ${item.colorClass}`}>
                  {item.icon}
                </div>
                <div>
                  <div className="stat-title text-muted text-uppercase">{item.title}</div>
                  <div className="stat-number fw-bold">
                    {statsLoading ? '...' : item.value}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Completion Progress Bar */}
      <div className="mt-3 p-3 bg-white rounded-3 shadow-sm border-0 completion-banner">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-semibold text-secondary small">
            Overall Completion Rate
          </span>
          <span className="fw-bold text-primary">{completionRate}%</span>
        </div>
        <ProgressBar
          now={completionRate}
          variant={completionRate === 100 ? 'success' : 'primary'}
          style={{ height: '8px', borderRadius: '10px' }}
        />
      </div>
    </div>
  );
};

export default TaskStats;
