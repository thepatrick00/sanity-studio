[markdown guide](https://markdownguide.org/cheat-sheet/)
# Day 1: 11-27-22
My sister made soem tik toks about gift ideas for Chirstmas and she started to get lots of views on her videos. 

I said that's cool are you making any money from it? She said no so I told her my idea. The idea was to make an affiliate site that different lists of good presents, each item containing an affiliate link.

I wanted to K.I.S.S. (keep it simple stupid). So I would only focus on making the home page and card element for mobile.

# Day 2: 11-28-22
Next I needed content for my card elements. I wanted my sister to be involved since she was already making these wishlist, so I needed a backend where a non-coder can easily put in data for each list.

I went through multiple backend options and ultimatley setteled with Sanity.io for it's price to host the backend(free) and because the excellent documentation that did not assume I knew everything.

1. My backend hosted online so my sister and I can create lists and earn a little side income.
![](./images/d2%20backend.png)
2. My frontend was hosted with Netlify and I set up a domain(begiftable.com)
![](./images/d2%20site.png)

# Day 3: 11-29-22
Before I start I have a list of ideas to improve the current state of the site.
1. Improve the backend schema so the card inputs are part of a specific list.
2. Instead of a menu, I will just have a side-scroll bar for all list categories. 
3. Wishlist menu item can instead be positioned absolute and you will be able to access it anytime on the page to see your favorite items.
4. Improve card aesthetics. 
    * Add wishlist functionality to left side of cards.
    * Make it more obvious you can click and buy (maybe a button on the price and underline on the product title)

(1) is completed. Made the backend more user friendly, by removing unnecssary inputs, formatting it better, and adding default values.
(2) started #2

# Day 4: 11-30-22
* Now I want the active list item to have active styles for the scroll bar.

Working on #2 on the list.

I made a side scroll bar with overflow on the x axis. I wanted previous and next button so people can either click or swipe to look at all the list categories. 

I wanted the previous button to only appear after you have scrolled right some space because clicking left button when you are a x axis 0, makes no sense.

I came up with a solution that scroll event listener and looks element.scrollLeft preoperty that tells us how far we are from the left edge.

I didn't like that the scroll event listener fired so much, so I looked for a more preformant solution and found out about the Intersection Observer API.

This solution would fire a callback function only when the element I observed was at least 50% on the screen. This was made easily possible with the Intersection Observer API.

I also gave animation for the previous scroll button, to make it feel more natural.

Finally I updated the schema & code so you can add images normally OR you can add HTML from Amazon Affiliate, which is also an image.

1. I did a lot today. Might want to do a simpler break down list.
2. PROBLEM I WANT TO LEARN TO FIX: The elements I added with document.createElement are not being found by my querySelector

# Day 5: 12-2-22
Lesson: When you create elements with Document.createElement() and then try to select elements with Document.querySelectorAll(), code order matters to make sure every elment is selected.

This lesson helped me fixed the absolute scroll buttons that appear above the scroll-nav. They appear and disapear when it makes sense, for example if I'm at the begining of the list it does not make sense to show the "go left" button since we are already left most.

Working on (4) card aesthetics.
Lesson: If a block element is not full width like the other element, it may be because there is not enough text to strech it to full width.

1. Make middle and right box clickable not left box.
2. Add bookmark functionality with localstorage and a bookmark page
3. Add list logic to change from one list to another.

# Day 6: 12-16-22
Since I have already pushed to github. I will create a new repo for CS50, that hides the api key, and private my current repo. I wanted to use os.environ like we did in python however, I found a simpler solution in this case using Netlify as a backend to have my api key secure and hidden.
[tutotrial I followed](https://medium.com/@oreillyalan88/how-to-hide-api-keys-from-github-7a14d1bf80c)

I spent all day refactoring for redability and figuring out how to do routing in vanilla js. I opted for a very interesting option, as it was the easiest and it had a unique upside of only making 1 initial api call. 

This was routing using html and css only with the power of :target psuedo-class. This allowed me to display: block; content to show it based on if a href="#" with a hash inside was pressed. :target refered to the element with the id that matched the hash link.

I also solved the challenge of giving my anchor buttons active styles by creating a function that uses event delegation to change only have 1 button with an active style.