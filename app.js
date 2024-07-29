const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const app = express();
const path = require('path');
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'c237_beadedaccessoriesapp'
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to mySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('index');
});


app.get('/products', function(req, res) {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error', error.message);
            return res.status(500).send('Error Retrieving products');
        }
        res.render('productinfo', { products: results });
    });
});



app.get('/commission', function(req, res) {
    const sql = 'SELECT * FROM beadsandaccessories';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error', error.message);
            return res.status(500).send('Error Retrieving commissions');
        }
        res.render('commission', { beadsandaccessories: results });
    });
});



app.post('/submit', function(req, res) {
    const { type, stringlength, selection, name, email, instructions } = req.body;
    const sql = "INSERT INTO commissions (type, stringlength, selection, name, email, instructions) VALUES (?, ?, ?, ?, ?, ?)";
    console.log(sql, type, stringlength, selection, name, email, instructions);
    connection.query(sql, [type, stringlength, selection, name, email, instructions], (error) => {
        if (error) {
            console.error('Database query error', error);
            res.status(500).send('Error sending commission request');
        } else {
            res.redirect('/commission');
        }
    });
});


app.get('/contact', function(req, res) {
    res.render('contact');
});


app.post('/submitcontact', function(req, res) {
    const { name, email, subject, message } = req.body;
    const sql = "INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)";
    console.log(sql, name, email, subject, message);
    connection.query(sql, [name, email, subject, message], (error) => {
        if (error) {
            console.error('Database query error', error);
            res.status(500).send('Error submitting contact form');
        } else {
            res.redirect('/contact');
        }
    });
});


app.get('/products/admin', function(req, res) {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error', error.message);
            return res.status(500).send('Error Retrieving products');
        }
        res.render('productinfor(admin)', { products: results });
    });
});

app.get('/addProduct/admin', function(req, res) {
    res.render('addProduct');
});

app.post('/addProduct', upload.single('image'), (req, res) => {
    const { name, category, description, price } = req.body;
    let image = req.body.currentImage;
    if (req.file) { 
        image = req.file.originalname;
    } else {
        image = null;
    }
    const sql = 'INSERT INTO products (name, category, description, price, image) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [name, category, description, price, image], (error) => {
        if (error) {
            console.error('Database query error', error);
            return res.status(500).send('Error adding product');
        }
        res.redirect('/products/admin');
    });
});

app.get('/product/:id', function(req, res) {
    const productId = req.params.id;
    const sql = 'SELECT * FROM products WHERE productId = ?';
    connection.query(sql, [productId], (error, results) => {
        if (error) {
            console.error('Database query error', error.message);
            return res.status(500).send('Error Retrieving product by ID');
        }
        if (results.length > 0) {
            res.render('product', { product: results[0] });
        } else {
            res.status(404).send('Product not found');
        }
    });
});

app.get('/editProduct/:id', function(req, res) {
    const productId = req.params.id;
    const sql = 'SELECT * FROM products WHERE productId = ?';
    connection.query(sql, [productId], (error, results) => {
        if (error) {
            console.error('Database query error', error.message);
            return res.status(500).send('Error Retrieving product by ID');
        }
        if (results.length > 0) {
            res.render('editProduct', { product: results[0] });
        } else {
            res.status(404).send('Product not found');
        }
    });
});

app.post('/editProduct/:id', upload.single('image'), (req, res) => {
    const productId = req.params.id;
    const {name, category, description, price } = req.body
    let updatedImage = req.body.currentImage;
    if (req.file) {
        updatedImage = req.file.originalname; //set image to be the new image filename
    }

    const sql = 'UPDATE products SET name = ?, category = ?, description = ?, price = ?, image = ? WHERE productId = ?';
    connection.query( sql, [name, category, description, price, updatedImage, productId], (error, results) => {
        if (error) {
            console.error('Database query error', error);
            return res.status(500).send('Error updating product');
        }
        res.redirect('/products/admin');
    });
});


app.get('/deleteProduct/:id', function(req, res) {
    const productId = parseInt(req.params.id);
    const sql = 'DELETE FROM products WHERE productId = ?';
    connection.query (sql, [productId], (error, results) => {
        if (error) {
            console.error('Database query error', error);
            return res.status(500).send('Error deleting product');
        }
        res.redirect('/products/admin');
    });
});

//retrieve from 
app.get('/accessories/admin', function(req, res) {
    const sql = 'SELECT * FROM beadsandaccessories';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error', error.message);
            return res.status(500).send('Error Retrieving commissions');
        }
        res.render('accessoriesadmin', { beadsandaccessories: results });
    });
});


app.get('/commissions/admin', function(req, res) {
    const sql = 'SELECT * FROM commissions';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error', error.message);
            return res.status(500).send('Error Retrieving commissions');
        }
        res.render('commissionsadmin', { commissions: results });
    });
});

app.get('/deleteCommission/:id', function(req, res) {
    const commissionId = parseInt(req.params.id);
    const sql = 'DELETE FROM commissions WHERE commissionId = ?';
    connection.query(sql, [commissionId], (error, results) => {
        if (error) {
            console.error('Database query error', error);
            return res.status(500).send('Error deleting commission');
        }
        res.redirect('/commissions/admin');
    });
});

app.get('/contact/admin', function(req, res) {
    const sql = 'SELECT * FROM contact';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error', error.message);
            return res.status(500).send('Error Retrieving contact forms');
        }
        res.render('contactadmin', { contact: results });
    });
});

app.get('/deleteContact/:id', function(req, res) {
    const contactId = parseInt(req.params.id);
    const sql = 'DELETE FROM contact WHERE contactId = ?';
    connection.query(sql, [contactId], (error, results) => {
        if (error) {
            console.error('Database query error', error);
            return res.status(500).send('Error deleting contact form');
        }
        res.redirect('/contact/admin');
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})