import React, { useState, useEffect } from 'react';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/Carthelper';
import PaymentB from './PaymentB';

const Cart = () => {

    const [product, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(()=>{
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = (products) => {
        return (
            <div>
                {products.map((product, i)=>(
                    <Card 
                        key={i}
                        product={product}
                        removeFromCart={true}
                        addtoCart={false}
                        reload={reload}
                        setReload={setReload}
                    />
                ))}
            </div>
        )
    }

    const loadCheckOut = () => {
        return (
            <div>
                <h1>CheckOut</h1>
            </div>
        )
    }
    return (
        <Base title="Cart Page" description="Welcome to CheckOut">
            <div className="row text-center">
                <div className="col-6 ">
                    {product.length > 0 ? (loadAllProducts(product)) : (<h2>No Products</h2>)}
                </div>
                <div className="col-6 ">
                    {product.length > 0 ? (
                        <PaymentB
                            products={product}
                            setReload={setReload}
                        />
                    ):
                    (
                        <h3>Please Login or Add something in cart</h3>
                    )}
                </div>
            </div>
        </Base>
    )
}

export default Cart;