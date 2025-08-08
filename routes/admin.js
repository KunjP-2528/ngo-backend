const express = require('express');
const Applicant = require('../models/Applicant');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Middleware to protect admin routes
router.use(authMiddleware);

// Update application status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const applicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    res.json(applicant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete application
router.delete('/:id', async (req, res) => {
  try {
    const applicant = await Applicant.findByIdAndDelete(req.params.id);
    
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;