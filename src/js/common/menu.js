import {pageElements} from "./pageElements.js";

export const openMenu = () => {
    // Вытаскиваем элементы
    const { headerMenuItem,
            menuItemBlock,
            menuArrowBtn,
            headerSubMenuList,
            menuBtn,
            headerNav } = pageElements()

    // Функция открытия/закрытия меню
    const menuAction = () => {
        if (menuBtn.classList.contains('active')) {
            menuBtn.classList.remove('active')
            headerNav.classList.remove('active')
            headerSubMenuList.forEach(item => {
                item.classList.remove('active')
                item.removeAttribute('style')
                menuArrowBtn.forEach(item => {
                    item.classList.remove('menu-item__btn-close');
                })
            })
        } else {
            menuBtn.classList.add('active')
            headerNav.classList.add('active')
        }
    }

  const subMenu = () => {
      menuArrowBtn.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                for (let i = 0; i < headerMenuItem.length; i +=1) {
                    if (index === i) {
                        if (headerSubMenuList[i].classList.contains('active')) {
                            headerSubMenuList[i].removeAttribute('style');
                            menuArrowBtn[i].classList.remove('menu-item__btn-close');

                        } else {
                            headerSubMenuList[i].style.height = `${headerSubMenuList[i].scrollHeight}px`;
                            menuArrowBtn[i].classList.add('menu-item__btn-close');
                        }
                        headerSubMenuList[i].classList.toggle('active')
                    }
                }
            })
        })
    }
    subMenu()
    // Вешааем события
    menuBtn.addEventListener('click', menuAction)

}
