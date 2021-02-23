const rp = require('request-promise');
const URL = 'https://www.reuters.com/'
const $ = require('cheerio');


rp(URL)
    .then(html => {
        // gets link for topstory article
        const link = $('h2 > a', html)[1].attribs.href
        const full = URL + link
        console.log(full)
        rp (full)
            .then(html => {
                // get article's headline
                const headline = $('h1', html)[0].children[0].data
                console.log(headline)
            })
            .catch(error => {
                console.log(error)
            })
    })
    .catch(error => {
        console.log(error)
    })