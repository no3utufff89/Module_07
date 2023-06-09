export const getPageNumber = () => {
    let page = +(new  URLSearchParams(window.location.search).get('page'));
    if (page === 0) {
        page = 1;
    }
    return page
}