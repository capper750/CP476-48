document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("transactionForm");
  const amountInput = document.getElementById("amount");
  const dateInput = document.getElementById("date");
  const categorySelect = document.getElementById("category");
  const descriptionInput = document.getElementById("description");
  const errorEl = document.getElementById("formError");
  const saveBtn = form.querySelector('button[type="submit"]');

  if (!form || !amountInput || !dateInput || !categorySelect || !descriptionInput || !errorEl || !saveBtn) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  if (!dateInput.value) dateInput.value = `${yyyy}-${mm}-${dd}`;

  function updateSaveState() {
    const val = amountInput.value.trim();
    saveBtn.disabled = val === "" || Number(val) <= 0;
  }

  updateSaveState();
  amountInput.addEventListener("input", updateSaveState);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorEl.textContent = "";

    const type = form.querySelector('input[name="type"]:checked').value;
    const amount = amountInput.value.trim();
    const date = dateInput.value;
    const category = categorySelect.value;
    const description = descriptionInput.value.trim();

    if (!amount) {
      errorEl.textContent = "Amount is required.";
      return;
    }

    if (Number(amount) <= 0) {
      errorEl.textContent = "Amount must be greater than 0.";
      return;
    }

    if (!date) {
      errorEl.textContent = "Date is required.";
      return;
    }

    const newTx = {
      type,
      amount: Number(amount).toFixed(2),
      date,
      category,
      description
    };

    const transactions = getAllTransactions();
    transactions.push(newTx);
    saveAllTransactions(transactions);

    window.location.href = "dashboard.html";
  });
});