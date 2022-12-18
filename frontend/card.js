import {q, create} from './helper.js'
import {PROJECT_ID, DATASET} from './index.js'

function createCardLeft(index, list) {
    const div = create('div', 'card__left')
    const count = create('span', 'card__count')
    const bookmark = create('img', 'card__bookmark')

    count.textContent = `${index+1}/${list.length}`;
    bookmark.src = './images/bookmark.svg'
    bookmark.alt = 'bookmark a product'
    
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
    const price = create('div', 'card__middle--price');

    brand.textContent = card.brand_name;
    product.textContent = card.product_name;
    price.textContent = `$${card.price} at Amazon 🛒`;

    // div.appendChild(div2)
    div.appendChild(brand)
    div.appendChild(product)
    div.appendChild(line)
    div.appendChild(price)

    return div;
}

export function createCard(card, index, list) {
    const li = create('li')
    const a = create('a');
    const card__left = createCardLeft(index, list);
    const card__mid = createCardMid(card);

    a.classList.add('card')
    a.href = card.affiliate_link;

    li.appendChild(a);
    a.appendChild(card__left);
    a.appendChild(card__mid);
    
    const img = create('img')
    img.classList.add('card__img')
    // docs: https://www.sanity.io/docs/image-urls
    // ?. optional chaining used because some cards from api don't have regular image, instead they have amazon html
    const _ref = card?.image?.asset._ref.split('-');
    if(_ref === undefined) {
        // this uses .amazon_image_url
        const div = create('div');
        div.innerHTML = card.amazon_image_url;
        a.appendChild(div)
    } else {
        const image_url = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${_ref[1]}-${_ref[2]}.${_ref[3]}?h=200`;
        img.src = image_url;
        img.alt = card.brand_name + ' ' + card.product_name;
        a.appendChild(img)
    }
    
    return li;
}