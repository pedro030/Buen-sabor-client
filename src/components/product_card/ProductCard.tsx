import './productCard.scss'
import productImage from '../../assets/salad.jpg'
import { useState } from 'react';
import ProductDetail from '../product_detail/ProductDetail';

const ProductCard = () => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
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
              <button className='btn btn-primary btn-circle btn-xs'>+</button>
          </div>
        </div>
        <div onClick={() => handleOpenDeleteModal()} className="card-body">
          <h2 className="card-title">Product Name</h2>
          <p>Product short description</p>
          <p>$50</p>
        </div>
      </div>
      <ProductDetail
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
              />
    </>
  )
}

export default ProductCard
