const rp = require('request-promise');
const URL = 'https://www.reuters.com/'
const $ = require('cheerio');

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
                    // const sendable = {
                    //     id: 3,
                    //     title,
                    //     content: final
                    // }
                    console.log(title)
                    console.log(final)
                 
                })
                .catch(error => {
                    console.log(error)
                })
        })
        .catch(error => {
            console.log(error)
        })
}

exports.scraper = scraper