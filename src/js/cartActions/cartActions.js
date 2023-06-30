
export const submitCart =  () => {

}
export const calcResult = (resultArr) => {

    const resultSum = resultArr.reduce((acc, item) => acc + (item.count * item.priceWithDiscount), 0);
    const resultAmount = resultArr.filter(item => item.active === true).length;
    const noDiscountResult = resultArr.reduce((acc, item) => acc + (item.count * item.noDiscountPrice), 0);
    const priceDifference = noDiscountResult - resultSum;

    const noDiscountText = document.querySelector('.result-no-discount-price');
    const resultWithDiscount = document.querySelector('.result-sum');
    const resultAmountText = document.querySelector('.result-amount');
    const discountNumber = document.querySelector('.discount-number');


    noDiscountText.textContent = `${noDiscountResult} ₽`;
    resultWithDiscount.textContent = `${resultSum} ₽`;
    discountNumber.textContent = `${priceDifference} ₽`;
    resultAmountText.textContent = `${resultAmount} шт`


}


export const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];

export const setStorage = (cart, newId, cartAddBtn) => {
    const data = getStorage(cart);
    if (!data.includes(Number(newId))) {
        localStorage.setItem(cart, newId);
        cartAddBtn.textContent = 'В корзине'
        data.push(JSON.parse(localStorage.getItem(cart)));
        localStorage.setItem(cart, JSON.stringify(data));
        document.querySelector('.cart__count').textContent = data.length
        document.querySelector('.cart__count').style.cssText = 'opacity:1'
    } else {
        return
    }
};