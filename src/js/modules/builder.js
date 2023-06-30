import {el, setChildren} from 'redom';
import {getStorage, setStorage} from "../cartActions/cartActions.js";

export const createProductCard = (item) => {
    let {image, title, description, price, discount, id, category} = item;

    // Главная обертка карточки товара ( Li )
    let priceWithDiscount = parseInt(price - (price * discount) / 100);
    const productCardElement = el('li.profit-goods-list__item');

    // Стикер скидки, если он есть
    const discountSticker = el('span.promo-sticker promo-sticker_profit', {
        textContent: `-${discount}%`,
    });

    // Картинка товара
    const productImage = el('img.profit-card__image', {
        src: `https://pastoral-suave-minnow.glitch.me/image/${id}.jpg`,
        loading: 'lazy',
        alt: title,
        width: '420',
        height: '295'

    });
    if (image === 'image/notimage.jpg') {
        productImage.src = 'img/no_photo.webp';
    }

    const priceCurrency = el('p.price-currency', {
        textContent: '₽'
    })
    const priceCurrencyNew = el('p.price-currency', {
        textContent: '₽'
    })
    // Цены товара старая и новая, если скидка
    const newPriceText = el('p.new-price__text', {
        textContent: priceWithDiscount
    })
    const oldPriceText = el('p.old-price__text', {
        textContent: price
    })
    const newPrice = el('.new-price');
    setChildren(newPrice, newPriceText, priceCurrency)

    const oldPrice = el('.old-price');
    setChildren(oldPrice, [oldPriceText, priceCurrencyNew])

    // Блок для цен
    const productPrice = el('.price');

    // Название товара
    const productTitle = el('p.profit-card__title', {
        textContent: title,
    })

    //Блок с картинкой товара
    const productCardHeader = el('.profit-card__header relative');
    // Подвал карточки товара
    const productCardFooter = el('.profit-card__footer');

    // Условия вывода
    if (discount > 0) {
        setChildren(productCardHeader, productImage, discountSticker);
        setChildren(productPrice, [newPrice, oldPrice])
        setChildren(productCardFooter, [productPrice, productTitle])
    } else {
        setChildren(productCardHeader, productImage);
        setChildren(productPrice, newPrice);
        newPrice.classList.add('no-discount-price')
        setChildren(productCardFooter, [productPrice, productTitle])
    }

    // Собираем матрешку
    const productCardInner = el('a.profit-card', {
        href: `card.html?category=${category}&title=${title}&id=${id}`,
    }, productCardHeader, productCardFooter);

    setChildren(productCardElement, productCardInner);
    return productCardElement
}

export const createSection = (data, props) => {
    const section = el('section', {
        className: `section ${props.sectionClass}`
    })
    const sectionTitle = el('h2.section-title profit__title', {
        textContent: props.title
    })
    const container = el('.container')
    const buildInContainer = el('ul', {
        className: props.containerClass
    })
    const products = data.map(item => {
        return createProductCard(item)
    })
    setChildren(buildInContainer, ...products);
    setChildren(container, [sectionTitle, buildInContainer])
    setChildren(section, container);
    return section
}
export const createMenuItem = (data) => {
    const menuItem = el('li.submenu-list__item', el('a.nav-list__link', {
        textContent: data,
        href: `category.html?category=${data}`,
    }))
    return menuItem
}
export const createProductDetailedCard = (data) => {
    const productId = new  URLSearchParams(window.location.search).get('id');
    let priceWithDiscount = parseInt(data.price - (data.price * data.discount) / 100);

    const cardWrapper = el('.card card card-wrapper');
    const container = el('.container',
        el('.card-header',
            el('h1.card__title', {
                textContent: data.title,
            })));
    const cardBody = el('.card-body');

    // Картинка
    const cardImageContainer = el('.card__image-container');
    const cardImage = el('.card__img');
    const img = el('img.prod__image', {
        alt: data.title,
        width: '757',
        height: '427',
        src: `https://pastoral-suave-minnow.glitch.me/${data.image}`,
    });

    // Стикер скидки
    const discountSticker = el('span.product__discount-marker', {
        textContent: `-${data.discount}%`,
    });

    // Цены товара старая и новая, если скидка
    const cardDetails = el('.card__details');

    const priceCurrency = el('p.product-price-currency product-price-currency_common', {
        textContent: '₽'
    })
    const priceCurrencyNew = el('p.product-price-currency product-price-currency_red', {
        textContent: '₽'
    })
    const newPriceText = el('p.new-product-price__text', {
        textContent: priceWithDiscount
    })
    const oldPriceText = el('p.old-product-price__text', {
        textContent: data.price
    })
    const newPrice = el('.new-product-price');
    setChildren(newPrice, newPriceText, priceCurrencyNew)

    const oldPrice = el('.old-product-price');
    setChildren(oldPrice, [oldPriceText, priceCurrency])

    // Блок для цен
    const productPrice = el('.product-price');

    const creditTextBlock = el('p.credit-text', {
            textContent: 'В кредит от 5600 '
        },
        el('span.product-price-currency product-price-currency_small', {
            textContent: '₽'
        }))
    const productButtonsRow = el('.product-buttons-row');
    const cartAddBtn = el('button.cart-add-btn', {
        textContent: 'Добавить в корзину',

    })
    const dataCart = getStorage('cart')
    if (dataCart.includes(Number(productId))) {
        cartAddBtn.textContent = 'В корзине';


    }

    const likeBtn = el('button.favourite-add-btn', {
        ariaLabel: 'Добавить товар в избранное'
    });
    likeBtn.innerHTML = `
    <span>
       <svg class="icon product-favourite-icon" width="33" height="33">
            <use href="img/sprite.svg#favourite"></use>
       </svg>
    </span>
    `;
    setChildren(productButtonsRow, [cartAddBtn, likeBtn])
    const deliveryRow = el('.delivery-row');
    deliveryRow.innerHTML = `
                        <div class="delivery">
                            <p class="delivery__text">Доставка</p>
                            <p class="delivery__date">1-3 января</p>
                        </div>
                        <div class="salesman">
                            <p class="salesman__text">Продавец</p>
                            <p class="salesman__name">ShopOnline</p>
                        </div>
    `;
    const priceDropBtn = el('button.btn price-drop-btn');
    priceDropBtn.innerHTML = `
                       <span>
                            <svg class="icon bell-icon" width="24" height="24">
                                    <use href="img/sprite.svg#bell"></use>
                            </svg>
                       </span>
                       <span class="price-drop-btn__text">Узнать о снижении цены</span>
    `;

    if (data.discount > 0) {
        setChildren(cardImage, [img, discountSticker]);
        setChildren(cardImageContainer, cardImage);
        setChildren(productPrice, [newPrice, oldPrice])
    } else {
        setChildren(cardImage, img);
        setChildren(cardImageContainer, cardImage);
        setChildren(productPrice, newPrice)
        newPriceText.style.cssText = 'color: black';
        priceCurrencyNew.style.cssText = 'color: black';
    }

    const descriptionContainer = el('.description-container',
        el('.description',
            el('h2.description__title', {
                textContent: 'Описание'
            }),
            el('p.description__text', {
                textContent: data.description
            })));
    // Цветы жизни оно ж дети
    setChildren(cardDetails, [productPrice, creditTextBlock, productButtonsRow, deliveryRow, priceDropBtn]);
    setChildren(cardBody, [cardImageContainer, cardDetails, descriptionContainer])
    setChildren(cardWrapper, [container, cardBody])
    
    const cardElements = () => {
        cartAddBtn.addEventListener('click', () => {
            setStorage('cart', productId, cartAddBtn)
        })
    }

    return {cardWrapper, cardElements}
}

export const createBreadCrumbs = (props) => {
    console.log(props)
    const searchParamsData = new  URLSearchParams(window.location.search);
    const id = new  URLSearchParams(window.location.search).get('id')
    const category = new  URLSearchParams(window.location.search).get('category')
    const crumbsArr = [];
    for (const item of new Set(searchParamsData.values())) {
       crumbsArr.push(item);
    }
    const filtredCrumbsArr = crumbsArr.filter(item => item !== id)

    const propsArr = Object.values(props)
    console.log(`propsArr`,propsArr)
    const resultCrumbsArr = [...propsArr, ...filtredCrumbsArr];
    console.log(resultCrumbsArr)

    const breadCrumbsItem = propsArr.map(item => {
        console.log(`length`,resultCrumbsArr.length)
        if (item.href) {
            const breadCrumbsItem = el('li.bread-crumbs__item',
                el('a.bread-crumbs__link', {
                    textContent: item.title,
                    href: item.href
                }));
            return breadCrumbsItem
        } else {
            const breadCrumbsItem = el('li.bread-crumbs__item',
                el('a.bread-crumbs__link', {
                    textContent: item.title,

                }));
            return breadCrumbsItem
        }




    })
    const section = el('section.section bread-crumbs-section');
    const container = el('.container');
    const breadCrumbsList = el('ul.bread-crumbs-list');
    // const breadCrumbsItem = el('li.bread-crumbs__item');
    setChildren(breadCrumbsList, [...breadCrumbsItem])
    setChildren(container, breadCrumbsList);
    setChildren(section, container)
    return section
}

