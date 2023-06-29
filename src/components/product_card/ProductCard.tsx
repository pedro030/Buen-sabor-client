import './productCard.scss'
import productImage from '../../assets/salad.jpg'

const ProductCard = () => {

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
        {/* <figure><img src={productImage} alt="product-image" /></figure> */}
        <div className="card-body">
          <h2 className="card-title">Product Name</h2>
          <p>Product short description</p>
          <p>$50</p>
          <div className="justify-center card-actions">
            <button className="btn btn-primary btn-disabled">Add order</button>
          </div>
        </div>
      </div>
      {/* onClick = {()=> window.my_modal_3.showModal()} ABRIR MODAL
     <dialog id="my_modal_3" className="modal">
    <form method="dialog" className="modal-box">
      <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
      <h3 className="text-lg font-bold">Hello!</h3>
      <p className="py-4">Press ESC key or click on ✕ button to close</p>
    </form>
  </dialog> */}
    </>

  )
}

export default ProductCard
