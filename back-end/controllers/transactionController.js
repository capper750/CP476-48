const db = require('../db');


exports.addTransaction = async (req, res) => {
    try {
        const { type, amount, date, category, description } = req.body;
        const isIncome = (type === 'income') ? 1 : 0;

        const [categories] = await db.query('SELECT categoryID FROM Categories WHERE name = ?', [category]);
        if (categories.length === 0) return res.status(400).json({ error: "Category not found" });

        const categoryID = categories[0].categoryID;
        const query = 'INSERT INTO Transactions (userID, categoryID, amount, date, isIncome, description) VALUES (?, ?, ?, ?, ?, ?)';
        await db.query(query, [1, categoryID, amount, date, isIncome, description]);

        res.status(201).json({ message: "Success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT t.*, c.name AS category 
            FROM Transactions t 
            JOIN Categories c ON t.categoryID = c.categoryID
            ORDER BY t.date DESC
        `);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
   exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        // This targets the specific ID in your MySQL table
        const query = 'DELETE FROM Transactions WHERE transactionID = ?';
        await db.query(query, [id]);
        
        console.log(`✅ Deleted transaction ID: ${id}`);
        res.status(200).json({ message: "Deleted" });
    } catch (err) {
        console.error("❌ Delete Error:", err.message);
        res.status(500).json({ error: err.message });
    }
};