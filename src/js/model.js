import * as formatter from "./helpers/formatter";
import * as calcRatio from "./helpers/calcRatio";
import * as calcGrowth from "./helpers/calcGrowth";
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
    perShareRelated: {},
    returnRelated: {},
    debtRelated: {},
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
        data.MarketCapitalization / data.SharesOutstanding
      ),
      formattedValue: formatter.appendSign(
        formatter.roundDecimals(
          data.MarketCapitalization / data.SharesOutstanding
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
      value: formatter.roundDecimals(data.PERatio),
    },
    earningsPerShare: { name: "EPS", value: +data.EPS },
    priceToEarningsGrowth: {
      name: "PEG",
      value: formatter.roundDecimals(data.PEGRatio),
    },
    earningsYield: {
      name: "Earnings Yield",
      value: formatter.roundDecimals(
        (data.EPS / (data.MarketCapitalization / data.SharesOutstanding)) * 100
      ),
      formattedValue: formatter.appendSign(
        formatter.roundDecimals(
          (data.EPS / (data.MarketCapitalization / data.SharesOutstanding)) *
            100
        ),
        "%"
      ),
    },
    dividendPerShare: { name: "DPS", value: +data.DividendPerShare },
    dividendYield: {
      name: "Dividend Yield",
      value: formatter.roundDecimals(data.DividendYield * 100),
      formattedValue: formatter.appendSign(
        formatter.roundDecimals(data.DividendYield * 100),
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

    // TEMPORARY LOCAL STRAGE
    localStorage.setItem("Statements", JSON.stringify(data[3]));
  } catch (err) {
    throw err;
  }
};

export const createHistoricRatios = (data) => {
  state.yearlyRatios.perShareRelated = createPerShareRatios(data);
  state.yearlyRatios.returnRelated = createRetunRatios(data);
  state.yearlyRatios.debtRelated = createDebtRatios(data);
};

export const createGrowthRates = () => {
  // 3 year CAGR
  // MAGIC NUMBER ALERT
  for (let key in state.yearlyRatios.perShareRelated) {
    state.yearlyRatios.perShareRelated[key].threeYrCAGR =
      formatter.roundDecimals(
        calcGrowth.compoundAnnual(
          state.yearlyRatios.perShareRelated[key].values,
          3
        ),
        3
      );
  }
  for (let key in state.yearlyRatios.returnRelated) {
    state.yearlyRatios.returnRelated[key].threeYrCAGR = formatter.roundDecimals(
      calcGrowth.compoundAnnual(
        state.yearlyRatios.returnRelated[key].values,
        3
      ),
      3
    );
  }

  // 5 year CAGR
  for (let key in state.yearlyRatios.perShareRelated) {
    state.yearlyRatios.perShareRelated[key].fiveYrCAGR =
      formatter.roundDecimals(
        calcGrowth.compoundAnnual(
          state.yearlyRatios.perShareRelated[key].values,
          5
        ),
        3
      );
  }
  for (let key in state.yearlyRatios.returnRelated) {
    state.yearlyRatios.returnRelated[key].fiveYrCAGR = formatter.roundDecimals(
      calcGrowth.compoundAnnual(
        state.yearlyRatios.returnRelated[key].values,
        5
      ),
      3
    );
  }

  console.log(state.yearlyRatios);
};

const createPerShareRatios = (data) => {
  return {
    EPS: {
      name: "EPS",
      values: calcRatio.additionalNumeratorOperand["-"](
        data.income.netIncome,
        data.cashFlow.dividendPayoutPreferred,
        data.balanceSheet.sharesOutstanding
      ).map((val) => formatter.roundDecimals(val)),
    },
    BPS: {
      name: "BPS",
      values: calcRatio
        .basic(
          data.balanceSheet.totalEquity,
          data.balanceSheet.sharesOutstanding
        )
        .map((val) => formatter.roundDecimals(val)),
    },
    TBVPS: {
      name: "EPS",
      values: calcRatio.additionalNumeratorOperand["-"](
        data.balanceSheet.totalEquity,
        data.balanceSheet.intangibleAssets,
        data.balanceSheet.sharesOutstanding
      ).map((val) => formatter.roundDecimals(val)),
    },
    FCFPS: {
      name: "FCF per Share",
      values: calcRatio.additionalNumeratorOperand["-"](
        data.cashFlow.operatingCashflow,
        data.cashFlow.capitalExpenditures,
        data.balanceSheet.sharesOutstanding
      ).map((val) => formatter.roundDecimals(val)),
    },
  };
};

const createRetunRatios = (data) => {
  return {
    operatingMargin: {
      name: "Operating Margin",
      values: calcRatio
        .basic(data.income.operatingIncome, data.income.totalRevenue)
        .map((val) => formatter.roundDecimals(val)),
    },
    ebitMargin: {
      name: "EBIT Matrgin",
      values: calcRatio
        .basic(data.income.ebit, data.income.totalRevenue)
        .map((val) => formatter.roundDecimals(val)),
    },
    ROE: {
      name: "ROE",
      values: calcRatio.additionalNumeratorOperand["-"](
        data.income.netIncome,
        data.cashFlow.dividendPayoutPreferred,
        data.balanceSheet.totalEquity
      ).map((val) => formatter.roundDecimals(val)),
    },
    ROA: {
      name: "ROA",
      values: calcRatio
        .basic(data.income.netIncome, data.balanceSheet.totalAssets)
        .map((val) => formatter.roundDecimals(val)),
    },
    ROCE: {
      name: "ROCE",
      values: calcRatio.additionalDenominatorOperand["+"](
        data.income.ebit,
        data.balanceSheet.totalEquity,
        data.balanceSheet.longTermLiabilities
      ).map((val) => formatter.roundDecimals(val)),
    },
    cashConversion: {
      name: "Cash Conversion",
      values: calcRatio
        .basic(data.cashFlow.operatingCashflow, data.income.netIncome)
        .map((val) => formatter.roundDecimals(val)),
    },
  };
};

const createDebtRatios = (data) => {
  return {
    debtToEquity: {
      name: "Debt-to-Equity",
      values: calcRatio
        .basic(
          data.balanceSheet.totalLiabilities,
          data.balanceSheet.totalEquity
        )
        .map((val) => formatter.roundDecimals(val)),
    },
    debtToTotalAssets: {
      name: "Debt-to-Total Assets",
      values: calcRatio
        .basic(
          data.balanceSheet.totalLiabilities,
          data.balanceSheet.totalAssets
        )
        .map((val) => formatter.roundDecimals(val)),
    },
    currentRatio: {
      name: "Current Ratio",
      values: calcRatio
        .basic(
          data.balanceSheet.totalCurrentAssets,
          data.balanceSheet.totalCurrentLiabilities
        )
        .map((val) => formatter.roundDecimals(val)),
    },
    quickRatio: {
      name: "Quick Ratio",
      values: calcRatio.additionalNumeratorOperand["-"](
        data.balanceSheet.totalCurrentAssets,
        data.balanceSheet.inventory,
        data.balanceSheet.totalCurrentLiabilities
      ).map((val) => formatter.roundDecimals(val)),
    },
    interestCover: {
      name: "Interest Cover",
      values: calcRatio
        .basic(data.income.ebit, data.income.interestExpense)
        .map((val) => formatter.roundDecimals(val)),
    },
  };
};

// TEMPORARY LOCAL STORAGE

const init = () => {
  const storage = localStorage.getItem("Statements");
  if (storage) state.incomeStatements = JSON.parse(storage);
  console.log(state.incomeStatements);
};

init();
