import mongoose from "mongoose";

let isConnecting = false;

export const connectDB = async () => {
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    return; // Silently reuse connection
  }

  // Check if connecting (prevent multiple simultaneous connection attempts)
  if (isConnecting || mongoose.connection.readyState === 2) {
    await new Promise((resolve) => {
      const checkConnection = setInterval(() => {
        if (mongoose.connection.readyState === 1) {
          clearInterval(checkConnection);
          resolve();
        }
      }, 100);
    });
    return;
  }

  try {
    isConnecting = true;
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "hifidb",
      maxPoolSize: 10, // Connection pool size
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✓ MongoDB connected");
  } catch (error) {
    console.error("✗ MongoDB connection error:", error);
    throw error;
  } finally {
    isConnecting = false;
  }
};
