import {getPosts} from "./getBlogs.js";
import {getPageElements} from "./getPageElements.js";
import {createBlog} from "./builder.js";
import {pagination} from "./pagination.js";

const {blogsList} = getPageElements();

export const renderPosts = async (page) => {
    try {
        blogsList.innerHTML = '';
        const {data:posts, meta} = await getPosts(page);
        let paginationInfo = meta.pagination;
        posts.forEach(post => {
            blogsList.append(createBlog(post));
        });
        pagination(paginationInfo, page);
    }
    catch (error) {

    }


};
