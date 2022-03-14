const express = require('express');

const app = express();

app.listen(3000);

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// Rout web-pages
app.get('/', (req,res) => {
    //res.send('<p> home page <p/>');
    res.render('index');
});

app.get('/about', (req,res) => {
    res.render('about')
});

app.get('/about-us', (req,res) => {
    res.redirect('/about');
});

app.get('/blogs/create', (req, res) => {
    res.render();
});

app.use((use, res) => {
    res.status(404).render('404')
});