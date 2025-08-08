const express = require('express');
const Applicant = require('../models/Applicant');
const router = express.Router();

// Submit new application
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, role, skills, motivation } = req.body;
    
    const newApplicant = new Applicant({
      name,
      email,
      phone,
      role,
      skills,
      motivation
    });

    await newApplicant.save();
    res.status(201).json(newApplicant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all applicants (protected)
router.get('/', async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ createdAt: -1 });
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;