const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get search results based on date and bike type selected
router.get('/', (req, res) => {
    console.log('req.body.payload contains:', req.body.payload);
    let queryText = `SELECT "user"."username", "user"."email", "user"."phone", "user"."id" FROM "user"
                    JOIN "bike" ON "user"."id"="bike"."user_id"
                    JOIN "dates" ON "user"."id"="dates"."user_id"
                    WHERE "bike"."type"='Mountain' AND "dates"."date"='2023-03-30';`;
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error getting results from databse', error);
        res.sendStatus(500);
    })
})

module.exports = router;