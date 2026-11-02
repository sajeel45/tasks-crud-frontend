# Tasks Frontend

A clean, responsive React frontend application for Tasks CRUD management, built with Vite, React 18, React-Bootstrap, Redux Toolkit, and React-Toastify.

## Features

- **Full Tasks CRUD UI**:
  - View tasks list with status, priority, and due date.
  - Create new tasks with title, description, priority, status, and due date.
  - Update tasks in a prefilled modal.
  - Delete tasks with confirmation dialog.
  - **One-Click Mark as Complete**: Instantly mark tasks as completed or pending.
- **Dedicated NEWS Tab (Open API Powered)**:
  - Top navigation tab switcher (**Tasks** and **NEWS** with live status indicator).
  - Curated news categories (Top Headlines, Technology, Business, Science, Health, Entertainment).
  - Search bar to filter headlines in real time.
  - Featured Breaking Story hero card with image, source, date, and external link.
  - Responsive multi-column news cards grid with thumbnail zoom, source tags, and relative timestamps.
- **Task Summary & Analytics Dashboard**:
  - Real-time count of Total Tasks, Completed, In Progress, and Pending tasks.
  - Dynamic completion rate progress bar.
- **Smart Filtering & Searching**:
  - Real-time search query filtering by title or details.
  - Status pill filter (All, Pending, In Progress, Completed).
  - Priority selector (All, High, Medium, Low).
  - Sorting (Newest First, Oldest First, Due Date, Title).
- **Responsive Design**:
  - Mobile-first approach with floating action button on mobile.
  - Seamless desktop, tablet, and mobile layouts with Bootstrap and custom SCSS.
- **Feedback & Notifications**:
  - Instant toast feedback on all actions (created, updated, completed, deleted).

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

The app will connect to the backend API at `http://localhost:5000/api` by default (configurable via `VITE_API_BASE_URL` in `.env`).
