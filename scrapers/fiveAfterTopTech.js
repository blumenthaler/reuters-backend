const rp = require('request-promise');
const $ = require('cheerio');

const sendArticle = require('./sendArticle')
const REUTERS_URL = 'https://www.reuters.com/technology'
const API_URL = "http://localhost:3000/"

let links = {}

const fiveAfterTopTech = () => {
    rp(REUTERS_URL)
        .then(html => {
            // get the the first five articles in technlogy
            const articleArray = $('.story-content > a', html).splice(0, 5)

            // collect their URLs
            for (let i = 0; i < articleArray.length; i++) {
                links[i] = REUTERS_URL + articleArray[i].attribs.href
            }
            
            // "click" on each link & get the content
            for (const index in links) {
                console.log(`${index}: ${links[index]}`)
                rp(links[index])
                    .then(html => {
                        if (html.statusCode == 404) {
                            console.log("Not Found")
                        }
                        // get article's headline
                        let title = $('h1', html)[0].children[0].data
                        let content = []

                        // get article content
                        const contentParagraphs = $('p', html)
                        for (const property in contentParagraphs) {
                            if (contentParagraphs[property].children) {
                                const firstChild = contentParagraphs[property].children[0]
                                if (firstChild?.data) {
                                    content.push(firstChild.data)
                                }
                            }
                        }
                        let final = content.join('\n')
                        let article = {
                            title,
                            content: final
                        }
                        sendArticle.sendArticle(article)
                    })
                    .catch(error => console.log(`Something went wrong. Status Code: ${error.statusCode}`))
            }

      
        })
        .catch(error => console.log(error))
}



fiveAfterTopTech()

exports.fiveAfterTopTech = fiveAfterTopTech