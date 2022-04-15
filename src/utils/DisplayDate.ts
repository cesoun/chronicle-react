export default function DisplayDate(date: Date): string {
  const dd = new Date(date);

  return dd.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}
