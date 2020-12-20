import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { cartEmpty } from './helper/Carthelper';
import { getmeToken, processPayment } from './helper/Paymenthelper';
import { CreateOrder } from './helper/Orderhelper';
import { isAuthenticated, signout } from '../auth/helper';

import DropIn from 'braintree-web-drop-in-react';

const PaymentB = ({
    products,
    reload = undefined,
    setReload = f => f
}) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    const userId = isAuthenticated && isAuthenticated().user.id;
    const token = isAuthenticated && isAuthenticated().token;

    const getToken = (userId, token) => {
        getmeToken(userId, token)
            .then(info => {
                console.log(info);
                if (info.error) {
                    setInfo({
                        ...info,
                        error: info.error
                    })
                    signout(() => {
                        return <Redirect to="/signIn" />
                    })
                } else {
                    const clientToken = info.clientToken;
                    setInfo({ clientToken });
                }
            })
    }

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const getAmount = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + parseInt(p.price)
        })
        return amount;
    }


    const onPurchase = () => {
        setInfo({ loading: true })
        //************************************************ */
        //TODO: Loading Part and disable buy now button
        /************************************************* */

        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
            .then(data => {
                console.log("nonce", data);
                nonce = data.nonce;
                const paymentData = {
                    PaymentMethodNonce: nonce,
                    amount: getAmount()
                };

                processPayment(userId, token, paymentData)
                    .then(res => {
                        console.log(res);
                        if (res.error) {
                            if (res.code === "1") {
                                console.log("Payment Fails!.....");
                                alert('Payment Fails!!!.....');
                                signout(() => {
                                    return <Redirect to="/" />
                                })
                            }
                        } else {
                            setInfo({
                                ...info,
                                success: res.success,
                                loading: false
                            })
                            console.log("Payment Success");
                            alert('payment success');
                            let product_names = ""
                            products.forEach(function (item) {
                                product_names += item.name + ","
                            });

                            const orderData = {
                                products: product_names,
                                transaction_id: res.transaction.id,
                                amount: res.transaction.amount
                            }

                            CreateOrder(userId, token, orderData)
                                .then(response => {
                                    if (response.error) {
                                        if (response.code == "1") {
                                            console.log("Order Fails");
                                            alert('Order Fails');
                                        }
                                        signout(() => {
                                            return <Redirect to="/" />
                                        })
                                    } else {
                                        if (response.success == true) {
                                            console.log('Order Placed');
                                            alert('Order Placed!!!.....');
                                        }
                                    }
                                })
                                .catch(e => (
                                    setInfo({ loading: false, success: false }),
                                    console.log("order Fails", e)
                                ));
                            cartEmpty(() => {
                                console.log('Cart is empty');
                                alert('cart is Empty');
                            });
                            setReload(!reload);
                        }
                    })
                    .catch(e => console.log("send Nonce to Backend error", e))
            })
            .catch(e => console.log("Nonce error", e))

    }

    const showbtnDropIn = () => {
        return (
            <div>
                {
                    info.clientToken !== null && products.length > 0 ?
                        (
                            <div>
                                <DropIn options={{ authorization: info.clientToken }}
                                    onInstance={instance => (info.instance = instance)}
                                />
                                <button onClick={onPurchase} className="btn btn-block btn-success">Buy Now</button>
                            </div>
                        ) : (
                            <h3>Please Login First or Add something in cart</h3>
                        )
                }
            </div>
        )
    }

    return (
        <div>
            <h1>Your Bill is {getAmount()}</h1>
            {showbtnDropIn()}
        </div>
    )
}

export default PaymentB;