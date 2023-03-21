 //USING EXPRESS APP//
const express = require('express');

//USING MORGAN MIDDLEWARE
const morgan = require('morgan')

//USING MONGOOSE
const mongoose = require('mongoose');
const { result } = require('lodash');

//Instance of express app
const app = express()

//Mongodb connection
const dbUrl = 'mongodb+srv://moshoodmohammed:managermuhkid@cluster1.e4kvies.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbUrl)
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

//mongoose and mongodb sandbox routes


//Register view engine
app.set('view engine','ejs')
//to use different folder name as the default is {views}
//app.set('views','myviews')


//To listen for requests
/* app.listen(3000); */

/* //Using Middleware
app.use((req,res,next) =>{
    console.log('new request made')
    console.log('host:',req.hostname)
    console.log('path:',req.path)
    console.log('method:',req.method)
    next()
})
s
app.use((req,res,next) =>{
    console.log('In the next middleware')
    next()
}) */
//middlewares & static files
app.use(express.static('public'))
//Using morgan middleware
app.use(morgan('dev'))

//send html file
app.get('/',(req,res) =>{
    //res.send('<p>Home page</p>')
    //res.sendFile('./views/index.html',{root: __dirname})
    const blogs =[
        {title: 'Yoshi finds eggs',snippet:'Lorem ipsum sit amet consectetur'},
        {title: 'Mario finds Stars',snippet:'Lorem ipsum sit amet consectetur'},
        {title: 'How to defeat browser',snippet:'Lorem ipsum sit amet consectetur'}
    ]
    res.render('index',{title: 'Home',blogs/* ,blogs: blogs */})
})

app.get('/about',(req,res) =>{
    //res.send('<p>About page</p>')
    //res.sendFile('./views/about.html',{root: __dirname})
    res.render('about',{title: 'About'})
})

app.get('/blogs/create',(req,res) => {
    res.render('create',{title: 'Create a new blog'})
})

/* //redirects
app.get('/about-us',(req,res) => {
    res.redirect('/about')
}) */

//404s---has to be the last function in the order
app.use((req,res) =>{
    //res.status(404).sendFile('./views/404.html',{root: __dirname})
    res.status(404).render('404',{title: '404'})
})
