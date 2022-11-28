// for loop
for(let i=1; i <= 2; i++) {
    fetch(`http://localhost:1337/api/product-cards/${i}?populate=*`)
    .then((response) => response.json())
    .then((res) => {
        console.log(res)
        createCard(res)
    });

}

const listEl = document.querySelector('.list');

function createCard(res) {
    const li = document.createElement('li')
    li.classList.add('card')
    const span = document.createElement('span')
    span.classList.add('card__left')
    const div = document.createElement('div')
    div.classList.add('card__middle')
    const img = document.createElement('img')
    img.classList.add('card__img')
    span.textContent = res.data.id;
    
    const atr = res.data.attributes;
    
    const mid__p = document.createElement('p');
    mid__p.textContent = atr.brand;
    div.appendChild(mid__p)
    const mid__h3 = document.createElement('h3');
    mid__h3.textContent = atr.product;
    div.appendChild(mid__h3)
    const mid__span = document.createElement('span');
    // check if num is implicity converted to string here
    mid__span.textContent = `$${atr.price}`;
    div.appendChild(mid__span)
    
    // might want to change the size image I import
    img.src = atr.image.data.attributes.url;
    img.alt = atr.brand + ' ' + atr.product;
    
    li.appendChild(span)
    li.appendChild(div)
    li.appendChild(img)
    // console.log(li, span, div, img)
    listEl.appendChild(li);
}