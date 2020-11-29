const express = require('express');
var bodyParser = require('body-parser');

const mysql = require('mysql');


const app = express();
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pcrud'
});

connection.connect(function(err){
    (err)? console.log(err): console.log('connection to mysql');
});


// Get all products 
app.get('/products', function (req, res) {
    connection.query('SELECT * FROM product', function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});


// Add a new product  
app.post('/product', function (req, res) {
    let product = req.body.product;
    if (!product) {
      return res.status(400).send({ error:true, message: 'Please provide product' });
    }
    connection.query("INSERT INTO product (ispr, product_name, price, quantity) values(?,?,?,?)", [product.ispr, product.product_name, product.price, product.quantity], function (error, results, fields) {
        if (error) throw error;
    return res.send({ error: false, data: results, message: 'New product has been created successfully.' });
    });
});

 
// Get product with id 
app.get('/product/:id', function (req, res) {
    let product_id = req.params.id;
    if (!product_id) {
     return res.status(400).send({ error: true, message: 'Please provide product_id' });
    }
    connection.query('SELECT * FROM product where id=?', product_id, function (error, results, fields) {
     if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'Get product with id.' });
    });
});

//  Update product with id
app.put('/product/:id', function (req, res) {
    let product_id = req.params.id;
    let product = req.body.product;
    if (!product_id || !product) {
      return res.status(400).send({ error: product, message: 'Please provide product and product_id' });
    }
    connection.query("UPDATE product SET ispr = ?, product_name=?,price= ?,quantity= ? WHERE id = ?", [product.ispr, product.product_name, product.price, product.quantity, product_id], function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'product has been updated successfully.' });
     });
    });
    
//  Delete product
app.delete('/product/:id', function (req, res) {
    let product_id = req.params.id;
    if (!product_id) {
        return res.status(400).send({ error: true, message: 'Please provide product_id' });
    }
    connection.query('DELETE FROM product WHERE id = ?', [product_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'product has been deleted successfully.' });
    });
    }); 

    
const port = process.env.PORT || 4080;
//start server
app.listen(port, () => {
  console.log('start server crud_books: Connected to port ' + port)
})