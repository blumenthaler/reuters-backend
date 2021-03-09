const rp = require('request-promise');
const fetch = require("node-fetch");
const URL = 'https://www.reuters.com/'
const $ = require('cheerio');

const API_URL = "http://localhost:3000/"

let title, final
let content = []


const scraper = () => {
    rp(URL)
        .then(html => {
            // gets link for topstory article
            const link = $('h2 > a', html)[1].attribs.href
            const full = URL + link
            // console.log(full)
            rp (full)
                .then(html => {
                    // get article's headline
                    title = $('h1', html)[0].children[0].data

                    // get article content
                    const contentParagraphs = $('.Paragraph-paragraph-2Bgue.ArticleBody-para-TD_9x', html)
                    for (const property in contentParagraphs) {
                        if (contentParagraphs[property].children) {
                            const firstChild = contentParagraphs[property].children[0]
                            if (firstChild?.data) {
                                content.push(firstChild.data)
                            }
                        }
                    }
                    final = content.join('\n')
                    // add article to database
                    const sendable = {
                        title,
                        content: final
                    }
                    console.log(title)
                    console.log(final)
                    sendTopStory(sendable)
                 
                })
                .catch(error => {
                    console.log(error)
                })
        })
        .catch(error => {
            console.log(error)
        })
}

const sendTopStory = articleData => {
    return fetch(API_URL + "api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleData)
    }).then(resp => resp.json())
    .then(data => console.log("Success: " + data))
    .catch(error => console.log(error))
}

scraper()

exports.scraper = scraper