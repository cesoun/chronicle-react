export default function DisplayDate(date: Date, short: boolean): string {
  const dd = new Date(date);

  if (short) {
    return dd.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    });
  }

  return dd.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}
