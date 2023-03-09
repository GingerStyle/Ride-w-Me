const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//gets list of dates that the user is available to ride
router.get('/get', (req, res) => {
    let queryText = `SELECT * FROM "dates" WHERE "user_id"=$1 ORDER BY "date";`;
    pool.query(queryText, [req.user.id])
    .then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('error getting dates from DB', error);
        res.sendStatus(500);
    });
});

//posts new dates that user adds to the database
router.post('/add', (req, res) => {
    let queryText = `INSERT INTO "dates" ("date", "user_id") VALUES ($1, $2);`;
    pool.query(queryText, [req.body.date, req.user.id])
    .then(() => {
        res.sendStatus(200);
    }).then((error) => {
        console.log('error adding dates to DB', error);
    });
});

//deletes dates that are removed by the user
router.delete('/delete/:id', (req, res) => {
    let queryText = `DELETE FROM "dates" WHERE "id"=${req.params.id}`;
    pool.query(queryText)
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error deleting date from database', error);
    });
});

//deletes dates that are before today's date to save database storage space
router.delete('/deleteOld/:date', (req, res) => {
    let queryText = `DELETE FROM "dates" WHERE "date"<'${req.params.date}'`;
    pool.query(queryText)
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error deleting old dates from database', error);
    });
});

module.exports = router;