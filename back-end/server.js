const express = require('express');
const cors = require('cors');
const app = express();
const transactionRoutes = require('./routes/transactionRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is runnable at http://localhost:${PORT}`);
});