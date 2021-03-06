const express = require('express');
//source in PG
const {Pool} = require('pg')
const router = express.Router();
const pool = new Pool({
    database: 'jazzy_sql',
    host: 'localhost',
    port: '5432',
    max: 10,
    idleTimeoutMillis: 30000
});
pool.on('connect', () => {
    console.log('Postgresql connected! Woot!');
});
//Handle ERRORS
pool.on('error', error => {
    console.log('Error with postgres pool', error);
});
const songList = [
    {
        title: 'Take Five',
        length: '5:24',
        released: '1959-09-29'
    },
    {
        title: 'So What',
        length: '9:22',
        released: '1959-08-17'
    },{
        title: 'Black Gold',
        length: '5:17',
        released: '2012-02-01'
    }
];
router.get('/', (req, res) => {
    //res.send(musicLibrary);
    let queryText = 'SELECT * FROM songs ORDER BY "title"';
    pool.query(queryText)
    .then(dbResults => {
        res.send(dbResults.rows);
    })
    .catch((error) => {
        console.log(`Error! It broke trying to query ${queryText}`, error);
        res.sendStatus(500);
    });
});
router.post('/', (req, res) => {
    const song ={
        title: req.body.title,
        length: req.body.length,
        released: req.body.released,
    }
    let queryText = `INSERT INTO "songs" ("title", "length", "released" )
                    VALUES ($1, $2, $3);`;
    pool.query(queryText, [req.body.title, req.body.length, req.body.released])
    .then(result =>{
        console.log('New song is:', result);
    res.sendStatus(200);
    })
    .catch(err => {
        console.log(`This didn't work., ${queryText}`, err);
        res.sendStatus(500);
    })
});

module.exports = router;