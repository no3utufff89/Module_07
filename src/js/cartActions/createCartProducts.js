import {el, setChildren} from 'redom';

export const createCartProducts = (item) => {
    const checkAll = document.querySelector('.checkAll-input');
    checkAll.setAttribute('checked','checked')
    const dellAllBtn = document.querySelector('.deleteAll-btn')
    let priceWithDiscount = parseInt(item.price - (item.price * item.discount) / 100);

        const cartProduct = el('li.cart-list__item cart-product', {
            id: item.id
        });
        const productCheckbox = el('input.cart-input-checkbox product-checkbox cart-checkbox', {
            type: 'checkbox',
        });
        productCheckbox.setAttribute('checked', 'checked');

        const productImg = el('img.cart-product__image', {
            alt: 'Картинка товара',
            src: `https://pastoral-suave-minnow.glitch.me/${item.image}`
        });
        const productSmallImage = el('img.delivery-img small-prod-image', {
            width: '80',
            height: '80',
            id: item.id,
            alt: 'Картинка товара',
            src: `https://pastoral-suave-minnow.glitch.me/${item.image}`
        });
        const productTitle = el('p.cart-product__title', {
            textContent: item.title
        })


        const productControls = el('.cart-product__controls');

        //Кнопки кол-ва товара
        const amountControls = el('.amount-controls');
        const minusBtn = el('button.btn cart-product-min-btn',{
            textContent: '-'
        });
        const productAmount = el('span.cart-product-amount');
        productAmount.textContent = `1`
        const plusBtn = el('button.btn cart-product-plus-btn', {
            textContent: '+'
        });

        setChildren(amountControls, [minusBtn, productAmount, plusBtn])
        //==================//

        const productDelBtn = el('button.btn product-delete-btn');
        productDelBtn.setAttribute('aria-label', 'Удалить товар')
        productDelBtn.innerHTML = `
                <svg class="cart-icon icon delete-icon cart-product_delete-icon" width="30" height="30">
                  <use href="./img/sprite.svg#delete"></use>
                </svg>
    `;
        setChildren(productControls, [amountControls, productDelBtn])

        //Блок с ценами
        const productPriceWrapper = el('.cart-product__price');
        const productPrice = el('.cart-price');

        //Новая цена со скидкой
        const newCartPrice = el('.new-cart-price');
        const newCartPriceText = el('p.new-cart-price__text', {
            textContent: priceWithDiscount
        })

        //Валюта
        const cartPriceCurrency = el('p.cart-price__currency', {
            textContent: '₽'
        })
        const cartPriceCurrencyNew = el('p.cart-price__currency', {
            textContent: '₽'
        })
        //Старая цена без скидки
        const oldCartPrice = el('.old-cart-price');
        const oldCartPriceText = el('p.old-cart-price__text', {
            textContent: item.price
        })
        setChildren(newCartPrice, [newCartPriceText, cartPriceCurrencyNew]);
        setChildren(oldCartPrice, [oldCartPriceText, cartPriceCurrency]);
        if (item.discount > 0) {
            setChildren(productPrice, [newCartPrice, oldCartPrice]);

        }else {
            setChildren(productPrice, [newCartPrice]);
        }

        const creditText = el('p.cart-credit-text', {
            textContent: 'В кредит от ляма'
        })

        setChildren(productPriceWrapper, [productPrice, creditText])
        //Сборка блока с ценами по условию


        //Сборка элемента товара
        setChildren(cartProduct, [productCheckbox, productImg, productTitle, productControls, productPriceWrapper])

    const productElements = {
            productCheckbox,
            checkAll,
            productImg,
            productSmallImage,
            productControls,
            newCartPriceText,
            oldCartPriceText,
            productTitle,
            productAmount,
            minusBtn,
            plusBtn,
            amountControls,
            dellAllBtn,
            cartProduct
        }

    // cartProduct.addEventListener('click', (e) => {
    //     let target = e.target;
    //     if (productAmount.textContent >= 1) {
    //       if(target.closest('.cart-product-min-btn'))  {
    //           productAmount.textContent--
    //
    //         }
    //         if(target.closest('.cart-product-plus-btn'))  {
    //             productAmount.textContent++
    //         }
    //     }
    //     if (productAmount.textContent < 1) {
    //         productCheckbox.removeAttribute('checked')
    //         if(target.closest('.cart-product-plus-btn'))  {
    //             productAmount.textContent++
    //             productCheckbox.setAttribute('checked', 'checked');
    //         }
    //     }
    //
    // })
        return productElements
}
