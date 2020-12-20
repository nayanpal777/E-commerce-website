import React, { useState, useEffect } from 'react';
import { getProduct } from '../cors/helper/Corsapicall';

import Base from './Base'
import Card from './Card';

function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getProduct()
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    setProducts(data)
                }
            });
    }

    useEffect(()=> {
        loadAllProducts();
    }, []);
    return (
        <Base title="Home Page" description="Welcome to T-shirt Store">
            <h1>Home Component</h1>
            <div className="row container">
                {products.map( (product, index) =>{
                    return(
                        <div key={index}>
                            <Card product={product}/>       
                        </div>
                    );
                })}
            </div>
        </Base>
    );
}

export default Home;