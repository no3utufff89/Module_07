import {createCartProducts} from "./createCartProducts.js";
import {calcResult, getStorage} from "./cartActions.js";
import {request} from "../common/dataActions.js";

const cartList = document.querySelector('.cart-list');
const cartImagesList = document.querySelector('.delivery-details__img-block');
const cartNumber = document.querySelector('.cart-number');
const cartCount = document.querySelector('.cart__count');
const resultSum = document.querySelector('.result-sum');
const checkAll = document.querySelector('.checkAll-input');
const submitBtn = document.querySelector('.cart-submit-btn')

const resultArr = [];
export const renderShoppingCart = async () => {
    const cartStorageData = getStorage('cart');
    cartNumber.textContent = cartStorageData.length
    cartCount.textContent = cartStorageData.length
    Promise.all(
        cartStorageData.map((id) => {
            return request({
                postfix: `goods/${id}`,
            });
        })
    )
        .then((arr) => {

         arr.map((data) => {
                let {
                    cartProduct,
                    productImg,
                    productSmallImage,
                    newCartPriceText,
                    oldCartPriceText,
                    productAmount,
                    amountControls,
                    minusBtn,
                    plusBtn,
                    productCheckbox,
                    dellAllBtn,
                    checkAll,
                    productTitle
                } = createCartProducts(data);

                resultArr.push(
                    {   'id': data.id,
                        'active': true,
                        'title': data.title,
                        'image': productImg.src,
                        'priceWithDiscount': newCartPriceText.textContent,
                        'noDiscountPrice': oldCartPriceText.textContent,
                        'count': Number(productAmount.textContent),
                        'discount': data.discount,
                    }
                );
                cartImagesList.append(productSmallImage)
                cartList.append(cartProduct);

                // Кнопки



                checkAll.addEventListener('click', () => {
                    if (checkAll.checked === true) {
                        productCheckbox.checked = true;
                        resultArr.forEach(item => {
                            item.active = true;
                            item.count = 1
                        })
                        productAmount.textContent =  1;
                        cartProduct.removeAttribute('style');
                        [minusBtn, plusBtn].forEach(item => item.removeAttribute('disabled'))
                        console.log('итого',resultArr)

                        // cartImagesList.append(productSmallImage);
                        calcResult(resultArr);
                    } else {
                        productCheckbox.checked = false;
                        resultArr.forEach(item => {
                            item.active = false;
                            item.count = 0
                        })
                        productAmount.textContent =  0;
                        cartProduct.style.cssText = 'opacity: 0.5';
                        [minusBtn, plusBtn].forEach(item => item.setAttribute('disabled', 'disabled'))
                        productSmallImage.remove();
                        calcResult(resultArr)
                    }

                })

                cartProduct.addEventListener('click', (e) => {
                    let target = e.target;
                    let rowId = target.closest('.cart-product').id
                    const targetObj = resultArr.find(row => row.id === rowId);
                    if (target === productCheckbox) {
                        if (productCheckbox.checked === false) {
                            checkAll.checked = false
                            targetObj.active = false;
                            targetObj.count = 0;
                            cartProduct.style.cssText = 'opacity: 0.5';
                            [minusBtn, plusBtn].forEach(item => item.setAttribute('disabled', 'disabled'))
                            productAmount.textContent =  0;
                            productSmallImage.remove();
                            calcResult(resultArr)
                        } else {
                            targetObj.active = true;
                            targetObj.count = 1;
                            productAmount.textContent =  1;
                            cartProduct.removeAttribute('style');
                            [minusBtn, plusBtn].forEach(item => item.removeAttribute('disabled'))
                            cartImagesList.append(productSmallImage);
                            calcResult(resultArr);
                        }
                    }
                    if (target === plusBtn) {
                        productAmount.textContent++
                        targetObj.count++
                        targetObj.active = true
                        productCheckbox.checked = true;
                        minusBtn.removeAttribute('disabled')
                        cartImagesList.append(productSmallImage);
                        calcResult(resultArr);

                    }
                    if (target === minusBtn) {
                        productAmount.textContent--
                        targetObj.count--
                        calcResult(resultArr);
                    }
                    if (productAmount.textContent < 1) {
                        productCheckbox.checked = false;
                        minusBtn.setAttribute('disabled', 'disabled')
                        productSmallImage.remove();
                        targetObj.active = false
                        calcResult(resultArr);
                    }

                })

                dellAllBtn.addEventListener('click', () => {
                    if (productCheckbox.checked === true) {
                        const prodId = Number(cartProduct.id);
                        console.log(prodId)
                        const index = cartStorageData.findIndex(item => item === prodId);
                        cartStorageData.splice(index, 1)
                        localStorage.setItem('cart', JSON.stringify(cartStorageData));
                        cartProduct.remove()
                        productSmallImage.remove();
                        resultArr.splice(index, 1)
                        cartNumber.textContent = cartStorageData.length
                        cartCount.textContent = cartStorageData.length
                        calcResult(resultArr)
                    }
                })




                //Плюс / минус кнопки
             submitBtn.addEventListener('click', message => {
                 if (productCheckbox.checked === true) {
                     const prodId = Number(cartProduct.id);
                     const index = cartStorageData.findIndex(item => item === prodId);
                     cartStorageData.splice(index, 1)
                     localStorage.setItem('cart', JSON.stringify(cartStorageData));
                     cartProduct.remove()
                     productSmallImage.remove();
                     resultArr.splice(index, 1)
                     calcResult(resultArr);
                     cartNumber.textContent = cartStorageData.length
                     cartCount.textContent = cartStorageData.length

                 }
             })

            });




            calcResult(resultArr)


        })

}
// postfix: `goods/${id}`, request({
//
//         })