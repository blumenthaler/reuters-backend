const Joi = require('joi')
const express = require('express')
const app = express()
app.use(express.json())

// const scraper = require('./topStoryScraper')
// const tech = require('./topTechScraper')
const port = process.env.PORT || 3000

// app.get()
// app.post()
// app.put()
// app.delete()
// app.listen()

// seed
const articles = [
    {id: 1, title: 'An Article', content: 'This is an article I wrote'},
    {id: 2, title: "Martin Scorsese's Favorite Marvel Movies", content: "Another article, about movies and their cultural value"}
]

// Root
app.get('/', (req, res) => {
    res.send('This is the Web Scraper API...\n Glad you could make it!')
})

// Articles
// Index: collection of articles, scraped from Reuters homepage
app.get('/api/articles', (req, res) => {
    res.send({articles})
})

// Get one article by id
app.get('/api/articles/:id', (req, res) => {
    const article = articles.find(article => article.id === parseInt(req.params.id)) 
    if (!article) res.status(404).send('Article with given id not found')
    res.send(article)
})

app.post('/api/articles', (req, res) => {
    console.log(res.body)
    const result = validateArticle(req.body)
    const {error} = result
    if (error) {
        res.status(400).send(error.details[0].message)
        console.log(error)
        return;
    }
    else {
        console.log("Success!")
        const article = {
            // placeholder for articles
            id: articles.length + 1,
            title: req.body.title,
            content: req.body.content
        }
        articles.push(article)
        res.send(article)
    }
    
})

const validateArticle = article => {
    const schema = {
        title: Joi.string().min(4).required(),
        content: Joi.string().min(4).required()
    }
    return Joi.validate(article, schema)
} 

app.listen(port, () => console.log(`Listening on port ${port}...`))