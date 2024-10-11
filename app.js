
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override');

  const {connectDB, connectAdminDB, disconnectDB} = require('./config/db');
  const mongoose = require('mongoose');
  //const productRoutes = require('./routes/productAPI');
  const Product = require('./models/Product');
  const cors = require('cors');

  // Load environment variables
  //require('dotenv').config();
  
  // Connect to MongoDB by default with read access user
  connectDB();

var app = express();

app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 3075
);
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'client/build')));


// Get all products
app.get('/api/products', async (req, res) => {
  console.log("Received request for all products"); // Log the request
  try {
    connectDB(); // Connect to the database if not connected as admin or user
    const products = await Product.find();
    console.log("SUCCESS: Retrieved products from the database");
    console.log(`Number of products found: ${products.length}`); // Log the number of products retrieved

    // If no products are found, log that
    if (products.length === 0) {
      console.warn("No products found in the database."); // Warning if no products found
    }

    res.json(products); // Send the products as the response
  } catch (error) {
    console.error("ERROR: Unable to retrieve products from the database", error.message); // Log the error
    res.status(500).json({ message: error.message }); // Send an error response
  }
});

// Get a product by ID
app.get('/api/products/:id', async (req, res) => {
  await connectDB(); // Ensure you're connected to the database
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Create a new product
app.post('/api/products', async (req, res) => {
  await connectDB(); // Ensure you're connected to the database
  const newProduct = new Product(req.body);

  try {
    // Validate product data here if needed (e.g., check required fields)
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct); // 201 Created
  } catch (error) {
    console.error('Error creating product:', error);
    // Check for validation errors or duplicate key errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message }); // 400 Bad Request
    }
    res.status(500).json({ error: 'Server error. Please try again later.' }); // 500 Internal Server Error
  }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    await connectDB(); // Ensure you are connected to the database

    const { id } = req.params;

    // Check if the product exists before trying to delete it
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(204).send(); // No content, successful deletion
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  // Ensure the database is connected
  await connectDB();

  const { name, price, description, category, image } = req.body;

  // Validate input
  if (!name || !price || !description || !category || !image) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Find and update the product by ID
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Check if the product was found and updated
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json(updatedProduct); // Respond with the updated product
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' }); // Handle server errors
  }
});

// Example route to test connection using decoded URI
app.get('/api/test-connection', async (req, res) => {
  const uri = req.query.uri;

  // Decode the URI
  const decodedURI = decodeURIComponent(uri);
  console.log("Decoded URI:", decodedURI);

  try {
    // Disconnect any existing connection
    await disconnectDB();

    // Connect with the decoded admin URI
    await connectAdminDB(decodedURI);

    res.status(200).send('Connected successfully as admin');
  } catch (error) {
    console.error('Connection failed:', error.message);
    res.status(500).send('Connection failed: ' + error.message);
  }
});

app.get('/api/disconnectAdmin', async (req, res) => {
  try {
    await disconnectDB();
    res.status(200).send('Admin disconnected successfully');
  } catch (error) {
    console.error('Failed to disconnect admin:', error);
    res.status(500).send('Failed to disconnect admin');
  }
});

// API routes
//app.use('/api/products', productRoutes);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public'))); 

if (app.get('env') == 'development') {
  app.locals.pretty = true;
}

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
