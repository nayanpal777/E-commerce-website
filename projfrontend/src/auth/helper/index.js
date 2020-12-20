import { API } from '../../backend'
import { cartEmpty } from '../../cors/helper/Carthelper'

export const signup = user => {
    return fetch(`${API}user/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const signin = user => {
    //here we create a formdata 
    const formData = new FormData();

    // const {email, password} = user;
    // const formData = new FormData();
    // formData.append('email', email);
    // formData.append('password', password);
    // for(var key of formData.keys()){
    //     console.log(key);
    // }
    //we can also write this in this way this is short way
    for (const val in user) {
        console.log(user[val]);
        formData.append(val, user[val]);
    }

    for (var key of formData.keys()) {
        console.log("MyKEY", key);
    }

    return fetch(`${API}user/login/`, {
        method: "POST",
        body: formData
    })
        .then((response) => {
            console.log("success", response);
            return response.json();
        })
        .catch((err) => console.log(err));
}

export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window == undefined) {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
        //TODO: compare JWT with Database token
    } else {
        return false;
    }
}

export const signout = next => {
    const userId = isAuthenticated() && isAuthenticated().user.userId

    if (typeof window !== undefined) {
        localStorage.removeItem("jwt")
        cartEmpty(() => { });
        next();

        return fetch(`${API}user/logout/${userId}`, {
            method: "GET"
        })
            .then(response => {
                console.log('logout successfully....');
                next();
            })
            .catch(err => console.log(err))
    }
}
