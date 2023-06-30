import {request} from "./dataActions.js";
import {createProductDetailedCard, createSection} from "../modules/builder.js";

export const renderProfitProducts = () => {
    request({
        postfix: 'goods/discount',
        callback: createSection,
        title: 'Это выгодно',
        sectionClass: 'profit',
        containerClass: 'profit-goods-list'
    }).then(data => {
        document.querySelector('.main').append(data)
    })
}
export const renderCurrentProduct = () => {

    const id = new  URLSearchParams(window.location.search).get('id');
    request({
        postfix: `goods/${id}`,
    }).then(data => {
        const {cardWrapper, cardElements} = createProductDetailedCard(data)
        document.querySelector('.current-prod-section').append(cardWrapper)
        cardElements()
    })
}
export const renderFeaturedProducts = () => {
    const category = new  URLSearchParams(window.location.search).get('category');
    const id = new  URLSearchParams(window.location.search).get('id');
     request({
        postfix: `goods/category/${category}`,
    }).then(data => {
         return data.filter(products => products.id !== id)
    }).then(data => {
        if (data.length >= 1) {
            const recomendedProducts = createSection(data, {
                title: 'Рекомендуем также',
                sectionClass: 'recommended',
                containerClass: 'profit-goods-list recommended-goods-list'
            })
            document.querySelector('main').append(recomendedProducts)
        }
     })
}

export const renderCategoryProducts = () => {
    const category = new  URLSearchParams(window.location.search).get('category');
    if (category) {
        request({
            postfix: `goods/category/${category}`,
            callback: createSection,
            title: category,
            sectionClass: 'profit',
            containerClass: 'profit-goods-list'
        }).then(data => {
            document.querySelector('.main').append(data)
        })
    }
}