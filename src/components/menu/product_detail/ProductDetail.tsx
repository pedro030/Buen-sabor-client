import React, { useContext, useState, useEffect, useRef } from 'react'
import './ProductDetail.scss'
import productImage from '../../../assets/salad.jpg'
import pizzaSvg from '../../../assets/pizza.svg'
import fireSvg from '../../../assets/fire.svg'
import clockSvg from '../../../assets/clock.svg'
import arrowLeftSvg from "../../../assets/arrow-left.svg";
import ReactModal from 'react-modal';
import { CartContext } from '../../../context/cart'
import { useMediaQuery } from 'react-responsive'

interface ProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ProductDetail: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onConfirm }) => {
  const isTable = useMediaQuery({ maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const [qty, setQty] = useState(1);
  const { addToCart }: any = useContext(CartContext);

  useEffect(() => {
    setQty(1);
  }, [addToCart])

  const modalRef = useRef(null);

  const handleClickOutside = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal-delete">
      <div className="rounded modal modal-open">
        <div ref={modalRef} className='w-[80vw] h-[85vh] flex max-lg:flex-col relative rounded-3xl bg-base-100 z-10 mt-[6rem] overflow-auto'>

          {/* Back Arrow */}
          <div className="absolute flex items-center text-sm text-white top-5 left-5 hover:cursor-pointer">
            <img src={arrowLeftSvg} alt="" />
            <a className='ml-1' onClick={onClose}><p>back to menu</p></a>
          </div>

          {/* Image */}
          <img src={productImage} alt="product image" className="object-cover w-2/4 max-lg:w-full max-lg:h-80 rounded-s-3xl" />

          {/* Description */}
          <div className="flex flex-col items-center p-10">
            <div className="product-description">
              <button className='mb-1 rounded-full btn btn-primary btn-xs'>HOTSALE</button>
              <h3 className='text-xl font-semibold'><img className='inline my-4 mr-4' src={pizzaSvg} alt="category-icon" height="28" />{product.name}</h3>
              <div className="description-items">
                <span>Category</span>
                <span className='max-sm:text-sm'><img src={fireSvg} alt="category-icon" className='h-4 max-sm:h-3' />Calorias</span>
                <span className='max-sm:text-sm'><img src={clockSvg} alt="category-icon" className='h-4 max-sm:h-3' />Tiempo</span>
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


          {
            (!isTable) &&
            <>
              {/* Bottom navbar */}
              <div className="grid grid-cols-3 gap-3 p-4 button-section">

                <div className="flex">
                  <img src={pizzaSvg} alt="category icon" className='block mr-4' />
                  <div className='flex flex-col justify-center gap-1 text-left'>
                    <p>{product.name}</p>
                    <span className='text-xs font-medium tracking-widest uppercase text-[#E73636]'>category</span>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" qty-input">
                    <label htmlFor="">Qty: </label>
                    <button className='btn btn-primary btn-outline btn-xs' onClick={() => { qty > 1 ? setQty(qty - 1) : '' }}>-</button>
                    <input className='w-10 p-2 mx-2 input input-bordered input-neutral input-sm' type="number" min={1} value={qty} disabled />
                    <button className='btn btn-primary btn-outline btn-xs' onClick={() => setQty(qty + 1)}>+</button>
                  </div>
                </div>

                <button className='mx-1 btn btn-primary' onClick={() => { addToCart(product, true, qty); onClose(); }}>Add to Cart</button>
              </div>
            </>
          }

          {/*  Bottom navbar of table*/}
          {
            (isTable) &&
            <>
              <div className="grid grid-cols-3 max-lg:grid-cols-[1fr_auto_1fr] max-sm:grid-rows-2 max-sm:grid-cols-1 gap-3 p-4 border max-lg:gap-2">

                {(isMobile) &&
                  <div className='grid grid-cols-2 '>
                    {/* Left Text */}
                    <div className="flex items-center justify-center order-first">
                      <img src={pizzaSvg} alt="category icon" className='block h-10 mr-4 max-[828px]:h-8' />
                      <div className='flex flex-col justify-center gap-1 text-left max-lg:text-sm max-[828px]:text-xs'>
                        <p>{product.name}</p>
                        <span className='text-xs font-medium tracking-widest uppercase text-[#E73636]'>category</span>
                      </div>
                    </div>

                    {/* Quality */}
                    <div className="flex items-center justify-center order-last">
                      <div className=" qty-input">
                        <label className='max-lg:text-xs' htmlFor="">Qty: </label>
                        <button className='btn btn-primary btn-outline btn-xs max-lg:w-2' onClick={() => { qty > 1 ? setQty(qty - 1) : '' }}>-</button>
                        <input className='w-10 p-2 mx-2 input input-bordered input-neutral input-sm' type="number" min={1} value={qty} disabled />
                        <button className='btn btn-primary btn-outline btn-xs max-lg:w-2' onClick={() => setQty(qty + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                }

                {
                  (!isMobile) &&
                  <>
                    {/* Left Text */}
                    <div className="flex items-center justify-center">
                      <img src={pizzaSvg} alt="category icon" className='block h-10 mr-4 max-[828px]:h-8' />
                      <div className='flex flex-col justify-center gap-1 text-left max-lg:text-sm max-[828px]:text-xs'>
                        <p>{product.name}</p>
                        <span className='text-xs font-medium tracking-widest uppercase text-[#E73636]'>category</span>
                      </div>
                    </div>

                    {/* Quality */}
                    <div className="flex items-center justify-center">
                      <div className=" qty-input">
                        <label className='max-lg:text-xs' htmlFor="">Qty: </label>
                        <button className='btn btn-primary btn-outline btn-xs max-lg:w-2' onClick={() => { qty > 1 ? setQty(qty - 1) : '' }}>-</button>
                        <input className='w-10 p-2 mx-2 input input-bordered input-neutral input-sm' type="number" min={1} value={qty} disabled />
                        <button className='btn btn-primary btn-outline btn-xs max-lg:w-2' onClick={() => setQty(qty + 1)}>+</button>
                      </div>
                    </div>
                  </>
                }

                {/* Btn */}
                <button className='mx-1 btn btn-primary max-sm:w-full' onClick={() => { addToCart(product, true, qty); onClose(); }}>Add to Cart</button>

              </div>
            </>
          }

        </div>
      </div>
    </ReactModal >
  )
}

export default ProductDetail