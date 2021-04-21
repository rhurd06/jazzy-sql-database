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
    const artist ={
        name: req.body.name,
        birthdate: req.body.birthdate,
    }
    let queryText = `INSERT INTO "artists" ("artist_name", "year_born" )
                    VALUES ($1, $2);`;
    pool.query(queryText, [req.body.name, req.body.birthdate])
    .then(result =>{
        console.log('New artist is:', result);
        res.sendStatus(200);
    })
    .catch(err => {
        console.log(`This didn't work., ${queryText}`, err);
        res.sendStatus(500);
    })

});

module.exports = router;