export const state = {
  generalInfo: {},
  currentPriceRatios: {},
};

const createGeneralInfo = (data) => {
  return {
    exchange: data.Exchange,
    ticker: data.Symbol,
    name: data.Name,
    market: data.Country,
    sector: data.Sector,
    subsector: data.Industry,
    currency: data.Currency,
    fiscalYearEnd: data.FiscalYearEnd,
    description: data.Description,
  };
};

const createCurrentPriceRatios = (data) => {
  return {
    price: parseFloat(
      (data.MarketCapitalization / data.SharesOutstanding).toFixed(1)
    ),
    marketCap: +data.MarketCapitalization,
    sharesOutstanding: +data.SharesOutstanding,
    priceToEarnings: parseFloat((+data.PERatio).toFixed(1)),
    earningsPerShare: +data.EPS,
    priceToEarningsGrowth: parseFloat((+data.PEGRatio).toFixed(1)),
    earningsYield: parseFloat(
      (
        (data.EPS / (data.MarketCapitalization / data.SharesOutstanding)) *
        100
      ).toFixed(2)
    ),
    dividendPerShare: +data.DividendPerShare,
    dividendYield: parseFloat((data.DividendYield * 100).toFixed(2)),
    priceToBook: parseFloat((+data.PriceToBookRatio).toFixed(1)),
    bookValue: parseFloat((+data.BookValue).toFixed(1)),
  };
};

export const loadGeneralData = async (query) => {
  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${query}&apikey=${process.env.API_KEY}`
    );

    const data = await res.json();

    if (Object.keys(data).length === 0)
      throw new Error(
        `Company with a ticker symbol of ${query} does not exist!`
      );

    state.generalInfo = createGeneralInfo(data);
    state.currentPriceRatios = createCurrentPriceRatios(data);

    console.log(state);
  } catch (err) {
    throw err;
  }
};
