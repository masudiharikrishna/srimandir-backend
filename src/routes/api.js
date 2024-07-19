const express = require('express');
const router = express.Router();
const { addBooking, getBookings, getBookingById, updateBooking, deleteBooking } = require('../models/models');

// Define API endpoints
router.post('/bookings', (req, res) => {
    const booking = req.body;
    addBooking(booking, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json(result);
        }
    });
});

router.get('/bookings', (req, res) => {
    getBookings((err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

router.get('/bookings/:id', (req, res) => {
    const id = req.params.id;
    getBookingById(id, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row);
        }
    });
});

router.put('/bookings/:id', (req, res) => {
    const id = req.params.id;
    const booking = req.body;
    updateBooking(id, booking, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(204).end();
        }
    });
});

router.delete('/bookings/:id', (req, res) => {
    const id = req.params.id;
    deleteBooking(id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(204).end();
        }
    });
});

module.exports = router;
