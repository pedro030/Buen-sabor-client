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
        <div className="hero h-[14rem] rounded-md  bg-[url('src/assets/salad.jpg')]">
          <div className="bg-opacity-80"></div>
          <div className="hero-content ">
            <div className="max-w-md">
              
            </div>
          </div>
        </div>
        <div className="card-body">
          <h2 className="card-title">Product Name</h2>
          <p>Product short description</p>
          <p>$50</p>
          <div className="justify-center card-actions">
            <button className="btn btn-primary" onClick={() => handleOpenDeleteModal()}>Add order</button>
          </div>
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
