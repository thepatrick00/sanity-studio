export default {
    name: 'card',
    type: 'document',
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
      {
        name: 'brand_name',
        title: 'Brand Name',
        type: 'string',
      },
      {
        name: 'list_name',
        title: 'List Name',
        type: 'string',
        description: 'ex. Christmas, Gift Under $15'
      },
      {
        name: 'product_category',
        title: 'Product Category',
        type: 'string',
        description: 'Products do not need to be in the same list to be a similar type. ex. makeup or outdoors'
      },
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
        description: 'Hi, Ola. Amazon Affiliate is probably the easiest way to get all the products affilaite links.'
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
      },
    ]
  }