document.addEventListener("DOMContentLoaded", () => {
  const incomeEl = document.getElementById("incomeTotal");
  const expenseEl = document.getElementById("expenseTotal");
  const netEl = document.getElementById("netTotal");
  const tbody = document.getElementById("recentTbody");

  if (!incomeEl || !expenseEl || !netEl || !tbody) return;

  const transactions = getAllTransactions();
  const totals = calculateTotals(transactions);

  incomeEl.textContent = `$${totals.income.toFixed(2)}`;
  expenseEl.textContent = `$${totals.expenses.toFixed(2)}`;
  netEl.textContent = `$${totals.net.toFixed(2)}`;

  const recent = getRecentTransactions(transactions, 5);
  tbody.innerHTML = "";

  if (recent.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = "No transactions yet.";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  recent.forEach(t => {
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

    tr.append(dateTd, typeTd, catTd, descTd, amtTd);
    tbody.appendChild(tr);
  });
});