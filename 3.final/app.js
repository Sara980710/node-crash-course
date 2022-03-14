const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');


const app = express();

const dbURI = 'mongodb+srv://sara980710:myPassword@node-crash-course.y6je3.mongodb.net/db?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log('Logged into database.');
        app.listen(3000);
    })
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//------Middlewares------
// Print info
app.use((req, res, next) => {
    console.log('-------------------------')
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.use(morgan('dev'));

// Static files
app.use(express.static('public'));

// To be able to get req variables from html
app.use(express.urlencoded({ extended: true }));


//------Rout web-pages------

// Blogs
app.use('/blogs', blogRoutes);

// Homepage
app.get('/', (req,res) => {
    //res.send('<p> home page <p/>');
    res.render('home', {title: 'Home'});
});

// About
app.get('/about', (req,res) => {
    res.render('about', {title: 'About'})
});

app.get('/about-us', (req,res) => {
    res.redirect('/about');
});

// 404
app.use((use, res) => {
    res.status(404).render('404', {title: '404'})
});