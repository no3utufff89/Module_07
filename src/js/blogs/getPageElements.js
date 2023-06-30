export const getPageElements = () => {
    const blogsList = document.querySelector('.blogs-list');
    const listPagination = document.querySelector('.pagination__list');
    const paginationBlock = document.querySelector('.pagination');
    const paginationArrow = document.querySelectorAll('.pagination__arrow');


    return {
        blogsList,
        paginationBlock,
        listPagination,
        paginationArrow,
    }
}