export const pageElements = () => {

    const headerMenuItem = document.querySelectorAll('.menu-item');
    const menuItemBlock = document.querySelectorAll('.menu-item__block');
    const headerSubMenuList = document.querySelectorAll('.menu-item__list');
    const menuArrowBtn = document.querySelectorAll('.menu-item__btn-open');
    const menuBtn = document.querySelector('.menu-btn');
    const headerNav = document.querySelector('.header__nav');
    return {
        headerMenuItem,
        menuItemBlock,
        headerSubMenuList,
        menuArrowBtn,
        menuBtn,
        headerNav,
    }
}