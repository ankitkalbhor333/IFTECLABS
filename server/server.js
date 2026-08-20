require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting server
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log('╔═══════════════════════════════════════════════════════╗');
    console.log('║         IFTECLABS API Server Starting...              ║');
    console.log('╚═══════════════════════════════════════════════════════╝');
    console.log(`📍 Server URL:  http://localhost:${PORT}`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 CORS Origin: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
    console.log(`📊 Database:    MongoDB Connected`);
    console.log('\n✅ Server is ready!');
    console.log('   POST /api/enquiries - Submit new enquiry');
    console.log('   GET  /api/enquiries - Get all enquiries');
    console.log('   GET  /api/health    - Health check\n');
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down gracefully...');
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });

  process.on('SIGTERM', () => {
    console.log('\n\n🛑 SIGTERM received, shutting down...');
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });

}).catch((error) => {
  console.error('❌ Failed to connect to MongoDB. Server not started.');
  console.error(error.message);
  process.exit(1);
});
