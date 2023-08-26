import './productCard.scss'
import productImage from '../../assets/salad.jpg'
import { useContext, useState } from 'react';
import ProductDetail from '../product_detail/ProductDetail';
import { CartContext } from '../../../context/cart';

const ProductCard = ({ product }: any) => {

  const { addToCart }: any = useContext(CartContext);
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
      <div className="max-w-full shadow-xl max-h-[25rem] card-compact card bg-base-100 max-xl:max-h-[20rem] max-lg:max-h-[15rem]">
        <div style={{backgroundImage: `url(${product.image? product.image: 'src/assets/salad.jpg'})`}} className={`hero h-[50%] w-full rounded-md flex items-start justify-end`}>
          <div className="bg-opacity-80 "></div>
          <div className=" hero-content">
            <button className='btn btn-primary btn-circle btn-xs' onClick={() => addToCart(product)}>+</button>
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
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

export default ProductCard
