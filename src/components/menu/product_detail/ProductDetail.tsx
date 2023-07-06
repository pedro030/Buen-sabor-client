import React from 'react'
import './ProductDetail.scss'
import productImage from '../../../assets/salad.jpg'
import pizzaSvg from '../../../assets/pizza.svg'
import fireSvg from '../../../assets/fire.svg'
import clockSvg from '../../../assets/clock.svg'
import arrowLeftSvg from "../../../assets/arrow-left.svg";
import ReactModal from 'react-modal';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ProductDetail: React.FC<ProductModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal-delete">
      <div className="rounded modal modal-open">
        <div className='w-[80vw] h-[85vh] flex relative rounded-3xl bg-base-100 z-10 mt-[6rem]'>
          <div className="absolute flex items-center text-sm text-white top-5 left-5 hover:cursor-pointer">
            <img src={arrowLeftSvg} alt="" />
            <a className='ml-1' onClick={event => window.location.href = 'http://localhost:5173/'}><p>back to menu</p></a>
          </div>
          <img src={productImage} alt="product image" className="object-cover w-2/4 rounded-s-3xl" />
          <div className="flex flex-col items-center p-10">
            <div className="product-description">
              <button className='mb-1 rounded-full btn btn-primary btn-xs'>HOTSALE</button>
              <h3 className='text-xl font-semibold'><img className='inline my-4 mr-4' src={pizzaSvg} alt="category-icon" height="28" /> Nombre Producto</h3>
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
          <div className="grid grid-cols-3 gap-3 p-4 button-section">

            <div className="info">
              <img src={pizzaSvg} alt="category icon" />
              <p>
                Product Name<br />
                <span className='tracking-widest uppercase '>category</span>
              </p>
            </div>

            <div className="add-to-cart">
              <div className=" qty-input">
                <label htmlFor="">Qty: </label>
                <button className='btn btn-primary btn-outline btn-xs'>-</button>
                <input className='w-10 p-2 mx-2 input input-bordered input-neutral input-sm' type="text" maxLength={2} />
                <button className='btn btn-primary btn-outline btn-xs'>+</button>
              </div>
            </div>

            <button className='mx-1 btn btn-primary '>Add to Cart</button>
          </div>
        </div>
      </div>
    </ReactModal>
  )
}

export default ProductDetail