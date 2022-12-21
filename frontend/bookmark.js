import {q, create} from './helper.js'

// instead of importing from index.js I decided for now to manually have POJECT_ID AND DATASET here because it would run the fetch() command in the bookmark.html, when it does not need to
let PROJECT_ID = "e47h2o9m";
let DATASET = "production";

const wrapper = q('.bookmark__list')
let totalPrice = 0;
if (localStorage.length === 0) {
    
} else {
    // delete html from bookmark.html that is for no bookmarked items
    wrapper.innerHTML = '';
    for (let i=0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const data = JSON.parse(localStorage.getItem(key));

        const bmCard = create('div', 'bookmark__card')
        const image = createImage(data)
        const brand = create('p', 'bookmark__card--brand');
        const product = create('h3', 'bookmark__card--product') 
        const price = create('a', 'bookmark__card--price')
        const deleteButton = create('div', 'deleteButton')
        
        image.classList.add('bookmark__card--image')
        brand.textContent = data.brand_name
        product.textContent = data.product_name
        deleteButton.textContent = 'X';
        deleteButton.title = 'Remove from list'

        // functinality to delete a card from localStorage and DOM
        deleteButton.addEventListener('click', (e) => {
            console.log(data)
            localStorage.removeItem(key)
            e.target.parentElement.outerHTML = '';
            // when we remove an element we want to decrease the price and items
            totalPrice -= data.price;
            q('.totalItems').textContent = `Items: ${localStorage.length}`
            q('.detail').textContent = `$${totalPrice}`
        })

        price.classList.add('card__middle--price')
        if (data.price) {
            price.textContent = `$${data.price} on Amazon`
            totalPrice += Number(data.price);
        } else {
            price.textContent = `Oops, a mistake`
        }
        price.href = data.affiliate_link

        image.title = 'View product page'
        price.title = 'Buy product here'
        
        wrapper.appendChild(bmCard)
        bmCard.appendChild(image)
        bmCard.appendChild(brand)
        bmCard.appendChild(product)
        bmCard.appendChild(price)
        bmCard.appendChild(deleteButton)
    }
}



q('.totalItems').textContent = `Items: ${localStorage.length}`
q('.detail').textContent = `$${totalPrice}`

function createImage(card) {
    const _ref = card?.image?.asset._ref.split('-');
    if(_ref === undefined) {
        // this uses .amazon_image_url
        const div = create('div')
        div.innerHTML = card.amazon_image_url;
        return div
    } else {
        const a = create('a')
        a.href = card.affiliate_link;
        
        const img = create('img', 'card__img')
        img.src = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${_ref[1]}-${_ref[2]}.${_ref[3]}?h=200`;
        img.alt = card.brand_name + ': ' + card.product_name;
        
        a.appendChild(img)
        return a
    }
}

function removeCard(e, key) {
    // e.target.innerHTML = '';
    localStorage.removeItem(key)
}