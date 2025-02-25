const express = require("express");
const cors = require("cors");
const db = require("./app/models"); 
const authRoutes = require('./app/routes/authRoutes'); 
const userRoutes = require('./app/routes/userRoutes'); 
const paymentRoutes = require('./app/routes/paymentRoutes'); 
const masterRoutes = require('./app/routes/masterDataRoutes'); 
const projectRoutes = require('./app/routes/projectRoutes'); 
const swaggerDocs = require("./app/swaggerConfig")

const app = express();

// More permissive CORS configuration for testing
const corsOptions = {
  origin: true, // Allow all origins during testing
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.set('trust proxy', true);

// Add security headers
app.use((req, res, next) => {
  res.setHeader('X-Forwarded-Proto', 'https');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// Add debugging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Test endpoints
app.get("/ping", (req, res) => {
  res.send('pong');
});

app.get("/debug", (req, res) => {
  res.json({
    time: new Date().toISOString(),
    headers: req.headers,
    ip: req.ip,
    url: req.url
  });
});

// Your existing routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/master', masterRoutes);
app.use('/api/v1/project', projectRoutes);
swaggerDocs(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to your application." });
});

// Database sync
db.sequelize.sync()
  .then(() => {
    console.log("Database synced.");
  })
  .catch((err) => {
    console.error("Failed to sync database:", err.message);
  });

const PORT = 7000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Test endpoints:`);
  console.log(`- http://localhost:${PORT}/ping`);
  console.log(`- http://localhost:${PORT}/debug`);
});