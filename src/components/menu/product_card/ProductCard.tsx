import './productCard.scss'
import productImage from '../../assets/salad.jpg'
import { useContext, useState } from 'react';
import ProductDetail from '../product_detail/ProductDetail';
import { CartContext } from '../../../context/cart';

const ProductCard = ({ product } : any) => {

  const { addToCart } : any = useContext(CartContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenProductModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    
  };

  return (
    <>
      <div className="shadow-xl card card-compact w-96 bg-base-100">
        <div className="hero h-[14rem] rounded-md  bg-[url('src/assets/salad.jpg')] flex items-start justify-end">
          <div className="bg-opacity-80 "></div>
          <div className=" hero-content">
              <button className='btn btn-primary btn-circle btn-xs' onClick={() => addToCart(product)}>+</button>
          </div>
        </div>
        <div onClick={() => handleOpenProductModal()} className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>Product short description</p>
          <p>${product.price}</p>
        </div>
      </div>
      <ProductDetail
                isOpen={isDeleteModalOpen}
                onClose={handleCloseProductModal}
                onConfirm={handleConfirmDelete}
              />
    </>
  )
}

export default ProductCard
