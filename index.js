const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// app.get()
// app.post()
// app.put()
// app.delete()
// app.listen()

// seed
const articles = [
    {id: 1, author: 'Alex B', content: 'This is an article I wrote'},
    {id: 2, author: 'Martin Scorsese', content: "Another article, about movies and their cultural value"}
]

// Root
app.get('/', (req, res) => {
    res.send('Hello World')
})

// Articles
// Index: ollection of articles, scraped from Reuters homepage
app.get('/api/articles', (req, res) => {
    res.send({articles})
})

// Get one article by id
app.get('/api/articles/:id', (req, res) => {
    const article = articles.find(article => article.id === parseInt(req.params.id))
    if (!article) res.status(404).send('Article with given id not found')
    res.send(article)
    
})

app.listen(port, () => console.log(`Listening on port ${port}...`))