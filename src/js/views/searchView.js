class searchView {
  #parentEl = document.getElementById("search");

  getQuery() {
    const query = this.#parentEl.getElementsByTagName("input")[0].value;
    return query;
  }

  addHandleSearch(handler) {
    this.#parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
