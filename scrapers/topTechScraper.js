const rp = require('request-promise');
// const fetch = require("node-fetch");
const $ = require('cheerio');

const sendArticle = require('./sendArticle')
const REUTERS_URL = 'https://www.reuters.com/technology/'
const API_URL = "http://localhost:3000/"

let title, final
let content = []


const topTechScraper = () => {
    rp(REUTERS_URL)
        .then(html => {
            // gets link for topstory tech article
            const link = $('.story-content > a', html)[0].attribs.href
            const full = REUTERS_URL + link
            console.log(link)
            rp (full)
                .then(html => {
                    // get article's headline
                    title = $('h1', html)[0].children[0].data
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
                    final = content.join('\n')
                      // add article to database
                    const sendable = {
                        title,
                        content: final
                    }
                    console.log(title)
                    console.log(final)
                    sendArticle.sendArticle(sendable)
                })
                .catch(error => {
                    console.log(error)
                })
            })
            .catch(error => {
                console.log(error)
            })
}


topTechScraper()

exports.topTechScraper = topTechScraper