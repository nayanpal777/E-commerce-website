import { API } from '../../backend';

export const CreateOrder = (userId, token, orderData) => {
    
    const formData = new FormData();

    for(const name in orderData){
        formData.append(name, orderData[name]);
    }

    return fetch(`${API}order/api/${userId}/${token}/`, {
        method: "POST",
        body: formData
    })
    .then( (res) =>{
        return res.json();
    })
    .catch(err => console.log(err))
}