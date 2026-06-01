require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Routes
const leadsRoutes = require('./routes/leads');
const dealsRoutes = require('./routes/deals');
const fundersRoutes = require('./routes/funders');
const documentsRoutes = require('./routes/documents');
const commissionsRoutes = require('./routes/commissions');
const authRoutes = require('./routes/auth');
const statsRoutes = require('./routes/stats');

app.use('/api/leads', leadsRoutes);
app.use('/api/deals', dealsRoutes);
app.use('/api/funders', fundersRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/commissions', commissionsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
