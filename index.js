const bodyParser = require('body-parser');
const express = require('express');
    morgan = require('morgan');
    uuid = require('uuid');

const app = express();

// Logging middleware
app.use(morgan('common'));
// For the sending of static files
app.use(express.static('public'));
app.use(bodyParser.json());

// An array of objects with the first 10 Marvel movies
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
];

// Returning a welcome message
app.get('/', (req, res) => {
    res.send('<h1>Welcome to myFlix!</h1>');
});

// Returning the list of all movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// Returning a list of all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Return data about a single movie by name/title
app.get('/movies/:title', (req, res) => {
    res.json(topMovies.find((movie) => {
       return movie.title === req.params.title
    }));
});

// Return data about a movie by series
app.get('/movies/:series', (req, res) => {
    res.json(topMovies.find((movie) => {
       return movie.title === req.params.series
    }));
});

// Return data about a director by name
app.get('/movies/:director', (req, res) => {
    res.json(topMovies.find((_director) => {
        return movie.title === req.params.director
    }));
});

// Allow new users to register
app.post('/users', (req, res) => {
    let newUser = req.body;

    if (!newUser.firstName || !newUser.email) {
        let message = 'You must specify at least your first name and email address';
        res.status(400).send(message);
    } else {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).send(newUser);
    }
});

// Allow users to update their user info
app.put('/users/:id', (req, res) => {
    let changeUser = users.find((user) => user.id === req.params.id);

    if (changeUser && req.body.firstName) {
        changeUser.firstName = req.body.firstName;
        res.status(201).send('User with ID ${req.params.id} has been successfully updated');
    } else if (changeUser && req.body.lastName) {
        changeUser.lastName = req.body.lastName;
        res.status(201).send('User with ID ${req.params.id} has been successfully updated');
    } else if (changeUser && req.body.email) {
        changeUser.email = req.body.email;
        res.status(201).send('User with ID ${req.params.id} has been successfully updated');
    } else if (Object.keys(req.body).length === 0) {
        res.status(400).send('Please specify what values to be changed.');
    } else {
        res.status(400).send('There is no user with IB ${req.params.id}');
    }
});

// Allow users to add a movie to their list of favorites
app.post('/users/:id/favorites/:movieTitle', (req, res) => {
    let validUser = users.find((user) => {
        return user.id === req.params.id
    });
    let validMovie = topMovies.find((movie) => {
        return movie.title === req.params.movieTitle
    });

    if (validUser && validMovie) {
        //Insert a function that posts a movie to the user's favorites which should be an object
        res.status(201).send('Movie successfully added to your favorites list.');
    } else {
        res.status(400).send('Please specift a valid user and movie to be added to the favorites list');
    }
})

// Allow users to remove a movie from their list of favorites
app.delete('/users/:id/favorites/:movieTitle', (req, res) => {
    let validUser = users.find((user) => {
        return user.id === req.params.id
    });
    let validMovie = topMovies.find((movie) => {
        return movie.title === req.params.movieTitle
    });

    if (validUser && validMovie) {
        //Insert a function that deletes a movie from the user's favorites which should be an object
        res.status(201).send('Movie successfully removed from your favorites list.');
    } else {
        res.status(400).send('Please specift a valid user and movie to be removed from the favorites list');
    }
})

// Allow existing users to deregister
app.delete('/users/:id', (req, res) => {
    let remUser = users.find((user) => {
        return user.id === req.params.id
    });

    if (remUser) {
        //Insert a function that deletes a specific user
        res.status(201).send('User with ID ${req.params.id} has been successfully deleted.');
    } else {
        res.status(400).send('There is no user with ID ${req.params.id}');
    }
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('MyFlix is listening on port 8080.');
});


