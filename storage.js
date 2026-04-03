const API_URL = "http://localhost:3000/api/transactions";

// This function now returns a Promise that must be awaited
async function getAllTransactions() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

function calculateTotals(transactions) {
  let income = 0;
  let expenses = 0;
  transactions.forEach(t => {
    const amount = Number(t.amount) || 0;
    // Check both 'type' string and 'isIncome' bit from MySQL
    if (t.type === "income" || t.isIncome === 1) income += amount;
    else expenses += amount;
  });
  return { income, expenses, net: income - expenses };
}

function getRecentTransactions(transactions, limit = 5) {
  return [...transactions].slice(0, limit);
}