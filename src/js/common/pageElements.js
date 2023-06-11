export const pageElements = () => {

    const headerMenuItem = document.querySelectorAll('.menu-item_header');
    const menuItemBlock = document.querySelectorAll('.menu-item__block');
    const headerSubMenuList = document.querySelectorAll('.header__submenu-list');
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