export const formatNumber = (number, withSign = false) => {
  const [integerPart, decimalPart] = number.toString().split(".");

  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  let formattedNumber = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;

  if (withSign && number > 0) {
    formattedNumber = `+${formattedNumber}`;
  }

  return formattedNumber;
};
