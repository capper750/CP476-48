document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("transactionsTbody");
  const form = document.getElementById("filterForm");
  const startInput = document.getElementById("startDate");
  const endInput = document.getElementById("endDate");
  const errorEl = document.getElementById("filterError");
  const clearBtn = document.getElementById("clearFilterBtn");

  if (!tbody) return;

  async function render(transactions) {
    tbody.innerHTML = "";

    if (transactions.length === 0) {
      tbody.innerHTML = "<tr><td colspan='6'>No transactions yet.</td></tr>";
      return;
    }

    transactions.forEach(t => {
      const tr = document.createElement("tr");
      const amount = Number(t.amount) || 0;
      const isInc = (t.isIncome === 1 || t.type === "income");
      const typeLabel = isInc ? "income" : "expense";
      const sign = isInc ? "+" : "-";
      const id = t.transactionID; // Matches your MySQL column

      tr.innerHTML = `
        <td>${t.date}</td>
        <td>${typeLabel}</td>
        <td>${t.category}</td>
        <td>${t.description || ""}</td>
        <td class="${typeLabel}">${sign}$${amount.toFixed(2)}</td>
        <td><button class="delete-btn">Delete</button></td>
      `;

      const deleteBtn = tr.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', async () => {
        if (confirm("Are you sure you want to delete this?")) {
          try {
            const response = await fetch(`http://localhost:3000/api/transactions/${id}`, {
              method: 'DELETE'
            });

            if (response.ok) {
              const updated = await getAllTransactions();
              render(updated);
            } else {
              alert("Error deleting from database.");
            }
          } catch (err) {
            console.error("Delete error:", err);
          }
        }
      });

      tbody.appendChild(tr);
    });
  }

  const initialTransactions = await getAllTransactions();
  render(initialTransactions);

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const start = startInput.value;
      const end = endInput.value;
      if (!start || !end) {
        errorEl.textContent = "Please select both dates.";
        return;
      }
      const all = await getAllTransactions();
      const filtered = all.filter(t => {
        const d = new Date(t.date);
        return d >= new Date(start) && d <= new Date(end);
      });
      render(filtered);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", async () => {
      startInput.value = "";
      endInput.value = "";
      const all = await getAllTransactions();
      render(all);
    });
  }
});