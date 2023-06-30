import {request} from "./dataActions.js";
import {createMenuItem} from "../modules/builder.js";

export const renderMenu = () => {
    request({
        postfix: 'category',
    }).then(data => {
        data.forEach(item => {
            document.querySelector('.header__submenu-list').append(createMenuItem(item));
            document.querySelector('.submenu-list').append(createMenuItem(item));
        })
    })
}