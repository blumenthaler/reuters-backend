const rp = require('request-promise');
// const fetch = require("node-fetch");
const $ = require('cheerio');

const sendTopStory = require('./sendTopStory')
const REUTERS_URL = 'https://www.reuters.com/technology'
const API_URL = "http://localhost:3000/"

let title, final
let content = []
let links = {}

const fiveAfterTopTech = () => {
    rp(REUTERS_URL)
        .then(html => {
            // get the the first five articles
            const articleArray = $('.story-content > a', html).splice(0, 5)

            // collect their URLs
            for (let i = 0; i < articleArray.length; i++) {
                links[i] = REUTERS_URL + articleArray[i].attribs.href
            }
            
            // "click" on each link & get the content
            for (const index in links) {
                console.log(`${index}: ${links[index]}`)
            }

      
        })

        


            // rp (full)
            //     .then(html => {
            //         // get article's headline
            //         title = $('h1', html)[0].children[0].data
            //        // get article content
            //         const contentParagraphs = $('p', html)
           
           
            //         for (const property in contentParagraphs) {
            //             if (contentParagraphs[property].children) {
            //                 const firstChild = contentParagraphs[property].children[0]
            //                 if (firstChild?.data) {
            //                     content.push(firstChild.data)
            //                 }
            //             }
            //         }
            //         final = content.join('\n')
            //           // add article to database
            //         const sendable = {
            //             title,
            //             content: final
            //         }
            //         console.log(title)
            //         console.log(final)
            //         sendTopStory.sendTopStory(sendable)
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     })
            // })
            // .catch(error => {
            //     console.log(error)
            // })
}



fiveAfterTopTech()

exports.fiveAfterTopTech = fiveAfterTopTech