const fetch = require("node-fetch");
const API_URL = "http://localhost:3000/"

const sendArticle = articleData => {
    return fetch(API_URL + "api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleData)
    }).then(resp => resp.json())
    .then(data => console.log("Success: " + data))
    .catch(error => console.log(error))
}

exports.sendArticle = sendArticle