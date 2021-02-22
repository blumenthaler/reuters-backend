const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// app.get()
// app.post()
// app.put()
// app.delete()
// app.listen()

// Root
app.get('/', (req, res) => {
    res.send('Hello World')
})

// Collection of articles, scraped from Reuters homepage
app.get('/api/articles', (req, res) => {
    // for now, dummy data
    res.send({articles: [
        {id: 1, author: 'Alex B', content: 'This is an article I wrote'},
        {id: 2, author: 'Martin Scorsese', content: "Another article, about movies and their cultural value"}
    ]})
})

app.listen(port, () => console.log(`Listening on port ${port}...`))