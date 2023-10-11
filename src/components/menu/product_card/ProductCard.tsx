// React
import React, { useContext, useState } from 'react';

// Context
import { CartContext } from '../../../context/cart';

// Components
import ProductDetail from '../product_detail/ProductDetail';
import { IProductCardProps } from '../../../models/IProductCardProps';
import { ICartContext } from '../../../models/ICartContext';


const ProductCard = ({ product }: IProductCardProps) => {
  // Add to Cart function
  const { addToCart }: ICartContext = useContext(CartContext);

  // Product Detail Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);

  // Open Product Detail Modal
  const handleOpenProductModal = () => {
    setIsProductModalOpen(true);
  };

  // Close Product Detail Modal
  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
  };

  return (
    <>
      <div className="w-[250px] max-sm:w-[80%] shadow-xl  card-compact card bg-base-100  h-[15rem]">
        <div style={{ backgroundImage: `url(${product.image ? product.image : 'src/assets/salad.jpg'})` }} className={`hero  h-[80%] w-full rounded-md flex items-start justify-end`}>
          <div className="bg-opacity-80 "></div>
          <div className=" hero-content">
            <button className='btn btn-primary btn-circle btn-xs max-sm:btn-sm' onClick={() => addToCart(product)}><span className='max-sm:text-lg'>+</span></button>
          </div>
        </div>
        <div onClick={() => handleOpenProductModal()} className="card-body">
          <h2 className="text-lg card-title max-xl:text-sm">{product.name}</h2>
          <p className='max-xl:hidden'>Product short description</p>
          <p>${product.price}</p>
        </div>
      </div>
      <ProductDetail
        product={product}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
      />
    </>
  )
}

export default ProductCard
