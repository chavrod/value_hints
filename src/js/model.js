export const state = {
  generalInfo: {
    tableName: "General Info",
    sectionTableName: "general-info",
    values: {},
  },
  currentPriceRatios: {
    tableName: "Price Ratios",
    sectionTableName: "current-price-ratios",
    values: {},
  },
};

const createGeneralInfo = (data) => {
  return {
    exchange: { name: "Exchange", value: data.Exchange },
    ticker: { name: "Ticker", value: data.Symbol },
    name: { name: "Company Name", value: data.Name },
    sector: { name: "Sector", value: data.Sector },
    subsector: { name: "Subsector", value: data.Industry },
    currency: { name: "Currency", value: data.Currency },
    fiscalYearEnd: { name: "Fiscal Year End", value: data.FiscalYearEnd },
  };
};

const createCurrentPriceRatios = (data) => {
  return {
    price: {
      name: "Price",
      value: parseFloat(
        (data.MarketCapitalization / data.SharesOutstanding).toFixed(1)
      ),
    },
    marketCap: { name: "Market Cap", value: +data.MarketCapitalization },
    sharesOutstanding: {
      name: "Shares Outstanding",
      value: +data.SharesOutstanding,
    },
    priceToEarnings: {
      name: "P/E",
      value: parseFloat((+data.PERatio).toFixed(1)),
    },
    earningsPerShare: { name: "EPS", value: +data.EPS },
    priceToEarningsGrowth: {
      name: "PEG",
      value: parseFloat((+data.PEGRatio).toFixed(1)),
    },
    earningsYield: {
      name: "Earnings Yield",
      value: parseFloat(
        (
          (data.EPS / (data.MarketCapitalization / data.SharesOutstanding)) *
          100
        ).toFixed(2)
      ),
    },
    dividendPerShare: { name: "DPS", value: +data.DividendPerShare },
    dividendYield: {
      name: "Dividend Yield",
      value: parseFloat((data.DividendYield * 100).toFixed(2)),
    },
    priceToBook: {
      name: "P/B",
      value: parseFloat((+data.PriceToBookRatio).toFixed(1)),
    },
    bookValue: { name: "BPS", value: parseFloat((+data.BookValue).toFixed(1)) },
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

    state.generalInfo.values = createGeneralInfo(data);
    state.currentPriceRatios.values = createCurrentPriceRatios(data);
  } catch (err) {
    throw err;
  }
};
