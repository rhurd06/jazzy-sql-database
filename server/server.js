const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

// TODO - Replace static content with a database tables
let artistRouter = require('./public/routes/artist_router');
app.use('/artist', artistRouter);

let songRouter = require('./public/routes/song_router');
app.use('/song', songRouter);


// app.get('/artist', (req, res) => {
//     //console.log(`In /songs GET`);
//     res.send(artistList);
// });

// app.post('/artist', (req, res) => {
//     artistList.push(req.body);
//     res.sendStatus(201);
// });

// app.get('/song', (req, res) => {
//     console.log(`In /songs GET`);
//     res.send(songList);
// });

// app.post('/song', (req, res) => {
//     songList.push(req.body);
//     res.sendStatus(201);
// });


