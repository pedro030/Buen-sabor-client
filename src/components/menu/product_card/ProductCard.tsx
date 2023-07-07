import './productCard.scss'
import productImage from '../../assets/salad.jpg'
import { useContext, useState } from 'react';
import ProductDetail from '../product_detail/ProductDetail';
import { CartContext } from '../../../context/cart';

const ProductCard = ({ product } : any) => {

  const { addToCart } : any = useContext(CartContext);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleOpenProductModal = () => {
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
  };

  const handleConfirmDelete = () => {
    
  };

  return (
    <>
      <div className="shadow-xl card card-compact max-[1025px]:max-h-[15rem] max-[1025px]:max-w-[11rem] bg-base-100">
        <div className="hero h-[14rem] max-[1025px]:max-h-[8rem]  rounded-md  bg-[url('src/assets/salad.jpg')] flex items-start justify-end">
          <div className="bg-opacity-80 "></div>
          <div className=" hero-content">
              <button className='btn btn-primary btn-circle btn-xs' onClick={() => addToCart(product)}>+</button>
          </div>
        </div>
        <div onClick={() => handleOpenProductModal()} className="card-body">
          <h2 className="card-title max-[1025px]:text-sm">{product.name}</h2>
          <p className='max-[1025px]:hidden'>Product short description</p>
          <p>${product.price}</p>
        </div>
      </div>
      <ProductDetail
                product={product}
                isOpen={isProductModalOpen}
                onClose={handleCloseProductModal}
                onConfirm={handleConfirmDelete}
              />
    </>
  )
}

export default ProductCard
