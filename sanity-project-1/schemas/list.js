import card from './card'

export default {
    name: 'lists',
    type: 'document',
    title: 'Lists',
    fields: [
        {
            title: 'List Name/Headline',
            name: 'list_name',
            type: 'string',
            description: 'Make this catchy so people care about the list. Ex. Top 10 Gift For Christmas Under $25'
        },
        {    
            title: 'Product Cards',
            name: 'cards',
            type: 'array',
            of: [{type: 'card'}]
        },
        
    ]
}