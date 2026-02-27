document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("transactionsTbody");
  const form = document.getElementById("filterForm");
  const startInput = document.getElementById("startDate");
  const endInput = document.getElementById("endDate");
  const errorEl = document.getElementById("filterError");
  const clearBtn = document.getElementById("clearFilterBtn");

  if (!tbody) return;

  function render(transactions) {
    tbody.innerHTML = "";

    if (transactions.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 6;
      td.textContent = "No transactions yet.";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    const sorted = [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    sorted.forEach(t => {
      const tr = document.createElement("tr");

      const dateTd = document.createElement("td");
      dateTd.textContent = t.date;

      const typeTd = document.createElement("td");
      typeTd.textContent = t.type;

      const catTd = document.createElement("td");
      catTd.textContent = t.category;

      const descTd = document.createElement("td");
      descTd.textContent = t.description || "";

      const amtTd = document.createElement("td");
      const amount = Number(t.amount) || 0;
      const sign = t.type === "expense" ? "-" : "+";
      amtTd.textContent = `${sign}$${amount.toFixed(2)}`;
      amtTd.className = t.type === "expense" ? "expense" : "income";

      const actionTd = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        deleteTransaction(t.id);
        render(getAllTransactions());
      });

      actionTd.appendChild(deleteBtn);

      tr.append(dateTd, typeTd, catTd, descTd, amtTd, actionTd);
      tbody.appendChild(tr);
    });
  }

  render(getAllTransactions());

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      errorEl.textContent = "";

      const start = startInput.value;
      const end = endInput.value;

      if (!start || !end) {
        errorEl.textContent = "Please select both start and end dates.";
        return;
      }

      if (new Date(end) < new Date(start)) {
        errorEl.textContent = "End date cannot be before start date.";
        return;
      }

      const filtered = filterTransactionsByDate(start, end);
      render(filtered);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      errorEl.textContent = "";
      startInput.value = "";
      endInput.value = "";
      render(getAllTransactions());
    });
  }
});