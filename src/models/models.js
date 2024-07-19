const db = require('../db/database');

// Initialize tables
const initializeTables = () => {
    const createBookingsTable = `
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            pujaType TEXT,
            date TEXT,
            additionalInfo TEXT
        );
    `;

    db.run(createBookingsTable, (err) => {
        if (err) {
            console.error('Error creating bookings table:', err);
        } else {
            console.log('Bookings table created or already exists');
        }
    });
};

// Export functions to interact with the database
module.exports = {
    initializeTables,
    addBooking: (booking, callback) => {
        const { name, email, pujaType, date, additionalInfo } = booking;
        const sql = `INSERT INTO bookings (name, email, pujaType, date, additionalInfo) VALUES (?, ?, ?, ?, ?)`;
        db.run(sql, [name, email, pujaType, date, additionalInfo], function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null, { id: this.lastID });
            }
        });
    },
    getBookings: (callback) => {
        const sql = `SELECT * FROM bookings`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    },
    getBookingById: (id, callback) => {
        const sql = `SELECT * FROM bookings WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                callback(err);
            } else {
                callback(null, row);
            }
        });
    },
    updateBooking: (id, booking, callback) => {
        const { name, email, pujaType, date, additionalInfo } = booking;
        const sql = `UPDATE bookings SET name = ?, email = ?, pujaType = ?, date = ?, additionalInfo = ? WHERE id = ?`;
        db.run(sql, [name, email, pujaType, date, additionalInfo, id], function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    },
    deleteBooking: (id, callback) => {
        const sql = `DELETE FROM bookings WHERE id = ?`;
        db.run(sql, [id], function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }
};
