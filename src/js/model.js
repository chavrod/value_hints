import * as formatter from "./helpers/formatter";
import * as calcRatio from "./helpers/calcRatio";
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
  yearlyStatementsData: {
    income: {},
    balanceSheet: {},
    cashFlow: {},
  },
  yearlyRatios: {
    perShare: {},
    returns: {},
    cashFlows: {},
    debt: {},
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

export const createYearlyIncomeData = (data) => {
  return {
    years: data
      .map((statement) => statement.fiscalDateEnding.slice(0, 4))
      .reverse(),
    totalRevenue: formatter.formatHistoricData(data, "totalRevenue"),
    operatingIncome: formatter.formatHistoricData(data, "operatingIncome"),
    ebit: formatter.formatHistoricData(data, "ebit"),
    ebitda: formatter.formatHistoricData(data, "ebitda"),
    netIncome: formatter.formatHistoricData(data, "netIncome"),
    interestExpense: formatter.formatHistoricData(data, "interestExpense"),
  };
};

export const createYearlyBalanceSheetData = (data) => {
  {
    return {
      years: data
        .map((statement) => statement.fiscalDateEnding.slice(0, 4))
        .reverse(),
      sharesOutstanding: formatter.formatHistoricData(
        data,
        "commonStockSharesOutstanding"
      ),
      totalAssets: formatter.formatHistoricData(data, "totalAssets"),
      intangibleAssets: formatter.formatHistoricData(data, "intangibleAssets"),
      totalCurrentAssets: formatter.formatHistoricData(
        data,
        "totalCurrentAssets"
      ),
      inventory: formatter.formatHistoricData(data, "inventory"),
      totalLiabilities: formatter.formatHistoricData(data, "totalLiabilities"),
      longTermLiabilities: formatter.formatHistoricData(
        data,
        "totalNonCurrentLiabilities"
      ),
      shortLongTermDebtTotal: formatter.formatHistoricData(
        data,
        "shortLongTermDebtTotal"
      ),
      longTermDebt: formatter.formatHistoricData(data, "longTermDebt"),
      totalCurrentLiabilities: formatter.formatHistoricData(
        data,
        "totalCurrentLiabilities"
      ),
      totalEquity: formatter.formatHistoricData(data, "totalShareholderEquity"),
    };
  }
};

const createYearlyCashFlowData = (data) => {
  return {
    years: data
      .map((statement) => statement.fiscalDateEnding.slice(0, 4))
      .reverse(),
    changeInInventory: formatter.formatHistoricData(data, "changeInInventory"),
    changeInOperatingAssets: formatter.formatHistoricData(
      data,
      "changeInOperatingAssets"
    ),
    changeInOperatingLiabilities: formatter.formatHistoricData(
      data,
      "changeInOperatingLiabilities"
    ),
    changeInReceivables: formatter.formatHistoricData(
      data,
      "changeInReceivables"
    ),
    depreciationAndAmortization: formatter.formatHistoricData(
      data,
      "depreciationDepletionAndAmortization"
    ),
    operatingCashflow: formatter.formatHistoricData(data, "operatingCashflow"),
    capitalExpenditures: formatter.formatHistoricData(
      data,
      "capitalExpenditures"
    ),
    cashflowFromInvestment: formatter.formatHistoricData(
      data,
      "cashflowFromInvestment"
    ),
    dividendPayout: formatter.formatHistoricData(data, "dividendPayout"),
    dividendPayoutCommon: formatter.formatHistoricData(
      data,
      "dividendPayoutCommonStock"
    ),
    dividendPayoutPreferred: formatter.formatHistoricData(
      data,
      "dividendPayoutPreferredStock"
    ),
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

    state.yearlyStatementsData.income = createYearlyIncomeData(
      data[1].annualReports
    );
    state.yearlyStatementsData.balanceSheet = createYearlyBalanceSheetData(
      data[2].annualReports
    );
    state.yearlyStatementsData.cashFlow = createYearlyCashFlowData(
      data[3].annualReports
    );

    console.log(state.yearlyStatementsData.balanceSheet);

    localStorage.setItem("Statements", JSON.stringify(data[3]));
  } catch (err) {
    throw err;
  }
};

export const createHistoricRatios = (data) => {
  state.yearlyRatios.perShare = createPerShareRatios(data);
  state.yearlyRatios.returns = createRetunRatios(data);
};

const createPerShareRatios = (data) => {
  return {
    EPS: calcRatio.additionalNumeratorOperand["-"](
      data.income.netIncome,
      data.cashFlow.dividendPayoutPreferred,
      data.balanceSheet.sharesOutstanding
    ),
    BPS: calcRatio.basic(
      data.balanceSheet.totalEquity,
      data.balanceSheet.sharesOutstanding
    ),
    TBVPS: calcRatio.additionalNumeratorOperand["-"](
      data.balanceSheet.totalEquity,
      data.balanceSheet.intangibleAssets,
      data.balanceSheet.sharesOutstanding
    ),
    FCFPS: calcRatio.additionalNumeratorOperand["-"](
      data.cashFlow.operatingCashflow,
      data.cashFlow.capitalExpenditures,
      data.balanceSheet.sharesOutstanding
    ),
  };
};

const createRetunRatios = (data) => {
  return {
    operatingMargin: calcRatio.basic(
      data.income.operatingIncome,
      data.income.totalRevenue
    ),
    ebitMargin: calcRatio.basic(data.income.ebit, data.income.totalRevenue),
    ROE: calcRatio.additionalNumeratorOperand["-"](
      data.income.netIncome,
      data.cashFlow.dividendPayoutPreferred,
      data.balanceSheet.totalEquity
    ),
    ROA: calcRatio.basic(data.income.netIncome, data.balanceSheet.totalAssets),
    ROCE: calcRatio.additionalDenominatorOperand["+"](
      data.income.ebit,
      data.balanceSheet.totalEquity,
      data.balanceSheet.longTermLiabilities
    ),
  };
};

const init = () => {
  const storage = localStorage.getItem("Statements");
  if (storage) state.incomeStatements = JSON.parse(storage);
  console.log(state.incomeStatements);
};

init();
