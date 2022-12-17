export function q(query) {
    const selected = document.querySelectorAll(query)
    if (selected.length === 0) {
        throw 'You did not select anything'
    } else if (selected.length === 1) {
        return selected[0]
    } else {
        // Changes Nodelist to an Array for more methods
        return Array.from(selected);
    }
}

// 2nd parameter is not required
export function create(element, className) {
    const ele = document.createElement(element)
    if (className !== undefined) {
        ele.classList.add(className)
    }
    return ele
}

// Might be intersting to make more interesting hashes than list1, list2
function slugify(listName) {
    return listName.toLowerCase().replace(/\s+/g, '-').slice(0,200)
}