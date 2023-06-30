import {renderPosts} from "./blogs/renderPosts.js";
import {controls} from "./blogs/controls.js";
import {getPageNumber} from "./blogs/getPageNumber.js";
import {loadData} from "./article/getArticleData.js";
import {openMenu} from "./common/menu.js";
import {renderMenu} from "./common/renderMenu.js";
import {mountComponents} from "./common/mountComponents.js";
import {getStorage} from "./cartActions/cartActions.js";
let {page, path} = getPageNumber();
// Блог
const dataCart = getStorage('cart')
// document.querySelector('.cart__count').textContent = dataCart.length
if (dataCart.length < 1) {
    document.querySelector('.cart__count').style.cssText = 'opacity:0'
} else {
    document.querySelector('.cart__count').textContent = dataCart.length
}
renderPosts(page);
loadData();
controls();
// Анимация меню
openMenu()


// Рендер меню
renderMenu()
mountComponents(path)





