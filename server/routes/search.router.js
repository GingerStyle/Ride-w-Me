const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get search results based on date and bike type selected
//using a post route so that data can be passed back
router.post('/', (req, res) => {
    let queryText = `SELECT "user"."username", "user"."email", "user"."phone", "user"."id", "dates"."toTime", "dates"."fromTime" FROM "user"
                    JOIN "bike" ON "user"."id"="bike"."user_id"
                    JOIN "dates" ON "user"."id"="dates"."user_id"
                    WHERE "bike"."type"='${req.body.bike}' AND "dates"."date"='${req.body.date}' AND "user"."id"<>${req.user.id}
                    ORDER BY "user"."username";`;
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error getting results from databse', error);
        res.sendStatus(500);
    })
})

module.exports = router;