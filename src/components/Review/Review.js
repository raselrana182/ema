import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);
    const removeProduct = (productKey)=>{
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // const counts = Object.values(savedCart);
        const cartProducts = productKeys.map(key => {
            const product  = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[])
    return (
        <div>
            {
                cart.map(pd => <ReviewItem 
                    removeProduct = {removeProduct}
                    key = {pd.key}
                    product = {pd}></ReviewItem>)
            }
        </div>
    );
};

export default Review;