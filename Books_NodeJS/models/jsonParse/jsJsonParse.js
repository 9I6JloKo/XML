let Book = require('../books.js')
fetch('C:\\Users\\anana\\Documents\\XML\\Books_NodeJS\\models\\jsonParse\\toParse.json').then(response => response.json())
.then(json => {
        for (let i = 0; i < json.length; i++) {
            console.log(json[i]);
            Book.create({
                title: json[i].title,
                isbn: json[i].isbn,
                pageCount: json[i].pageCount,
                publishedDate: json[i].publishedDate.$date,
                thumbnailUrl: json[i].thumbnailUrl,
                shortDescription: json[i].shortDescription,
                longDescription: json[i].longDescription,
                status: json[i].status,
                author: json[i].authors,
                category: json[i].categories
            }).then(res => {
                console.log(res);
            }).catch(err => console.log(err));
        }
    }
)