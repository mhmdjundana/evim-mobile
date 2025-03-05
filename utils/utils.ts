export const displayDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}