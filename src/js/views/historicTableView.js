class historicTableView {
  #parentElement = document.querySelector("[data-page='historic']");

  render(data) {
    const dataEntries = Object.entries(data.values).map(([__, value]) => value);
    // Render Headers -> Respective periods
    const periodHeadersMarkup = dataEntries[0]
      .map((perdiod) => this.#generatePeriodHeaders(perdiod))
      .join("");

    // Render Rows with Cells
    const rowsMarkup = dataEntries
      .slice(1)
      .map((entry) => {
        const rowCells = entry.values
          .map((value) => this.#generateCells(value))
          .join("");
        return this.#generateRows(entry.name, rowCells);
      })
      .join("");

    const table = this.#generateTable(
      data.sectionName,
      data.tableName,
      periodHeadersMarkup,
      rowsMarkup
    );

    this.#parentElement.insertAdjacentHTML("afterbegin", table);
  }

  #generatePeriodHeaders(data) {
    return `
      <th>${data}</th>
    `;
  }

  #generateCells(cellData) {
    return `
      <td>${cellData}</td>
    `;
  }

  #generateRows(rowName, rowCells, rowChart) {
    return `
      <tr class="text-center border-y-2 border-indigo-500">
        <th>${rowName}</th>
        ${rowCells}
        <td>${rowChart}</td>
      </tr>
    `;
  }

  #generateTable(sectionName, tableName, headersData, rowsData) {
    return `
      <section class="shadow-lg mx-8 my-4" data-table="${sectionName}">
        <table class="w-full">
          <h3 class="font-semibold text-lg m-1">${tableName}</h3>
          <thead>
            <tr class="bg-slate-200">
              <th></th>
              ${headersData}
              <th>[Chart]</th>
            </tr>
          </thead>
          <tbody>
            ${rowsData}
          </tbody>
        </table>
      </section>
    `;
  }
}

export default new historicTableView();
