import "../style.css";
import * as model from "./model";
import searchView from "./views/searchView";

const controlSearchResults = async () => {
  try {
    // 1) Loading Spinner
    // 2) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 3) Load search results
    await model.loadGeneralData(query);
    // 4) Render results
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  searchView.addHandleSearch(controlSearchResults);
};

init();
