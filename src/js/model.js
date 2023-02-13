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
  incomeStatements: {},
  yearlyIncomeData: {},
  yearlyBalanceSheetData: {},
  yearlyCashFlowData: {},
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

export const createYearlyIncomeData = (data) => {
  return {
    years: data
      .map((statement) => statement.fiscalDateEnding.slice(0, 4))
      .reverse(),
    totalRevenue: data.map((statement) => statement.totalRevenue).reverse(),
    operatingIncome: data
      .map((statement) => statement.operatingIncome)
      .reverse(),
    ebit: data.map((statement) => statement.ebit).reverse(),
    ebitda: data.map((statement) => statement.ebitda).reverse(),
    netIncome: data.map((statement) => statement.netIncome).reverse(),
    interestExpense: data
      .map((statement) => statement.interestExpense)
      .reverse(),
  };
};

export const createYearlyBalanceSheetData = (data) => {
  {
    return {
      years: data
        .map((statement) => statement.fiscalDateEnding.slice(0, 4))
        .reverse(),
      sharesOutstanding: data
        .map((statement) => statement.commonStockSharesOutstanding)
        .reverse(),
      totalAssets: data.map((statement) => statement.totalAssets).reverse(),
      intangibleAssets: data
        .map((statement) => statement.intangibleAssets)
        .reverse(),
      totalCurrentAssets: data
        .map((statement) => statement.totalCurrentAssets)
        .reverse(),
      inventory: data.map((statement) => statement.inventory).reverse(),
      totalLiabilities: data
        .map((statement) => statement.totalLiabilities)
        .reverse(),
      shortLongTermDebtTotal: data
        .map((statement) => statement.shortLongTermDebtTotal)
        .reverse(),
      longTermDebt: data.map((statement) => statement.longTermDebt).reverse(),
      totalCurrentLiabilities: data
        .map((statement) => statement.totalCurrentLiabilities)
        .reverse(),
      totalEquity: data
        .map((statement) => statement.totalShareholderEquity)
        .reverse(),
    };
  }
};

const createYearlyCashFlowData = (data) => {
  return {
    years: data
      .map((statement) => statement.fiscalDateEnding.slice(0, 4))
      .reverse(),
    changeInInventory: data
      .map((statement) => statement.changeInInventory)
      .reverse(),
    changeInOperatingAssets: data
      .map((statement) => statement.changeInOperatingAssets)
      .reverse(),
    changeInOperatingLiabilities: data
      .map((statement) => statement.changeInOperatingLiabilities)
      .reverse(),
    changeInReceivables: data
      .map((statement) => statement.changeInReceivables)
      .reverse(),
    depreciationAndAmortization: data
      .map((statement) => statement.depreciationDepletionAndAmortization)
      .reverse(),
    operatingCashflow: data
      .map((statement) => statement.operatingCashflow)
      .reverse(),
    capitalExpenditures: data
      .map((statement) => statement.capitalExpenditures)
      .reverse(),
    cashflowFromInvestment: data
      .map((statement) => statement.cashflowFromInvestment)
      .reverse(),
    dividendPayout: data.map((statement) => statement.dividendPayout).reverse(),
    dividendPayoutCommon: data
      .map((statement) => statement.dividendPayoutCommonStock)
      .reverse(),
    dividendPayoutPreferred: data
      .map((statement) => statement.dividendPayoutPreferredStock)
      .reverse(),
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

    state.yearlyIncomeData = createYearlyIncomeData(data[1].annualReports);
    state.yearlyBalanceSheetData = createYearlyBalanceSheetData(
      data[2].annualReports
    );
    state.yearlyCashFlowData = createYearlyCashFlowData(data[3].annualReports);

    console.log(state.yearlyCashFlowData);

    localStorage.setItem("Statements", JSON.stringify(data[3]));
  } catch (err) {
    throw err;
  }
};

const init = () => {
  const storage = localStorage.getItem("Statements");
  if (storage) state.incomeStatements = JSON.parse(storage);
  console.log(state.incomeStatements);
};

init();
