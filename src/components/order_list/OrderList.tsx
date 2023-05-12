import './OrderList.scss'

function OrderList() {
  return (
    <div className='main-container-order'>
        <div className="container-order">
            <div className='container-order-header'>
                <span>My Order</span>
                <span>EDIT</span>
            </div>
            <div className='container-order-list'>
                <div className='order-list'>
                    <span className='qty-and-product'>1x Name Product</span>
                    <span className='order-list-price'>$Price</span>
                </div>
                <div className='order-list'>
                    <span className='qty-and-product'>1x Name Product</span>
                    <span className='order-list-price'>$Price</span>
                </div>
                <div className='order-list'>
                    <span className='qty-and-product'>1x Name Product</span>
                    <span className='order-list-price'>$Price</span>
                </div>
            </div>
            <div className="container-order-subtotal"><span className='subtotal-item'>Subtotal: $Price</span></div>
            <div className="container-btn"><button className='btn-continue'>Continue</button></div>
        </div>
    </div>
  )
}

export default OrderList