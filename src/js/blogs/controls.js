import {getPageElements} from "./getPageElements.js";
import {renderPosts} from "./renderPosts.js";
import {getPageNumber} from "./getPageNumber.js";
const {paginationBlock} = getPageElements();
let page;
export const controls = () => {
try {
    paginationBlock.addEventListener('click', (e) => {
        let target = e.target;
        page = getPageNumber();
        if ( target.closest('.pagination__arrow_left')) {

            if (page > 2) {
                page--;
                window.history.pushState(
                    {},
                    '',
                    `?page=${page}`
                )
                renderPosts(page)
            } else {
                page = 1;
                window.history.pushState(
                    {},
                    '',
                    `${window.location.pathname}`
                )
                renderPosts(page)

            }
        }
        if ( target.closest('.pagination__arrow_right')) {
            let {page} = getPageNumber();
            page++
            window.history.pushState(
                {},
                '',
                `?page=${page}`
            )
            renderPosts(page)
        }
    });
}
catch (error) {

}
}
