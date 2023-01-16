const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require( './rest/routes/user.routes.js');
const professionRoutes = require( './rest/routes/profession.routes.js');
const genreRoutes = require( './rest/routes/genre.routes.js');
const awardRoutes = require( './rest/routes/award.routes.js');
const winnersRoutes = require( './rest/routes/awardwinners.routes.js');
const celebrityRoutes = require( './rest/routes/celebrity.routes.js');
const eventRoutes = require( './rest/routes/event.routes.js');
const movieRoutes = require( './rest/routes/movie.routes.js');
const roleRoutes = require( './rest/routes/moviecelebrity.routes.js');
const newsRoutes = require( './rest/routes/news.routes.js');
const reviewRoutes = require( './rest/routes/review.routes.js');
const { sequelize, Review, Movie} = require('./models');
const http = require('http');
const jwt = require('jsonwebtoken');
const history = require('connect-history-api-fallback');
const path = require('path');


const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});



app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());


app.use('/users', userRoutes);
app.use('/awards', awardRoutes);
app.use('/winners', winnersRoutes);
app.use('/celebrities', celebrityRoutes);
app.use('/events', eventRoutes);
app.use('/genres', genreRoutes);
app.use('/movies', movieRoutes);
app.use('/roles', roleRoutes);
app.use('/news', newsRoutes);
app.use('/professions', professionRoutes);
app.use('/reviews', reviewRoutes);

function authSocket(msg, next) {
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        const token = msg[1].token.split(' ')[1];
      
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}

io.on('connection', socket => {
    socket.use(authSocket);
    socket.on('comment', msg => {
        const userId = msg.user.id;
        const username = msg.user.username;
        const movieId = msg.movieId;
        const anonimous = msg.anonimous;
        const comment = msg.comment;
        const rating = msg.rating;
        
        const review = {movieId, userId, username, comment,rating};
        if(anonimous==true){
            review.username="unknown";
        }
        console.log(review);
        Review.create(review)
            .then( rows => {
                console.log(rows.id);
                Review.findOne({ where: { id: rows.id }, include: [{ model: Movie, as: 'movie' }] })
                    .then( msg1 => {
                        console.log("created");
                        io.emit('comment', JSON.stringify(msg1))} ) 
            }).catch( err => socket.emit('error', err.message) );
    });

    socket.on('error', err => socket.emit('error', err.message) );
});


// ovo zakomentarisemo i odemo u env dodamo NODE_ENV=production
const staticMdl = express.static(path.join(__dirname, 'dist'));

app.use(staticMdl);

app.use(history({ index: '/index.html' }));

app.use(staticMdl);

server.listen(4000 , ( ) => {
    console.log('Rest service running on port 4000');
})