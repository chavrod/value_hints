class tableView {
  #parentElement = document.querySelector("[data-page='overview']");

  render(data) {
    const dataEntries = Object.entries(data.values);

    const rowsArr = dataEntries.map((entry) => this.#generateRows(entry[1]));

    const table = this.#generateTable(
      data.sectionTableName,
      data.tableName,
      rowsArr.join("")
    );

    this.#parentElement.insertAdjacentHTML("afterbegin", table);
  }

  #generateRows(data) {
    return `
      <tr class="border-t-2 border-b-2 border-indigo-500 ">
        <td class="text-left text-sm px-2 py-1">${data.name}</td>
        <td class="text-right text-sm px-2 py-1">${data.value}</td>
      </tr>
    `;
  }

  #generateTable(sectionName, tableName, data) {
    return `
      <section class="w-72 overflow-x-auto shadow-lg mb-4 mt-4" data-table="${sectionName}">
        <h3 class="font-semibold text-lg m-1">${tableName}</h3>
        <table class="w-72">
          <tbody>
            ${data}
          </tbody>
        </table>
      </section>
    `;
  }
}

export default new tableView();
