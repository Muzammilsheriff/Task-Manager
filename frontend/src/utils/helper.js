export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test((email).toLowerCase());
}

export const addThousandSeparator = (num) => {

  if(num == null || isNaN(num)) return '';

  const [interPart, decimalPart] = num.toString().split('.');
  const formattedInterPart = interPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimalPart ? `${formattedInterPart}.${decimalPart}` : formattedInterPart;
}