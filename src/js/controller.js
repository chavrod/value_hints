import "../style.css";
import * as model from "./model";
import searchView from "./views/searchView";
import tableView from "./views/tableView";

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

    console.log(model.state.yearlyRatios);
    // 5) Render results
    tableView.render(model.state.currentPriceRatios);
    tableView.render(model.state.generalInfo);
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  searchView.addHandleSearch(controlSearchResults);
};

init();
