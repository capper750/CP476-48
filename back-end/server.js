 const express = require('express');
const app = express();
const transactionRoutes = require('./routes/transactionRoutes');

app.use(express.json());
app.get('/', (req, res) => {
    res.send('API is running');
});
app.use('/api/transactions', transactionRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is runnable at http://localhost:${PORT}`);
});
