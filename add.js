document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("transactionForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const formData = {
            type: form.querySelector('input[name="type"]:checked').value,
            amount: document.getElementById("amount").value,
            date: document.getElementById("date").value,
            category: document.getElementById("category").value,
            description: document.getElementById("description").value
        };

        try {
            const response = await fetch('http://localhost:3000/api/transactions/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Saved to Database!");
                window.location.href = "dashboard.html";
            } else {
                const errData = await response.json();
                alert("Error: " + errData.error);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("Could not reach server. Is GitBash running 'node server.js'?");
        }
    });
});