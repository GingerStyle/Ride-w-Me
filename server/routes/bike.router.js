const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// gets list of bike types that the user owns

// gets list of available bike types
router.get('/types', (req, res) => {
    let queryText = 'SELECT * FROM "bike_types";';
    pool.query(queryText)
    .then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('error getting bike list', error);
        res.sendStatus(500);
    });
});

// adds a bike type to user on the bike table from the BikePage
router.post('/addType', (req, res) => {
    console.log('req.body contains', req.body);
    let queryText = `INSERT INTO "bike" ("user_id", "type") VALUES ($1, $2);`;
    pool.query(queryText, [req.body.userId, req.body.bikeType])
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error adding user bike type', error);
    });
});

// removes a bike type to user on the bike table from the BikePage
router.delete('/removeType/:id', (req, res) => {
    console.log('req.params.id contains', req.params.id);
    console.log('req.user.id contains', req.user.id);
    let queryText = `DELETE FROM "bike" WHERE "user_id"=${req.user.id} AND "type"='${req.params.id}';`;
    pool.query(queryText)
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error with removing user bike type', error);
    });
});

module.exports = router;