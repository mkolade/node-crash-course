
//USING EXPRESS APP//
const express = require('express');

//USING MORGAN MIDDLEWARE
const morgan = require('morgan')

//USING MONGOOSE
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');

//Instance of express app
const app = express()

//Mongodb connection
const dbUrl = 'mongodb+srv://moshoodmohammed:managermuhkid@cluster1.e4kvies.mongodb.net/node-tuit?retryWrites=true&w=majority'
mongoose.connect(dbUrl)
.then((result) => {
    app.listen(3000)
    console.log('connected to db')
})
.catch((err) => console.log(err))



//Register view engine
app.set('view engine','ejs')


//middlewares & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
//Using morgan middleware:- this is to show details on console
app.use(morgan('dev'))

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

app.get('/blogs',(req,res) =>{
    Blog.find().sort({createdAt: -1})
        .then((result) =>{
            res.render('index',{title:'All blogs',blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/blogs',(req,res) =>{
    const blog = new Blog(req.body)
    blog.save()
        .then((result) =>{
            res.redirect('/')
        })
        .catch((err) =>{
            console.log(err)
        })
})

app.delete('/blogs/:id',(req,res) =>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then((result) =>{
            res.json({redirect:'/blogs'}) 
        })
        .catch(err => console.log(err))
})

app.get('/blogs/:id',(req,res)=>{
    //to get the id 
    const id = req.params.id
    //console.log(id)

    Blog.findById(id)
        .then((result) =>{
            res.render('details',{blog:result,title:'Blog Details'})
        })
        .catch((err) =>{
            console.log(err)
        })
})

app.get('/about',(req,res) =>{
    //res.send('<p>About page</p>')
    //res.sendFile('./views/about.html',{root: __dirname})
    res.render('about',{title: 'About'})
})

app.get('/create',(req,res) => {
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
