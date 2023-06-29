import React from 'react'
import './ProductDetail.scss'
import productImage from '../../assets/salad.jpg'
import pizzaSvg from '../../assets/pizza.svg'
import fireSvg from '../../assets/fire.svg'
import clockSvg from '../../assets/clock.svg'
import arrowLeftSvg from "../../assets/arrow-left.svg";
import ReactModal from 'react-modal';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ProductDetail: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal-delete">
      <div className="rounded-lg modal modal-open">
        <div className='w-[80vw] h-[85vh] flex relative rounded-lg bg-base-100 z-10 mt-[6rem]'>
          <div className="absolute flex items-center text-sm text-white top-5 left-5 hover:cursor-pointer">
            <img src={arrowLeftSvg} alt="" />
            <a onClick={event => window.location.href = 'http://localhost:5173/'}><p>back to menu</p></a>
          </div>
          <img src={productImage} alt="product image" className="object-cover w-2/4 rounded-lg" />
          <div className="flex flex-col items-center p-6">
            <div className="product-description">
              <button className='rounded-full btn btn-primary btn-xs'>HOTSALE</button>
              <h3 className='text-xl font-semibold'><img src={pizzaSvg} alt="category-icon" height="28" /> Nombre Producto</h3>
              <div className="description-items">
                <span>Category</span>
                <span><img src={fireSvg} alt="category-icon" height="16" />Calorias</span>
                <span><img src={clockSvg} alt="category-icon" height="16" />Tiempo</span>
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
          <div className="button-section">
            <div className="info">
              <img src={pizzaSvg} alt="category icon" />
              <p>
                Product Name<br />
                <span>category</span>
              </p>
            </div>
            <div className="add-to-cart">
              <div className="qty-input">
                <label htmlFor="">Qty: </label>
                <button>-</button>
                <input type="text" maxLength={2} />
                <button>+</button>
              </div>
              <button className='btn btn-primary'>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  )
}

export default ProductDetail