const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('/shelf GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    let queryText = `SELECT * FROM "item"`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
} else {
    res.sendStatus(403);
} // For testing only, can be removed
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/shelf POST route');
        console.log(req.params);
        console.log('is authenticated?', req.isAuthenticated());
        console.log('user', req.user);

        let queryText = `INSERT INTO "item" ("description", "image_url", "user_id")
        VALUES ($1, $2, $3)`;
        pool.query(queryText, [req.body.description, req.body.image_url, req.user.id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((err) => res.sendStatus(500));
    } else {
        res.sendStatus(403);
    }
  // endpoint functionality
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('/shelf Delete route');
    console.log(req.params.id);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);

    let queryText = `DELETE FROM "item" WHERE "id" = $1 AND "user_id"= $2`;

    pool.query(queryText, [req.params.id, req.user.id])
    .then((result) => {
        res.sendStatus(200);
    }).catch((err) => res.sendStatus(500));
} else {
    res.sendStatus(403);
}
  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
