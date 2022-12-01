
let PROJECT_ID = "e47h2o9m";
let DATASET = "production";
// _type is the value of the inital name value of card.js
let QUERY = encodeURIComponent('*[_type == "lists"]');
// Compose the URL for your project's endpoint and add the query
let PROJECT_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;


fetch(PROJECT_URL)
    .then((res) => res.json())
    // destructure result object b/c others don't matter
    .then(({ result }) => {
        console.log(result)
        
        result[1].cards.forEach((card, index) => {
            createCard(card, index)
        })

        //[0] right now but I will want to .forEach this for each list
        result.forEach(list => {
            createScrollCtr__item(list);
        })

    })
    .catch((err) => console.error(err));

function createScrollCtr__item(obj) {
    const scrollCtr = document.querySelector('.scrollCtr');
    const div = document.createElement('div');
    div.classList.add('scrollCtr__item');
    const a = document.createElement('a');
    // Think about how I will link each item to their appropriate list
    // a.href = obj.
    a.textContent = obj.list_name;
    
    div.appendChild(a);
    scrollCtr.appendChild(div);
}
    
    
function createCard(atr, index) {
    const orderedListEl = document.querySelector('.list');

    const li = document.createElement('li')
    const span = document.createElement('span')
    span.classList.add('card__left')
    const div = document.createElement('div')
    div.classList.add('card__middle')
    const img = document.createElement('img')
    img.classList.add('card__img')
    span.textContent = index + 1;
    

    const mid__p = document.createElement('p');
    mid__p.textContent = atr.brand_name;
    div.appendChild(mid__p)
    const mid__h3 = document.createElement('h3');
    mid__h3.textContent = atr.product_name;
    div.appendChild(mid__h3)
    const mid__span = document.createElement('span');
    // check if num is implicity converted to string here
    mid__span.textContent = `$${atr.price}`;
    div.appendChild(mid__span)
    
    // docs: https://www.sanity.io/docs/image-urls
    const _ref = atr.image.asset._ref.split('-');
    const image_url = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${_ref[1]}-${_ref[2]}.${_ref[3]}?h=200`;
    img.src = image_url;
    img.alt = atr.brand_name + ' ' + atr.product_name;
    
    const a = document.createElement('a');
    a.classList.add('card')
    a.href = atr.affiliate_link;

    li.appendChild(a);
    a.appendChild(span)
    a.appendChild(div)
    a.appendChild(img)

    orderedListEl.appendChild(li);
}

// Scroll Bar & it's scroll buttons & functionality
const prev = document.querySelector('.scrollBtn__prev')
const next = document.querySelector('.scrollBtn__next')
const nav = document.querySelector('nav.scrollCtr')
const scrollCtr__items = document.querySelectorAll('.scrollCtr__item')


// Intersection Observer API
let callback = (entries, observer) => {  
    if (!entries[0].isIntersecting) {
        prev.classList.remove('hide1')
        prev.classList.add('show')
    } else {
        prev.classList.add('hide1')
        prev.classList.remove('show')
    } 
}
let options = {
    root: nav,
    rootMargin: '0px',
    threshold: .5
}
let observer = new IntersectionObserver(callback, options);
observer.observe(scrollCtr__items[0])


let observer2 = new IntersectionObserver((entries) => {
    // if the last item is visible, hide next btn
    if(entries[0].isIntersecting) {
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
observer2.observe(scrollCtr__items[scrollCtr__items.length - 1]);
