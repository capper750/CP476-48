document.addEventListener("DOMContentLoaded", async () => {
  const incomeEl = document.getElementById("incomeTotal");
  const expenseEl = document.getElementById("expenseTotal");
  const netEl = document.getElementById("netTotal");
  const tbody = document.getElementById("recentTbody");

  if (!incomeEl || !expenseEl || !netEl || !tbody) return;

  // Wait for the data to arrive from the server
  const transactions = await getAllTransactions();
  const totals = calculateTotals(transactions);

  incomeEl.textContent = `$${totals.income.toFixed(2)}`;
  expenseEl.textContent = `$${totals.expenses.toFixed(2)}`;
  netEl.textContent = `$${totals.net.toFixed(2)}`;

  const recent = getRecentTransactions(transactions, 5);
  tbody.innerHTML = "";

  if (recent.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>No transactions yet.</td></tr>";
    return;
  }

  recent.forEach(t => {
    const tr = document.createElement("tr");
    const amount = Number(t.amount) || 0;
    const isInc = (t.isIncome === 1 || t.type === "income");
    const sign = isInc ? "+" : "-";
    const cssClass = isInc ? "income" : "expense";

    tr.innerHTML = `
      <td>${t.date}</td>
      <td>${isInc ? 'income' : 'expense'}</td>
      <td>${t.category}</td>
      <td>${t.description || ""}</td>
      <td class="${cssClass}">${sign}$${amount.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
});