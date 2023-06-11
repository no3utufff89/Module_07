import {getPageElements} from "./getPageElements.js";

const {
    titleText,
    sidebarText,
    contentText,
    infoAuthor,
} = getPageElements()

export const dataPost = async () => {
    const id = new  URLSearchParams(window.location.search).get('id');
    if (id) {
        const request = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
        const {data} = await request.json();
        return data;
    }
};

export const dataAuthor = async (id) => {
    const request = await fetch(`https://gorest.co.in/public-api/users/${id}`);
    const {data} = await request.json();
    return data;
};
export const loadData = async () => {
    try {
        const {title, body, user_id: userId} = await dataPost();
        const {name} = await dataAuthor(userId);
        titleText.textContent = title;
        sidebarText[sidebarText.length-1].textContent = title;
        contentText.textContent = body;
        // infoAuthor.textContent = name;
    }
    catch (error) {
        
    }

};
