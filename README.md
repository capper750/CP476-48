# Personal Finance Tracker

A full-stack web application for tracking personal finances, featuring a Node.js backend and a persistent MySQL database.

## 🌟 Key Features

* **Live Dashboard**: Automatically calculates and displays Total Income, Total Expenses, and Net Balance by fetching real-time data from the MySQL database.
* **Full CRUD Functionality**: 
    * **Create**: Add new transactions via a dedicated form.
    * **Read**: View all transaction history and categorized summaries.
    * **Delete**: Remove specific transactions from the database directly from the History table.
* **Advanced Data Filtering**: Filter your transaction history by specific date ranges to track spending habits over time.
* **Categorized Spending Summary**: A specialized view that aggregates expenses by category and sorts them from highest to lowest.
* **RESTful API**: A structured backend using Express.js to handle data requests between the frontend and the database.

---

## 🛠️ Local Setup & Execution

### 1. Prerequisites
* **Node.js** (v18+)
* **XAMPP** (MySQL & Apache)
* **VS Code** with **Live Server** extension

### 2. Database Configuration (XAMPP)
1.  Start **Apache** and **MySQL** in the XAMPP Control Panel.
2.  Open `http://localhost/phpmyadmin` and create a database named `finance_tracker`.
3.  Ensure your `Transactions` and `Categories` tables are set up according to the Milestone 03 schema.

### 3. Environment Setup
In the `back-end` folder, create a `.env` file with these settings:
```text
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=finance_tracker
PORT=3000
