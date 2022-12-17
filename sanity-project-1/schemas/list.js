import card from './card'

const today = (new Date()).toISOString().slice(0,10)
const year = today.slice(0,4)
const formattedDate = today.slice(5) + '-' + year

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
            title: 'Last Updated Date',
            name: 'last_updated_date',
            type: 'string',
            hidden: ({document}) => !document?.title
        },
        {    
            title: 'Product Cards',
            name: 'cards',
            type: 'array',
            of: [{type: 'card'}]
        },
        
    ],
    initialValue: () => ({
        last_updated_date: formattedDate
    })
}