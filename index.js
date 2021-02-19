const express = require('express')
const app = express()

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
        {id: 2, author: 'someone else', content: "Another article, about finance or something."}
    ]})
})


app.listen(3000, () => console.log('Listening on port 3000...'))