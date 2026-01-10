 const  GetRelativeTime = (date) => {
  const now = new Date();
  const createdDate = new Date(date);
  const seconds = Math.floor((now - createdDate) / 1000);

  // Calculate time intervals
  const intervals = {
    année: 31536000,
    mois: 2592000,
    semaine: 604800,
    jour: 86400,
    heure: 3600,
    minute: 60,
  };

  // French pluralization helper
  const pluralize = (count, word) => {
    return count > 1 ? `${word}s` : word;
  };

  if (seconds < 60) {
    return "à l'instant";
  }

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);

    if (interval >= 1) {
      return `il y a ${interval} ${pluralize(interval, unit)}`;
    }
  }

  return "à l'instant";
}
export default GetRelativeTime