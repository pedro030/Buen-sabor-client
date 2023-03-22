import React from 'react'
import './Menu.scss'
import ProductCard from '../product_card/productCard'
import clean from '../../assets/clean.svg'


const Menu = () => {
    return (
        <div className="menu">
            <h3>Menu</h3>
            <div className='details_menu'>
                <div className='filter'>
                    <div className="header_filter">
                        <h2>filter</h2>
                        <div>
                            <img src={clean} height='20' />
                            <h4>Clear filters</h4>
                        </div>
                    </div>
                    <div className="category_filter">
                        <h4>Cusine/Food Type</h4>
                        <div className="list_checkout">
                        <input type="checkbox"></input><span>American</span>
                        <input type="checkbox"></input>
                        <input type="checkbox"></input>
                        <input type="checkbox"></input>
                        <input type="checkbox"></input>
                        <input type="checkbox"></input>
                        </div>
                    </div>
                </div>
                <div className='products'>
                    <div className='order_product'>
                        <div>Found <span>376</span> results in 54 seconds</div>
                        <div><button>sort</button></div>
                        <div><button>paginable</button></div>
                        <div><button>boxs</button><button>rows</button></div>
                    </div>
                    <div className="list_products">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
                <div className='order'>
                    <div className="box_order">
                        <div className='order_detail'>
                            <div className="header_order">
                                <h2>My order</h2>
                                <h4>edit</h4>
                            </div>
                            <hr />
                            <div className="product_order">
                                <h4>1x Pizza mozarella</h4>
                                <h4>$1700</h4>
                            </div>
                            <div className="product_order">
                                <h4>1x Pizza mozarella</h4>
                                <h4>$1700</h4>
                            </div>
                            <div className="product_order">
                                <h4>1x Pizza mozarella</h4>
                                <h4>$1700</h4>
                            </div>
                        </div>
                        <div className="button_order">
                            <h4 className='subtotal'>subtotal: xxx</h4>
                            <div className='btn_continue'><button>Continue</button></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Menu