import {q, create} from './helper.js'
import {createCard} from './card.js'

export let PROJECT_ID = "e47h2o9m";
export let DATASET = "production";
// _type is the value of the inital name value of (card.js) schema document
let QUERY = encodeURIComponent('*[_type == "lists"]');
let PROJECT_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

fetch(PROJECT_URL)
    .then((res) => res.json())
    // destructure result object b/c others don't matter
    .then(({ result }) => {
        result.forEach((list, index) => {
            const main = q('.main')
            const article = createArticle(list, index)

            main.appendChild(article)

            createScrollAnchor(list, index);
        })
        scrollAnchorActiveStyle()
        scrollBtnObserver()
    })
    .catch((err) => console.error(err));

function createArticle(list, index) {
    const article = create('article', 'article')
    const header = create('header', 'article__top')
    const ol = create('ol', 'article__list')

    article.id = `list${index + 1}`
    if (index === 0) {
        article.classList.add('article--first')
        // Then if any anchor is clicked it will check first article element and remove article--first
    }

    header.innerHTML = `
        <h1 class="main__h1">${list.list_name}</h1>
        <span class="main__date">Last updated ${list.last_updated_date}</span>
    `;

    list.cards.forEach((card, index) => {
        ol.appendChild(createCard(card, index))
    })

    article.appendChild(header)
    article.appendChild(ol)
    return article
}

/* All for scroll contianer */
function createScrollAnchor(list, index) {  
    const scrollCtr = q('.scrollCtr');

    const a = create('a', 'scrollAnchor');
    
    a.textContent = list.list_name;
    a.href = `#list${index + 1}`;

    scrollCtr.appendChild(a);
}
function scrollBtnObserver() {
    // Intersection Observer API
    // Scroll Bar & it's scroll buttons & functionality
    const prev = document.querySelector('.scrollBtn__prev')
    const next = document.querySelector('.scrollBtn__next')
    const nav = document.querySelector('nav.scrollCtr')
    // don't use q helper function for scrollAnchors
    const scrollAnchors = document.querySelectorAll('.scrollAnchor')
    
    // Checks if first item is in out of view, if true adds the scroll left button
    let callback = (entry, observer) => { 
        // entry means IntersectionObserverEntry. It is in an array and to access the data we need to index[0].
        if (entry[0].isIntersecting) {
            // if intersecting is true hide the prev arrow
            prev.classList.add('hide1')
            prev.classList.remove('show')
        } else {
            prev.classList.remove('hide1')
            prev.classList.add('show')
        } 
    }
    let options = {
        root: nav,
        rootMargin: '0px',
        threshold: .5
    }
    let observer = new IntersectionObserver(callback, options);
    observer.observe(scrollAnchors[0])
    
    
    // Checks if last item is in view, if true removes the scroll right button
    let observer2 = new IntersectionObserver((entry) => {
        // if the last item is visible, hide next btn
        if(entry[0].isIntersecting) {
            next.classList.add('hide2');
            next.classList.remove('show');
        } else {
            next.classList.remove('hide2');
            next.classList.add('show');
        }
    }, 
    {
        root: nav,
        rootMargin: '0px',
        threshold: 0
    })
    observer2.observe(scrollAnchors[scrollAnchors.length - 1]);
}
function scrollAnchorActiveStyle() {
    // Uses event delegation
    // Run the event not on each individual anchor tag but rather on the whole container that holds the anchor tags.
    const anchors = q('.scrollAnchor')

    q('.scrollCtr').addEventListener('click', (e) => {
        let target = e.target;
        // If the event.target is not an anchor tag we don't care about it.
        if (target.tagName !== 'A') return;

        
        anchors.forEach(anchor => {
            // Removes homepage article, after first :target click
            if (q('.article')[0].classList.contains('article--first'))
            {
                q('.article')[0].classList.remove('article--first')
            }
            // This is for styles
            anchor.classList.remove('active');
        })
    
        target.classList.add('active')       
    })
}