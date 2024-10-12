const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

let isConnected = false; // Track connection status

const connectDB = async () => {
  if (isConnected) return; // Prevent reconnecting if already connected. Evita que se conecte otra vez con mongodb, porque desde el inicio en client se conecta a mongodb. Si estás como admin, deberías ver el store también.
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('MongoDB connected as user');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

const connectAdminDB = async (uri) => {
  if (isConnected) return; // Prevent reconnecting if already connected

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('MongoDB connected as admin');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
}

const disconnectDB = async () => {
  if (!isConnected) return; // No need to disconnect if not connected

  await mongoose.disconnect();
  isConnected = false;
};

module.exports = { connectDB, connectAdminDB, disconnectDB };  