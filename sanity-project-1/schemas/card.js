export default {
    name: 'card',
    type: 'object',
    title: 'Product Card',
    fields: [
      {
        // how it appears in api endpoint
        name: 'product_name',
        // the title in the visual editor
        title: 'Product Name',
        // the type of data
        type: 'string'
      },
      {name: 'brand_name', title: 'Brand Name', type: 'string'},
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        description: '* Use the price shown in your affiliate link. Round price to a whole number.'
      },
      {
        name: 'affiliate_link',
        title: 'Affiliate Link',
        type: 'string',
        description: 'The initial value is always an Amazon link to the Amazon Best Sellers Page',
        initialValue: 'https://amzn.to/3EVVlJ8'
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
      },
      {
        name:'amazon_image_url',
        title:'Image HTML',
        type:'string',
        description: 'This is useful for quickly inserting an image from Amazon SiteStripe. You need to either fill out the image field above or this field.'
      }
    ]
  }