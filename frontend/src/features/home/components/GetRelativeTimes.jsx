 const  GetRelativeTime = (date) => {
  const now = new Date();
  const createdDate = new Date(date);
  const seconds = Math.floor((now - createdDate) / 1000);

  // Calculate time intervals
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  // Pluralization helper
  const pluralize = (count, word) => {
    return count > 1 ? `${word}s` : word;
  };

  if (seconds < 60) {
    return "just now";
  }

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);

    if (interval >= 1) {
      return `${interval} ${pluralize(interval, unit)} ago`;
    }
  }

  return "just now";
}
export default GetRelativeTime