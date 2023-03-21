import React from 'react'
import './ProductDetail.scss'
import productImage from '../../assets/salad.jpg'
import pizzaSvg from '../../assets/pizza.svg'
import fireSvg from '../../assets/fire.svg'
import clockSvg from '../../assets/clock.svg'
import arrowLeftSvg from "../../assets/arrow-left.svg";

const ProductDetail = () => {
  return (
    <div className='modal product-detail'>
      <div className="button-back">
        <img src={arrowLeftSvg} alt=""/> <p>Volver al listado</p>
      </div>
      <img src={productImage} alt="product image" className="product-image"/>
      <div className="description-section">
        <div className="product-description">
            <h3><img src={pizzaSvg} alt="category-icon" height="28"/> Nombre Producto</h3>
            <div className="description-items">
                <span>Category</span>
                <span><img src={fireSvg} alt="category-icon" height="16"/>Calorias</span> 
                <span><img src={clockSvg} alt="category-icon" height="16"/>Tiempo</span>
            </div>
            <div className="description-text">
                <h4>Description:</h4>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio aliquam quo quos officia voluptatem. Nobis enim, est recusandae ipsa deleniti corrupti veritatis, illo ipsam ad sint tenetur dolore, deserunt in?</p>
                <h4>Ingredients:</h4>
                <ul>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail