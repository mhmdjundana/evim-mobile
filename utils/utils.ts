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
  if (!numberString) return '0,00';
  const parts = numberString?.split('.');
  let integerPart = parts[0] || '0';
  let decimalPart = parts[1] || '00';

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (decimalPart.length === 0) {
      decimalPart = "00";
  } else if (decimalPart.length === 1){
      decimalPart += "0";
  } else if (decimalPart.length > 2) {
      decimalPart = decimalPart.substring(0,2);
  }

  return integerPart + ',' + decimalPart;
}

export const changeUStoID = (num: string) => {
  if(num) {
    const a = num.toString().replace(/\./g, '').replace(',','.');
    const b = Number(parseFloat(a.toString().replace('/\./g', '').replace('/\,/g', '.')).toFixed(2))
    let c = b.toLocaleString("in-ID")
    if (c.includes(',')){
      const d = c.split(',');
      if(d[1].length === 1) {
        c+='0'
      }
    }else{
      c += ',00';
    }
    return c
  } else {
    return '0,00'
  }
}

export const displayStringArray = (str: string) => {
  if (!str) return '';
  return str.replace(/\[|\]/g, '').split(',').map(s => s.trim()).join(', ');
}