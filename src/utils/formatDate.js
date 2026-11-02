export const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const isOverdue = (dateString, isCompleted) => {
  if (!dateString || isCompleted) return false;
  const due = new Date(dateString);
  const now = new Date();
  // Zero out times for fair date comparison
  due.setHours(23, 59, 59, 999);
  return due.getTime() < now.getTime();
};
