import "../style.css";
import * as model from "./model";
import searchView from "./views/searchView";
import generalTableView from "./views/generalTableView";
import historicTableView from "./views/historicTableView";

const controlSearchResults = async () => {
  try {
    // 1) Loading Spinner
    // 2) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 3) Load search results
    await model.loadGeneralData(query);

    // 4) Calculate Ratios
    model.createHistoricRatios(model.state.yearlyStatementsData);

    // 5) Calculate Compound Annual Growth Rates ->
    model.createGrowthRates();

    // 6) Render results
    generalTableView.render(model.state.currentPriceRatios);
    generalTableView.render(model.state.generalInfo);

    historicTableView.render(model.state.yearlyRatios.perShareRelated);
    historicTableView.render(model.state.yearlyRatios.returnRelated);
    historicTableView.render(model.state.yearlyRatios.debtRelated);
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  searchView.addHandleSearch(controlSearchResults);
};

init();
