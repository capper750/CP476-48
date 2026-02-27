
exports.addTransaction = (req, res) => {
    res.status(201).json({ message: "Transaction received (Stub)" });
};

exports.getHistory = (req, res) => {
    res.status(200).json({ message: "Transaction history retrieved (Stub)" });
};
