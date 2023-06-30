import axios from "axios";
const URL = 'https://pastoral-suave-minnow.glitch.me/api/';

export const request = async ( props) => {
    try {
        const response = await axios.get(`${URL}${props.postfix}`);
        if (response) {
            const {data} = response;
            if (props.callback)  return props.callback(data, props) ;
            return data;
        }
    } catch(error) {
        if (error.response) {
            // Запрос был сделан, и сервер ответил кодом состояния, который
            // выходит за пределы 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
            // http.ClientRequest в node.js
            console.log(error.request);
        } else {
            // Произошло что-то при настройке запроса, вызвавшее ошибку
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
};