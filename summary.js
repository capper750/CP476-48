document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("categoryTbody");
  if (!tbody) return;

  const transactions = await getAllTransactions();

  const expenseTotals = {};

  transactions.forEach(t => {
    const isInc = (t.isIncome === 1 || t.type === "income");
    
    if (!isInc) {
      const category = t.category || "Uncategorized";
      const amount = Number(t.amount) || 0;
      expenseTotals[category] = (expenseTotals[category] || 0) + amount;
    }
  });

  const sortedCategories = Object.keys(expenseTotals).sort((a, b) => {
    return expenseTotals[b] - expenseTotals[a];
  });

  tbody.innerHTML = "";

  if (sortedCategories.length === 0) {
    tbody.innerHTML = "<tr><td colspan='2'>No expense transactions yet.</td></tr>";
    return;
  }

  sortedCategories.forEach(cat => {
    const total = expenseTotals[cat];
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${cat}</td>
      <td class="expense">-$${total.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
});