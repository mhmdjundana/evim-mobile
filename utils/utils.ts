export const displayDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function displayDateWithTime(date: string) {
  const newDate = new Date(date);
  const options: any = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return newDate.toLocaleDateString('en-GB', options);
}
