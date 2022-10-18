let Book = require('./models/books.js')
fetch('toParse.json').then(response => response.json())
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
                longDescription: json[i].longDescription,
                longDescription: json[i].longDescription,
                longDescription: json[i].longDescription,

            }).then(res => {
                console.log(res);
            }).catch(err => console.log(err));
        }
    }
)