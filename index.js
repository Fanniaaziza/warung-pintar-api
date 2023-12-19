const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = []; // Placeholder for user data
let products = []; // Placeholder for product data

// API endpoints

// Register (Create Account)
app.post('/api/auth/register', (req, res) => {
    const { email, password, store_name, phone_number } = req.body;
    users.push({ email, password, store_name, phone_number });
    res.json({ status: 'success', data: 'User registered successfully' });
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    //const accessToken = 'generated_access_token';
    //res.json({ status: 'success', data: { access_token: accessToken, type: 'bearer' } });
});

// Reset Password
app.post('/api/auth/reset-password', (req, res) => {
    const { email, new_password } = req.body;
    res.json({ status: 'success', data: 'Password reset successful' });
});

// Read User
app.get('/api/users/:email', (req, res) => {
    const { email } = req.params;
    const userData = users.find(user => user.email === email);
    res.json({
        status: 'success',
        data: userData || null
    });
});

// Dashboard
app.get('/api/dashboard/:email', (req, res) => {
    const { email } = req.params;
    const dashboardData = {
        status: 'success',
        data: {
            store_data: {
                email: 'store@example.com',
                store_name: 'My Store'
            },
            stock_data: {
                entry_product: 100,
                exit_product: 50,
                product: 150,
                low_stock: 20
            }
        }
    };
    res.json(dashboardData);
});

// Add Product
app.post('/api/products', (req, res) => {
    res.json({ status: 'success', data: 'Product added successfully' });
});

// Read Product (detail product)
app.get('/api/products/:productId', (req, res) => {
    const { productId } = req.params;
    const productData = {
        status: 'success',
        data: {
            product_name: 'Product Name',
            entry_date: '2023-12-05',
            product_category: 'Category',
            product_quantity: 100,
            low_stock: 10,
            code_stock: 'ABC123',
            purchase_price: 50,
            selling_price: 100,
            expired_date: '2024-12-05'
        }
    };
    res.json(productData);
});

// Read All Product (list product)
app.get('/api/products', (req, res) => {
    const allProducts = {
        status: 'success',
        data: [
            {
                product_name: 'Product 1',
                entry_date: '2023-12-01',
                product_category: 'Category 1',
                product_quantity: 50,
                low_stock: 5,
                code_stock: 'XYZ123',
                purchase_price: 40,
                selling_price: 80,
                expired_date: '2024-06-01'
            },
        ]
    };
    res.json(allProducts);
});

// Read All Category Product (list category product)
app.get('/api/products/categories', (req, res) => {
    const categories = {
        status: 'success',
        data: ['Category 1', 'Category 2']
    };
    res.json(categories);
});

// Read ALL History Product
app.get('/api/product/histories/:email', (req, res) => {
    const { email } = req.params;
    const historyData = {
        status: 'success',
        data: {
            history_id: 'history_id_123',
            type: 'sale',
            product_name: 'Product Name',
            amount: 10,
            date: '2023-11-12',
            price: '100'
        }
    };
    res.json(historyData);
});

// Read ALL Notification
app.get('/api/notification/:email', (req, res) => {
    const { email } = req.params;
    const notifications = {
        status: 'success',
        data: {
            notification_id: 'notification_id_123',
            type: 'sale',
            store_name: 'Store Name',
            product_name: 'Product Name'
        }
    };
    res.json(notifications);
});

// Read ALL Product Out
app.get('/api/products/out/:email', (req, res) => {
    const { email } = req.params;
    const productOut = {
        status: 'success',
        data: ['Product Name 1', 'Product Name 2']
    };
    res.json(productOut);
});

// Delete Product
app.delete('/api/products/out/:email/:product_name', (req, res) => {
    const { email, product_name } = req.params;
    const { exit_date, product_quantity, selling_price } = req.body;
    res.json({ status: 'success', data: 'Product deleted successfully' });
});

// List Report
app.get('/api/report/:email', (req, res) => {
    const { email } = req.params;
    const report = { 
        status: 'success',
        data: { 
            product_name: 'Product Name', 
            purchase_price: 50, 
            selling_price: 80, 
            exit_date: '2023-12-12'
        }
    }
    res.json(report);
});

// Function to generate access token (mock implementation)
function generateAccessToken(user) {
    // In a real scenario, use a secure method to generate and sign tokens (e.g., JWT)
    return 'generated_access_token';
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
