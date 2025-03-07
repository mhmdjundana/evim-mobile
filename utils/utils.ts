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

export function displayPrice(numberString: string) {
  const parts = numberString.split('.');
  let integerPart = parts[0];
  let decimalPart = parts[1] || '00';

  // Add commas for thousands separators
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Ensure decimal part has two digits
  if (decimalPart.length === 0) {
      decimalPart = "00";
  } else if (decimalPart.length === 1){
      decimalPart += "0";
  } else if (decimalPart.length > 2) {
      decimalPart = decimalPart.substring(0,2);
  }

  return integerPart + ',' + decimalPart;
}