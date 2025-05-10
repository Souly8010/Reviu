require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const auditRoutes = require('./routes/auditRoutes');
const stripeRoutes = require('./routes/stripeRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://reviuonline.com', 'http://localhost:3000'], // Accepte le frontend déployé et localhost
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
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
