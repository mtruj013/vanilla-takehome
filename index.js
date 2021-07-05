// get blog info from api
axios.get("https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json")
    .then(res => {
        let blogData = res.data;
        blogData.map(blog => {
            addCardData(blog)
        })
    })
    .catch(err => {
        console.log("no data returned", err)
    })

// define parent div
let parentDiv = document.querySelector('.div-container');


// create cards with data
function addCardData(data) {
    // create elements
    let cardDiv = document.createElement('div'),
        cardTopic = document.createElement('p'),
        cardImage = document.createElement('img'),
        cardBlogLink = document.createElement('a'),
        cardAuthorDate = document.createElement('h1'),
        cardAuthor = document.createElement('a'),
        cardDate = document.createElement('span'),
        cardType = document.createElement('p');


    // define topic, tag, and date
    let topic = data._embedded['wp:term'][2][0];
    let tag = data._embedded['wp:term'][1][0].name;

    let newDate = new Date(data.date).toLocaleDateString(
        'en-gb',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'utc'
        }
    )

    //add content
    topic ? cardTopic.textContent = topic.name : cardTopic.textContent = tag;
    cardImage.src = data.featured_media;
    cardBlogLink.href = data.link;
    cardBlogLink.textContent = data.title.rendered;
    cardAuthor.href = data._embedded.author[0].link;
    cardAuthor.textContent = data._embedded.author[0].name;
    cardDate.textContent = newDate;
    cardAuthorDate.innerHTML = `By ${cardAuthor.outerHTML} on ${cardDate.outerHTML}`;
    cardType.textContent = data.type;

    // add classes
    cardDiv.classList.add('p-card');
    cardDiv.classList.add('col-4')
    cardTopic.classList.add('p-text--small');
    cardTopic.classList.add('blog-topic');
    cardImage.classList.add('p-image--shadowed');
    cardBlogLink.classList.add('p-heading--4');
    cardAuthorDate.classList.add('p-heading--6');
    cardAuthor.classList.add('author');
    cardDate.classList.add('date');
    cardType.classList.add('p-text--small');
    cardType.classList.add('blog-type');

    // append
    cardDiv.append(cardTopic);
    cardDiv.append(cardImage);
    cardDiv.append(cardBlogLink);
    cardDiv.append(cardAuthorDate);
    cardDiv.append(cardType);

    // append to parent div
    parentDiv.append(cardDiv);
    

    return cardDiv;
}