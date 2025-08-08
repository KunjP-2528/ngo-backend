require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();


app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://your-frontend-domain.com'
  ],
  credentials: true
}));
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


const authRoutes = require('./routes/auth');
const applicantRoutes = require('./routes/applicants');
const adminRoutes = require('./routes/admin');


app.use('/api/auth', authRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/admin', adminRoutes);

app.use(express.static(path.join(__dirname, 'build')));
app.use('/static', express.static(path.join(__dirname, 'build', 'static')));

app.get('/', (req, res) => {
  res.send('NGO Backend API');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));