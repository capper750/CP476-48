# Personal Finance Tracker 

A full-stack web application designed for personal financial management, utilizing a Node.js API and a MySQL database for persistent storage.

## 🌟 Key Features
* **Live Dashboard**: Automatically calculates Total Income, Total Expenses, and Net Balance by querying the MySQL database.
* **Transaction History**: A complete list of all records with real-time deletion that syncs back to the database.
* **Category Summary**: Aggregates all spending and ranks categories from highest to lowest.
* **Date Filtering**: Allows users to view financial history within specific timeframes.

---

## 🛠️  Setup Instructions

### 1. Database Setup (XAMPP & PHPMyAdmin)
1.  Launch the **XAMPP Control Panel** and start **Apache** and **MySQL**.
2.  Open your browser to `http://localhost/phpmyadmin`.
3.  Click **"New"** in the left sidebar and create a database named `finance_tracker`.
4.  Select the `finance_tracker` database and click the **"SQL"** tab. Paste and run the following to create your tables:

```sql
CREATE TABLE Categories (
    categoryID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE Transactions (
    transactionID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT DEFAULT 1,
    categoryID INT,
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    isIncome TINYINT(1) NOT NULL,
    description TEXT,
    FOREIGN KEY (categoryID) REFERENCES Categories(categoryID)
);

-- Insert default categories
INSERT INTO Categories (name) VALUES ('Groceries'), ('Rent'), ('Salary'), ('Utilities'), ('Entertainment');

### 2. Frontend Execution

1. Open the project root folder in VS Code.
2. Right-click on dashboard.html and select Open with Live Server.
3. The application will now be live and connected to your local MySQL instance.

## 📂 Project Structure
*/back-end*: Contains the Node.js API, database connection (db.js), and server logic.

*/root* : Contains the frontend HTML, CSS, and client-side JavaScript (dashboard.js, history.js, etc.).

*.gitignore*: Configured to protect sensitive .env files and exclude node_modules.
