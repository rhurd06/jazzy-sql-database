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
const artistList = [ 
    {
        name: 'Ella Fitzgerald',
        birthdate: '04-25-1917'
    },
    {
        name: 'Dave Brubeck',
        birthdate: '12-06-1920'
    },       
    {
        name: 'Miles Davis',
        birthdate: '05-26-1926'
    },
    {
        name: 'Esperanza Spalding',
        birthdate: '10-18-1984'
    },
];
router.get('/', (req, res) => {
    //res.send(musicLibrary);
    let queryText = 'SELECT * FROM "artists" ORDER BY "year_born" DESC';
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
    artistList.push(req.body);
    res.sendStatus(200);
});

module.exports = router;