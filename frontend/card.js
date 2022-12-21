import {q, create} from './helper.js'
import {PROJECT_ID, DATASET} from './index.js'

function createCardLeft(index, list) {
    const div = create('div', 'card__left')
    const count = create('span', 'card__count')
    const bookmark = create('img', 'card__bookmark')

    // depending on local stoarge and the key of the card I need to decide to highlight the bookmark or not
    const key = list[index]['_key']; // unique _key from card
    const value = JSON.stringify(list[index]); // a card obj
    
    if (localStorage.getItem(key) === null) {
        bookmark.src = './images/bookmark.svg'
        bookmark.classList.remove('card__bookmark--active')
    } else {
        bookmark.classList.add('card__bookmark--active')
        bookmark.src = './images/bookmark--active.svg'
    }
    bookmark.alt = 'bookmark a product'
    bookmark.title = 'Save this item to a list'
    bookmark.tabIndex = 0
    count.textContent = `${index+1}/${list.length}`;

    // For localStorage: now I can use key to access obj elsewhere

    // both key and value end up being string values

    // BUG!! When I add key to localStorage, check bookmark.html, initially it is correct. When I go back to index.html and try to remove the same item that was added it does not get removed. Instead the same key and value is added again.
    function handlingLocalStorage(e) {
        // preventDefault is for keypress listener space button
        e.preventDefault();
        if(e.target.classList.contains('card__bookmark--active')) {
            bookmark.classList.remove('card__bookmark--active')
            bookmark.src = './images/bookmark.svg'
            localStorage.removeItem(key)
            console.log('key removed', {key}, {value})
        } else {
            bookmark.classList.add('card__bookmark--active')
            bookmark.src = './images/bookmark--active.svg'
            localStorage.setItem(key, value)
            console.log('key added', {key}, {value})
        }
    }
    bookmark.addEventListener('click', handlingLocalStorage)
    bookmark.addEventListener('keypress', handlingLocalStorage)
    
    div.appendChild(count)
    div.appendChild(bookmark)
    return div
}

function createCardMid(card) {
    const div = create('div', 'card__middle')
    // div2 is for spacing with flexbox
    // const div2 = create('div')
    const brand = create('p');
    const product = create('h3');
    const line = create('div', 'card__middle--line');
    const price = create('a', 'card__middle--price');

    brand.textContent = card.brand_name;
    product.textContent = card.product_name;
    price.textContent = `$${card.price} at Amazon 🛒`;
    price.href = card.affiliate_link;
    price.title = 'View product page'

    // div.appendChild(div2)
    div.appendChild(brand)
    div.appendChild(product)
    div.appendChild(line)
    div.appendChild(price)

    return div;
}

export function createCard(card, index, list) {
    // each card is like a bullet in a list
    const li = create('li', 'article__list--li')
    const cardCtr = create('div', 'card');
    const card__left = createCardLeft(index, list);
    const card__mid = createCardMid(card);

    li.appendChild(cardCtr);
    cardCtr.appendChild(card__left);
    cardCtr.appendChild(card__mid);
    
    // docs: https://www.sanity.io/docs/image-urls
    // ?. optional chaining used because some cards from api don't have regular image, instead they have amazon html
    const _ref = card?.image?.asset._ref.split('-');
    if(_ref === undefined) {
        // this uses .amazon_image_url
        // Amazon already has an anchor tag in the html, so a div is ok
        const div = create('div')
        div.title = 'View product page'
        div.innerHTML = card.amazon_image_url;
        
        // No need to add the extra div to the DOM
        // I ended up using div to use .title property
        cardCtr.appendChild(div)
    } else {
        const a = create('a')
        a.href = card.affiliate_link;

        const img = create('img', 'card__img')
        img.src = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${_ref[1]}-${_ref[2]}.${_ref[3]}?h=200`;
        img.alt = card.brand_name + ': ' + card.product_name;

        a.appendChild(img)
        cardCtr.appendChild(a)
    }
    
    return li;
}