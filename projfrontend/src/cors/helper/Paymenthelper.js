import {API} from '../../backend';

export const getmeToken = (userId, token) => {
    console.log("userID" + userId + "Token" + token);
    return fetch(`${API}payment/gettoken/${userId}/${token}/`, {
        method: "GET"
    })
    .then(res => {
        console.log(res);
        return res.json();
    })
    .catch(err => console.log(err));
}

export const processPayment = (userId, token, paymentInfo) =>{
    const formData = new FormData();

    for(const name in paymentInfo){
        formData.append(name, paymentInfo[name]);
    }

    return fetch(`${API}payment/process/${userId}/${token}/`, {
        method: "POST",
        body: formData
    })
    .then(res => {
        console.log("p-0", res);
        return res.json();
    })
    .catch(err => console.log(err))
}