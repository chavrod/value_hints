export const loadData = async (endpoint, symbol) => {
  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=${endpoint}&symbol=${symbol}&apikey=${process.env.API_KEY}`
    );

    const data = await res.json();

    if (Object.keys(data).length === 0)
      throw new Error(
        `Company with a ticker symbol of ${query} does not exist!`
      );

    return data;
  } catch (err) {
    throw err;
  }
};

// https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo
// https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo
// https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo
// https://www.alphavantage.co/query?function=CASH_FLOW&symbol=IBM&apikey=demo
