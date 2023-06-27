import './productCard.scss'
import productImage from '../../assets/salad.jpg'

const ProductCard = () => {

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure><img src={productImage} alt="product-image" /></figure>
      <div className="card-body">
        <h2 className="card-title">Product Name</h2>
        <p>Product short description</p>
        <p>$50</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary btn-disabled">Add order</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
