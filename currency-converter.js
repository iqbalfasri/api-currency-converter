const axios = require("axios");
// API URL
const URL_EXCHANGE =
  "http://data.fixer.io/api/latest?access_key=689601e0089d723a82b1dd4b7b9b0d35";
const URL_COUNTRIES = toCurrency => {
  return `https://restcountries.eu/rest/v2/currency/${toCurrency}`;
};

const getExchangeRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get(URL_EXCHANGE);

  const { rates } = response.data;

  const currency = 1 / rates[fromCurrency];
  const exchangeRate = currency * rates[toCurrency];

  if (isNaN(exchangeRate)) {
    throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
  }

  return exchangeRate;
};

const getCountries = async toCurrency => {
  const response = await axios.get(URL_COUNTRIES(toCurrency));

  return response.data.map(country => country.name);
};

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  // const countries = await getCountries(toCurrency);
  const convertedAmount = await (amount * exchangeRate).toFixed(2);
  return `${convertedAmount} ${toCurrency}`;
};

module.exports = convertCurrency;