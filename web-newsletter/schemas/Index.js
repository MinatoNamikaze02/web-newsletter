export default{
    title: 'Index',
    name: 'index',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
        },
        {
            name: 'posts',
            title: 'Posts',
            type: 'array',
            of: [{type: 'reference', to: {type: 'post'}}],
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{type: 'string'}],
        
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
              hotspot: true,
            },
        },

    ],
    preview: {
        select: {
          title: 'title',
          description: 'description',
          media: 'mainImage',
        },
    },

}