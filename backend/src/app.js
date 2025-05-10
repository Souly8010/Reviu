require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const auditRoutes = require('./routes/auditRoutes');
const stripeRoutes = require('./routes/stripeRoutes');

const app = express();

// Middleware - Configuration CORS très permissive pour le débogage
app.use(cors({
  origin: '*', // Accepte toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// Ajout de headers supplémentaires pour résoudre les problèmes CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/stripe', stripeRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
