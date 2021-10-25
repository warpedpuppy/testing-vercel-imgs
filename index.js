const express = require('express');
    bodyParser = require('body-parser');
    uuid = require('uuid');

const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/superFlixDB', { useNewUrlParser: true, useUnifiedTopology: true, });

// Logging middleware
app.use(morgan('common'));

// For the sending of static files
app.use(express.static('public'));
app.use(bodyParser.json());

/* An array of objects with the first 10 Marvel movies
let topMovies = [
    {
        title: 'Captain America: The First Avenger',
        setting: 1942,
        description: 'Origin story of Captain America and the beginning of all of the Avengers',
        releaseDate: 2011,
        director: 'Joe Johnston',
        series: 'Marvel Cinematic Universe',
        imageUrl: "www.link.to/movie/coverartwork"
    },
    {
        title: 'Captain Marvel',
        setting: 1995,
        description: 'Origin story of Captain Marvel',
        releaseDate: 2019,
        director: 'Ryan Fleck',
        series: 'Marvel Cinematic Universe',
        imageUrl: "www.link.to/movie/coverartwork"
    },
    {
        title: 'Iron Man',
        setting: 2010,
        description: 'Origin story of Iron Man',
        releaseDate: 2008,
        director: 'Jon Favreau',
        series: 'Marvel Cinematic Universe',
        imageUrl: "www.link.to/movie/coverartwork"
    },
    {
        title: 'Iron Man 2',
        setting: 2011,
        description: 'Iron Man is pressured to share his technology with the military',
        releaseDate: 2010,
        director: 'Jon Favreau',
        series: 'Marvel Cinematic Universe',
        imageUrl: "www.link.to/movie/coverartwork"
    },
    {
        title: 'The Incredible Hulk',
        setting: 2011,
        description: 'The Hulk battles The Abomination while searching for a cure',
        releaseDate: 2008,
        director: 'Louis Leterrier',
        series: 'Marvel Cinematic Universe',
        imageUrl: "www.link.to/movie/coverartwork"
    },
    {
        title: 'Thor',
        setting: 2011,
        description: 'Stripped of his powers, Thor is banished to Earth.',
        releaseDate: 2011,
        director: 'Kenneth Branagh',
        series: 'Marvel Cinematic Universe',
        imageUrl: "www.link.to/movie/coverartwork"
    },
    {
        title: 'The Avengers',
        setting: 2012,
        description: 'Nick Fury gathers the Avengers to save the Earth',
        releaseDate: 2012,
        director: 'Joss Whedon',
        series: 'Marvel Cinematic Universe',
        imageUrl: "www.link.to/movie/coverartwork"
    },
    {
        title: 'Iron Man 3',
        setting: 2012,
        description: 'Tony Stark faces his biggest challenge yet',
        releaseDate: 2013,
        director: 'Shane Black',
        series: 'Marvel Cinematic Universe',
        imageUrl: "www.link.to/movie/coverartwork"
    },
    {
        title: 'Thor: The Dark World',
        setting: 2013,
        description: 'Thor must bring his love to Asgard before she is used to turn the universe into darkness',
        releaseDate: 2013,
        director: 'Alan Taylor',
        series: 'Marvel Cinematic Universe',
        imageUrl: "www.link.to/movie/coverartwork"
    },
    {
        title: 'Captain America: The Winter Soldier',
        setting: 2014,
        description: 'Captain America is joined by Black Widow and the Falcon to battle the Winter Soldier',
        releaseDate: 2014,
        director: 'Anthony Russo and Joe Russo',
        series: 'Marvel Cinematic Universe',
        imageUrl: "www.link.to/movie/coverartwork"
    }

]

const users = [
    {
        id: '1',
        firstName: 'Captain',
        lastName: 'Steve',
        email: 'captainsteve@mail.com'
    },
    {
        id: '2',
        firstName: 'Captain',
        lastName: 'Sam',
        email: 'falcon@mail.com'
    }
];*/

// Returning a welcome message
app.get('/', (req, res) => {
    res.send('<h1>Welcome to SuperFlix!</h1>');
});

// Returning the list of all movies
app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Returning a list of all users
app.get('/users', (req, res) => {
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Return data about a single movie by title
app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Return data about a series by name
app.get('/movies/series/:Name', (req, res) => {
    Movies.find({ 'Series.Name': req.params.Name })
    .then((series) => {
        res.json(series);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Return data about a director by name
app.get('/movies/directors/:Name', (req, res) => {
    Movies.find({ 'Director.Name': req.params.Name })
        .then((director) => {
            res.json(director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Allow new users to register
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
    .then((user) => {
        if (user) {
            return res.status(400).send(req.body.Username + 'already exists');
        } else {
            Users
            .create({
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            })
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

// Update a user's info, by username
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate(
        { Username: req.params.Username }, 
        { 
            $set: {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
        }
    },
    { new: true },
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

// Allow users to add a movie to their list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove ({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('MyFlix is listening on port 8080.');
});


