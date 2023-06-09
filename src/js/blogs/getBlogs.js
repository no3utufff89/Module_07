let postsPerPage = 8;

export const getPosts = async (page) => {
    const request = await fetch(`https://gorest.co.in/public-api/posts?page=${page}&per_page=${postsPerPage}`);
    const data = await request.json();
    return data;
};