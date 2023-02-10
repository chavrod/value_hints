import * as formatter from "./helpers/formatter";
import * as alphaVantageApi from "./api/alphaVantageApi";

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
    sector: {
      name: "Sector",
      value: formatter.capitaliseFirstLetter(data.Sector),
    },
    subsector: {
      name: "Subsector",
      value: formatter.capitaliseFirstLetter(data.Industry, false),
    },
    currency: { name: "Currency", value: data.Currency },
    fiscalYearEnd: { name: "Fiscal Year End", value: data.FiscalYearEnd },
  };
};

const createCurrentPriceRatios = (data) => {
  return {
    price: {
      name: "Price",
      value: formatter.roundDecimals(
        data.MarketCapitalization / data.SharesOutstanding,
        2
      ),
      formattedValue: formatter.appendSign(
        formatter.roundDecimals(
          data.MarketCapitalization / data.SharesOutstanding,
          2
        ),
        "$",
        false
      ),
    },
    marketCap: {
      name: "Market Cap",
      value: +data.MarketCapitalization,
      formattedValue: formatter.formatLargeNumber(+data.MarketCapitalization),
    },
    sharesOutstanding: {
      name: "Shares Outstanding",
      value: +data.SharesOutstanding,
      formattedValue: formatter.formatLargeNumber(+data.SharesOutstanding),
    },
    priceToEarnings: {
      name: "P/E",
      value: formatter.roundDecimals(data.PERatio, 2),
    },
    earningsPerShare: { name: "EPS", value: +data.EPS },
    priceToEarningsGrowth: {
      name: "PEG",
      value: formatter.roundDecimals(data.PEGRatio, 2),
    },
    earningsYield: {
      name: "Earnings Yield",
      value: formatter.roundDecimals(
        (data.EPS / (data.MarketCapitalization / data.SharesOutstanding)) * 100,
        2
      ),
      formattedValue: formatter.appendSign(
        formatter.roundDecimals(
          (data.EPS / (data.MarketCapitalization / data.SharesOutstanding)) *
            100,
          2
        ),
        "%"
      ),
    },
    dividendPerShare: { name: "DPS", value: +data.DividendPerShare },
    dividendYield: {
      name: "Dividend Yield",
      value: formatter.roundDecimals(data.DividendYield * 100, 2),
      formattedValue: formatter.appendSign(
        formatter.roundDecimals(data.DividendYield * 100, 2),
        "%"
      ),
    },
    priceToBook: {
      name: "P/B",
      value: formatter.roundDecimals(data.PriceToBookRatio, 2),
    },
    bookValue: {
      name: "BPS",
      value: formatter.roundDecimals(data.BookValue, 2),
    },
  };
};

export const loadGeneralData = async (query) => {
  try {
    const data = await Promise.all([
      alphaVantageApi.loadData("OVERVIEW", query),
      alphaVantageApi.loadData("INCOME_STATEMENT", query),
      alphaVantageApi.loadData("BALANCE_SHEET", query),
      alphaVantageApi.loadData("CASH_FLOW", query),
    ]);
    console.log(data);

    if (Object.keys(data).length === 0)
      throw new Error(
        `Company with a ticker symbol of ${query} does not exist!`
      );

    state.generalInfo.values = createGeneralInfo(data[0]);
    state.currentPriceRatios.values = createCurrentPriceRatios(data[0]);
  } catch (err) {
    throw err;
  }
};
