import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity,img, key,price} = props.product;
    const reviewItemStyle = {
        borderBottom : '1px solid lightgray',
        marginBottom : '5px',
        paddingBottom : '5px',
        marginLeft : '20px',
        padding : '20px'
    }
    return (
        <div style={{display:'flex'}}>
            <div>
                <img src={img} alt=""/>
            </div>
            <div style={reviewItemStyle}>
                <h3 className = "product-name">{name}</h3>
                <p> Quantity: {quantity}</p>
                <p><small>$ {price}</small></p>
                <button 
                className = "main-button"
                onClick = {()=> props.removeProduct(key)}
                >Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;