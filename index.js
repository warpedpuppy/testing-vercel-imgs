const express = require('express');
    morgan = require('morgan');

const app = express();

// Logging middleware
app.use(morgan('common'));
// For the sending of static files
app.use(express.static('public'));

// An array of objects with the first 10 Marvel movies
let topMovies = [
    {
        title: 'Captain America: The First Avenger',
        setting: 1942
    },
    {
        title: 'Captain Marvel',
        setting: 1995
    },
    {
        title: 'Iron Man',
        setting: 2010
    },
    {
        title: 'Iron Man 2',
        setting: 2011
    },
    {
        title: 'The incredible Hulk',
        setting: 2011
    },
    {
        title: 'Thor',
        setting: 2011
    },
    {
        title: 'The Avengers',
        setting: 2012
    },
    {
        title: 'Iron Man 3',
        setting: 2012
    },
    {
        title: 'Thor: The Dark World',
        setting: 2013
    },
    {
        title: 'Captain America: The Winter Soldier',
        setting: 2014
    }

]

// Returning a welcome message
app.get('/', (req, res) => {
    res.send('<h1>Welcome to myFlix!</h1>');
});

// Returning the list of movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('MyFlix is listening on port 8080.');
});


