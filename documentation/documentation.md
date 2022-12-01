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
