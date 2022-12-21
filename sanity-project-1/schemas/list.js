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
            description: 'Headlines should be catchy, descriptive, and not to long (55 characters)'
        },
        {
            title: 'List Summary',
            name: 'list_summary',
            type: 'text',
            rows: 4,
            description: 'Describe the list. Why should people care. Who is this list for. Why would you want the items.'
        },
        {    
            title: 'Product Cards',
            name: 'cards',
            type: 'array',
            of: [{type: 'card'}]
        },
        
    ]
}