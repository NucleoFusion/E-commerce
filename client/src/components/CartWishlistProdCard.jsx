import React from 'react'

function CartWishlistProdCard(props) {
  return (
    <div className='CartWishlistProdCard-container'>
        <div className='CartWishlistProdCard-img-container'>
            <img src={props.imgSrc} />
        </div>
        <div className='CartWishlistProdCard-details'>
            <h3>{props.name}</h3>
            <h4>{props.price}</h4>
            <p>{props.descr}</p>
        </div>
    </div>
  );
}

export default CartWishlistProdCard;