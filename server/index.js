const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// MySQL Server Parameters
// Feel free to edit depending on your database hosting practice adopted
const PORT = 3001;
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "event-scheduler-db",
});

// Retrieve latest event id
app.get('/', (req, res) => {
    db.query("SELECT id FROM events ORDER BY id DESC LIMIT 1", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("Query Result:", result);
        }
    });
});

// Retrieve event details
app.get('/events/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM events WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("Query Result:", result);
        }
    });
});

// Retrieve disabled dates
app.post('/events/:id/disableddates', (req, res) => {
    const eventId = req.params.id;
    db.query("SELECT * FROM disableddates WHERE eventId = ?", eventId, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("Query Result:", result);
        }
    });
});

// Insert new event details
app.post("/createEvent", (req, res) => {
    const eventName = req.body.eventName;
    const minDate = req.body.minDate;
    const maxDate = req.body.maxDate;
    db.query(
        "INSERT INTO events (eventName, minDate, maxDate) VALUES (?, ?, ?)", [eventName, minDate, maxDate], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send()
                console.log("Query Result:", result);
            }
        }
    );
});

// Insert new disabled date range
app.post('/events/:id', (req, res) => {
    const id = req.params.id;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    db.query(
        "INSERT INTO disableddates (eventId, startDate, endDate) VALUES (?, ?, ?)", [id, startDate, endDate], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Query Result:", result);
            }
        }
    );
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
