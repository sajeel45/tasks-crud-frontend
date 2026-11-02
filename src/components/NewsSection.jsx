import React, { useEffect } from 'react';
import { Row, Col, Card, Badge, Form, InputGroup, Button, Spinner } from 'react-bootstrap';
import { FiSearch, FiExternalLink, FiClock, FiGlobe, FiRefreshCw, FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNewsAsyncThunk,
  setNewsCategory,
  setNewsSearchQuery,
} from '../redux/slices/newsSlice';

const categories = [
  { id: 'general', label: 'Top Headlines' },
  { id: 'technology', label: 'Technology' },
  { id: 'business', label: 'Business' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
  { id: 'entertainment', label: 'Entertainment' },
];

const formatRelativeTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';

  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const NewsSection = () => {
  const dispatch = useDispatch();
  const { articles, category, searchQuery, loading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNewsAsyncThunk({ category, search: searchQuery }));
  }, [dispatch, category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getNewsAsyncThunk({ category, search: searchQuery }));
  };

  const handleRefresh = () => {
    dispatch(getNewsAsyncThunk({ category, search: searchQuery }));
  };

  const heroArticle = articles.length > 0 ? articles[0] : null;
  const gridArticles = articles.length > 1 ? articles.slice(1) : [];

  return (
    <div className="news-section">
      {/* Top News Header Bar */}
      <div className="news-header-banner p-4 bg-white rounded-3 shadow-sm mb-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
          <div className="d-flex align-items-center gap-3">
            <div className="news-header-icon">
              <FiGlobe size={26} />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h3 className="fw-bold mb-0 text-dark">Global News Desk</h3>
                <Badge bg="success" className="live-badge">
                  ● Live Feed
                </Badge>
              </div>
              <p className="text-muted small mb-0">
                Curated real-time updates powered by Open News API
              </p>
            </div>
          </div>

          <Button
            variant="outline-primary"
            size="sm"
            className="d-inline-flex align-items-center gap-2 rounded-3 px-3 py-2"
            onClick={handleRefresh}
            disabled={loading}
          >
            <FiRefreshCw className={loading ? 'spin-icon' : ''} size={15} />
            <span>{loading ? 'Fetching...' : 'Refresh News'}</span>
          </Button>
        </div>

        {/* Category Pills & Search */}
        <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between gap-3 pt-3 border-top">
          {/* Category Chips */}
          <div className="news-categories d-flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`news-category-pill ${category === cat.id ? 'active' : ''}`}
                onClick={() => dispatch(setNewsCategory(cat.id))}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <Form onSubmit={handleSearchSubmit} className="news-search-form">
            <InputGroup className="search-input-group">
              <InputGroup.Text className="bg-light border-end-0">
                <FiSearch className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search headlines..."
                value={searchQuery}
                onChange={(e) => dispatch(setNewsSearchQuery(e.target.value))}
                className="bg-light border-start-0 ps-0"
              />
              {searchQuery && (
                <InputGroup.Text
                  className="bg-light border-start-0 cursor-pointer"
                  onClick={() => {
                    dispatch(setNewsSearchQuery(''));
                    dispatch(getNewsAsyncThunk({ category, search: '' }));
                  }}
                >
                  <FiX className="text-muted" />
                </InputGroup.Text>
              )}
            </InputGroup>
          </Form>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && articles.length === 0 && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" role="status" />
          <p className="mt-3 text-muted">Retrieving latest news dispatches...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <Card className="border-0 shadow-sm text-center py-5 my-4">
          <Card.Body>
            <FiGlobe size={48} className="text-muted opacity-50 mb-3" />
            <h5 className="fw-bold">No news articles found</h5>
            <p className="text-muted">
              Try searching with different keywords or switch categories.
            </p>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => {
                dispatch(setNewsSearchQuery(''));
                dispatch(setNewsCategory('general'));
              }}
            >
              Reset Filters
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* Featured / Hero Story */}
      {!loading && heroArticle && (
        <Card className="hero-news-card border-0 shadow-sm mb-4 overflow-hidden">
          <Row className="g-0">
            <Col md={6} lg={5} className="hero-image-col">
              <div
                className="hero-image"
                style={{
                  backgroundImage: `url(${heroArticle.urlToImage})`,
                }}
              />
            </Col>
            <Col md={6} lg={7}>
              <Card.Body className="p-4 d-flex flex-column justify-content-between h-100">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Badge bg="danger" className="text-uppercase px-2 py-1">
                      Featured Story
                    </Badge>
                    <span className="source-tag">{heroArticle.source?.name}</span>
                    <span className="text-muted small d-flex align-items-center gap-1">
                      <FiClock size={13} /> {formatRelativeTime(heroArticle.publishedAt)}
                    </span>
                  </div>
                  <h3 className="hero-title fw-bold mb-3">{heroArticle.title}</h3>
                  <p className="hero-desc text-secondary mb-4">{heroArticle.description}</p>
                </div>
                <div>
                  <a
                    href={heroArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary d-inline-flex align-items-center gap-2 px-4 py-2 rounded-3 text-decoration-none fw-semibold"
                  >
                    <span>Read Full Story</span>
                    <FiExternalLink size={16} />
                  </a>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      )}

      {/* News Grid */}
      {gridArticles.length > 0 && (
        <Row className="g-4">
          {gridArticles.map((article, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card className="news-card h-100 border-0 shadow-sm overflow-hidden d-flex flex-column">
                <div className="news-card-img-wrapper">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="news-card-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <span className="news-card-source-chip">{article.source?.name}</span>
                </div>

                <Card.Body className="p-3 p-lg-4 d-flex flex-column flex-grow-1">
                  <div className="d-flex align-items-center gap-2 text-muted small mb-2">
                    <FiClock size={13} />
                    <span>{formatRelativeTime(article.publishedAt)}</span>
                  </div>

                  <h5 className="news-card-title fw-bold mb-2">{article.title}</h5>

                  <p className="news-card-desc text-secondary small flex-grow-1 mb-3">
                    {article.description}
                  </p>

                  <div className="pt-2 border-top mt-auto">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-more-link d-inline-flex align-items-center gap-1 small fw-semibold text-primary text-decoration-none"
                    >
                      <span>Read Story</span>
                      <FiExternalLink size={14} />
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default NewsSection;
