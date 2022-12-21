import {q, create, noop} from './helper.js'
import {createCard} from './card.js'

export let PROJECT_ID = "e47h2o9m";
export let DATASET = "production";
// _type is the value of the inital name value of (card.js) schema document
let QUERY = encodeURIComponent('*[_type == "lists"]');
let PROJECT_URL = `https://${PROJECT_ID}.apicdn.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

// localStorage.clear()

fetch(PROJECT_URL)
    .then((res) => res.json())
    // destructure result object b/c others don't matter
    .then(({ result }) => {
        console.log('fetch results', result)
        result.reverse().forEach((list, index) => {
            const main = q('.main')
            const article = createArticle(list, index)

            main.appendChild(article)

            createScrollAnchor(list, index);
        })
        scrollAnchorActiveStyle()
        scrollBtnObserver()
        scrollBtnClick()
    })
    .catch((err) => console.error(err));

function createArticle(list, index) {
    const article = create('article', 'article')
    const header = create('header', 'article--top')
    const ol = create('ol', 'article__list')

    article.id = `list${index + 1}`
    if (index === 0) {
        article.classList.add('article--first')
        // Then if any anchor is clicked it will check first article element and remove article--first
    }
    
    const updatedTime = list._updatedAt
    let t = updatedTime.slice(0,10).split('-')
    t = `${t[1]}-${t[2]}-${t[0]}`

    header.innerHTML = `
        <h1 class="article__h1">${list.list_name}</h1>
        <p class="article__summary">${list.list_summary ? list.list_summary : ''}</p>
        <span class="article__date">Last updated ${t}</span>
    `;
    
    list.cards.forEach((card, index, list) => {
        ol.appendChild(createCard(card, index, list))
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
    const prev = document.querySelector('.scrollBtn--prev')
    const next = document.querySelector('.scrollBtn--next')
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
        threshold: 0
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
        // disappear arrow when the whole last thing is visible
        threshold: 1
    })
    observer2.observe(scrollAnchors[scrollAnchors.length - 1]);
}
function scrollAnchorActiveStyle() {
    // Uses event delegation
    // Run the event not on each individual anchor tag but rather on the whole container that holds the anchor tags.
    const anchors = q('.scrollAnchor')

    anchors[0].classList.add('scrollAnchor--active')

    q('.scrollCtr').addEventListener('click', (e) => {
        let target = e.target;
        // If the event.target is not an anchor tag we don't care about it.
        if (target.tagName !== 'A') return;

        anchors.forEach(anchor => {
            // Removes homepage article, after first :target click
            function removeFirstArticle() {
                if (q('.article')[0].classList.contains('article--first'))
                {
                    q('.article')[0].classList.remove('article--first')
                }
                // points to no operation function after done running, so it only runs once.
                removeFirstArticle = noop
            }
            removeFirstArticle()
            // Removes any active class, so a new active can be added below
            anchor.classList.remove('scrollAnchor--active');
        })
    
        target.classList.add('scrollAnchor--active')
    })
}
function scrollBtnClick() {
    const scrollCtr = q('.scrollCtr')
    q('.scrollBtn--next').addEventListener('click', xScroll)
    q('.scrollBtn--prev').addEventListener('click', xScroll)
    function xScroll(e) {
        if (e.target.classList.contains('scrollBtn--next')) {
            scrollCtr.scrollLeft += scrollCtr.clientWidth
        } else {
            scrollCtr.scrollLeft -= scrollCtr.clientWidth
        }
    }                
}

function changeBookmarkButtonPosition() {
    if(window.innerWidth > 865) {
        const offsetRight = (window.innerWidth - 700) / 2 - 75;
        q('.wishlist').style.right = offsetRight + 'px';
        console.log('triggered')
    }
}
let doit;
changeBookmarkButtonPosition();
window.addEventListener('resize', (e) => {
    clearTimeout(doit)
    doit = setTimeout(changeBookmarkButtonPosition, 1000)
})