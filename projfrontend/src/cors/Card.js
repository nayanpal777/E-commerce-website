import React, { useState } from 'react';
import ImageHelper from './helper/Imagehelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/Carthelper';
import { isAuthenticated } from '../auth/helper';


const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    reload = undefined,
    setReload = f => f,
}) => {

    const [redirect, setRedirect] = useState(false);
    const [redirectforlogin, setRedirectforlogin] = useState(false);

    const cardName = product ? product.name : "Database problem to load Name"
    const cardDes = product ? product.description : "Database problem to load description"
    const cardPrice = product ? product.price : "Database problem to load price"

    const addToCart = () => {
        if (isAuthenticated()) {
            addItemToCart(product, () => setRedirect(true));
            console.log("Added to cart");
        } else {
            setRedirectforlogin(true);
            console.log('login Please!');
        }
    }

    const getAredirect = redirect => {
        if (redirect) {
            return <Redirect to='/cart' />;
        }
    }
    const getRedirectLogin = redirectforlogin => {
        if (redirectforlogin) {
            return <Redirect to='/signIn' />;
        }
    }

    const showAddToCart = addtoCart => {
        return (
            addtoCart && (
                <button onClick={addToCart} className="btn btn-block btn-outline-success mt-2 mb-2">Add to Card</button>
            )
        )
    }
    const showRemoveFromCart = removeFromCart => {
        return (
            removeFromCart && (
                <button onClick={() => {
                    removeItemFromCart(product.id)
                    setReload(!reload);
                }} className="btn btn-block btn-outline-danger mt-2 mb-2">Remove</button>
            )
        )
    }

    return (
        <div className="card text-white bg-dark border border-info m-2">
            <div className="card-header lead">{cardName}</div>
            <div className="card-body">
                {getRedirectLogin(redirectforlogin)}    
                {getAredirect(redirect)}
                <ImageHelper product={product} />
                <p className="lead bg-success p-1 font-weight-normal text-wrap">
                    {cardDes}
                </p>
                <p className="btn btn-success rounded btn-sm px-4">{cardPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCart(addtoCart)}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card