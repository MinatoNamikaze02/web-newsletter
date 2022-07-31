export interface Post{
    _id: number;
    publishedAt: string; 
    title: string;
    author: {
        name: string;
        image: {
            asset:{
                url: string;
            }
        };
    };
    description: string;
    mainImage: {
        asset:{
            url: string;
        };
    };
    slug: {
        current: string;
    };
    body: [object];
    issue: string;
}

export interface Index{
    _id: number;
    title: string;
    description: string;
    tags: [string];
    mainImage: {
        asset:{
            url: string;
        };
    };
    slug: {
        current: string;
    };
    posts: [Post];
}
