const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// gets list of bike types that the user owns

// gets list of available bike types
router.get('/types', (req, res) => {
    queryText = 'SELECT * FROM "bike_types";';
    pool.query(queryText)
    .then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log('error getting bike list', error);
        res.sendStatus(500);
    });
});

// updates user's list of bike types that they own


module.exports = router;