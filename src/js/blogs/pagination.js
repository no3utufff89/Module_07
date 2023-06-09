import {getPageElements} from "./getPageElements.js";
import {createPaginationLi} from "./builder.js";

const {paginationArrow, listPagination} = getPageElements();
export const pagination = ({pages}, page) => {
    listPagination.innerHTML = '';
    if (page === 0) {
        page = 1;
    }

    let pageLength = page - 1;
    let counter = page + 1;

    let liActive = '';

    if (page === 1) {
        pageLength = page;
        counter =  pageLength + 2;
        paginationArrow[0].classList.add('not-active');
    }
    else {
        paginationArrow[0].classList.remove('not-active');
    }

    if (page === pages) {
        pageLength = page - 2;
        counter =  page;
        paginationArrow[1].classList.add('not-active');
    }

    for (pageLength;  pageLength <= counter; pageLength++) {
        if (page === pageLength) {
            liActive = 'is-active';
        } else {
            liActive = '';
        }
        listPagination.append(createPaginationLi(pageLength, liActive));
    }
};