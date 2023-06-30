import {
    renderCategoryProducts,
    renderCurrentProduct,
    renderFeaturedProducts,
    renderProfitProducts
} from "./renderCards.js";
import {createBreadCrumbs} from "../modules/builder.js";
import {renderShoppingCart} from "../cartActions/renderShoppingCart.js";

export const mountComponents = (path) => {
    const category = new  URLSearchParams(window.location.search).get('category')
    const title = new  URLSearchParams(window.location.search).get('title')
    if (path === '/' || path === '/index.html') {

        renderProfitProducts()
    }
    if (path === '/category.html') {
        document.title = `ShopOnline - ${new  URLSearchParams(window.location.search).get('category')}`;
        renderCategoryProducts()
        document.querySelector('main').append(createBreadCrumbs(
            [
                {title: 'Главная',href: '/index.html'},
                {title: category}
            ]
        ))
    }
    if (path === '/card.html') {
        document.title = new  URLSearchParams(window.location.search).get('title');
        renderCurrentProduct()

        document.querySelector('main').prepend(createBreadCrumbs([
            {title: 'Главная',href: '/index.html'},
            {title: category ,href: `/category.html?category=${category}`},
            {title: title}
        ]))
        renderFeaturedProducts()
    }

    if (path === '/shoping-cart.html') {
        renderShoppingCart()
        renderProfitProducts()



    }
}
// {
//     postfix: `goods/${id}`,
// }