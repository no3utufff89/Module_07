import {request} from "./dataActions.js";
import {createMenuItem, createSection} from "../modules/builder.js";

export const renderComponents = () => {

    const getMenuItems = Promise.resolve(
        request({
            postfix: 'category',
        })
    );
    const getProfitProducts = Promise.resolve(
        request({
            postfix: 'goods/discount',
            callback: createSection,
            title: 'Это выгодно',
            sectionClass: 'profit',
            containerClass: 'profit-goods-list'
        })
    );

    Promise.all([getMenuItems, getProfitProducts]).then(requestItem => {
        requestItem[0].forEach(item => {
            document.querySelector('.header__submenu-list').append(createMenuItem(item));
            document.querySelector('.submenu-list').append(createMenuItem(item));
        })
        try {
            document.querySelector('.main').append(requestItem[1])
        } catch (error) {
        }
    });
}