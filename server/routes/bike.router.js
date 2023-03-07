const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// gets list of bike types that the user owns
router.get('/userBikes', (req, res) => {
    let queryText = `SELECT "type" FROM "bike" WHERE "user_id" = $1;`;
    pool.query(queryText, [req.user.id])
    .then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('error getting user bike list', error);
        res.sendStatus(500);
    });
});

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
    let queryText = `DELETE FROM "bike" WHERE "user_id"=${req.user.id} AND "type"='${req.params.id}';`;
    pool.query(queryText)
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error with removing user bike type', error);
    });
});

// updates phone number in user page
router.put('/updatePhone/:id', (req, res) => {
    console.log('req.params.id contains', req.params.id);
    let queryText = `UPDATE "user" SET "phone"=$1 WHERE "id"=$2;`;
    pool.query(queryText, [req.params.id, req.user.id])
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in the updatePhone router put request', error);
        res.sendStatus(500);
    });
});

// updates email in user page


module.exports = router;