const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const swaggerRoutes = require('./routes/swagger');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/', swaggerRoutes);

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => (res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}` : "Logged Out")));

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}), (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });


app.get('/login', passport.authenticate('github'), (req, res) => {});

app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

process.on('uncaughtException', (err, origin) => {
    console.error(`Caught exception: ${err}\nException Origin: ${origin}`);
});

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(process.env.PORT || port);
        console.log('Connected to MongoDB and Web Server is listening at ' + (process.env.PORT || port));
    }
});