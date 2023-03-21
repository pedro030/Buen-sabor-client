import './productCard.scss'
import productImage from '../../assets/salad.jpg'

const ProductCard = () => {

  return (
    <div className='card'>
        <img src={productImage} alt="product-image" className='card-image' width = "295" height = "240"/>
        <div className="card-text">
            <h3>Product Name</h3>
            <p className="card-description">Product short description</p>
            <h3>$50</h3>
        </div>
    </div>
  )
}

  export default ProductCard
