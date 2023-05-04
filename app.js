
//to install package.json
//npm init -y
//USING EXPRESS APP//
const express = require('express');


//USING MORGAN MIDDLEWARE
const morgan = require('morgan')

//USING MONGOOSE
const mongoose = require('mongoose');
const { result } = require('lodash');

//Instance of express app
const app = express()

const blogRoutes = require('./Routes/blogRoutes')

//Mongodb connection
const dbUrl = 'mongodb+srv://moshoodmohammed:managermuhkid@cluster1.e4kvies.mongodb.net/node-tuit?retryWrites=true&w=majority'
mongoose.connect(dbUrl)
.then((result) => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log('connected to db')
    });
})
.catch((err) => console.log(err))



//Register view engine
app.set('view engine','ejs')


//middlewares & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
//Using morgan middleware:- this is to show details on console
app.use(morgan('dev'))

//This puts all the route handler urls with /blogs in front of them in blogRoutes
app.use('/blogs',blogRoutes)

//send html file
app.get('/',(req,res) =>{
    //res.send('<p>Home page</p>')
    //res.sendFile('./views/index.html',{root: __dirname})
   /*  const blogs =[
        {title: 'Yoshi finds eggs',snippet:'Lorem ipsum sit amet consectetur'},
        {title: 'Mario finds Stars',snippet:'Lorem ipsum sit amet consectetur'},
        {title: 'How to defeat browser',snippet:'Lorem ipsum sit amet consectetur'}
    ]
    res.render('index',{title: 'Home',blogs}) */
    res.redirect('/blogs')
})

app.get('/about',(req,res) =>{
    //res.send('<p>About page</p>')
    //res.sendFile('./views/about.html',{root: __dirname})
    res.render('about',{title: 'About'})
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
