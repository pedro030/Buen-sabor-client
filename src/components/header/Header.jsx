import React from 'react'
import './Header.scss'
import setting from '../../assets/setting.svg'
import bike from '../../assets/bike.svg'
import cart from '../../assets/cart.svg'
// import searcher from '../../assets/searcher.svg'


const  Header = () => {
    return (
        <nav className="nav">
            <div className='top_nav'>
                <div className="logo">
                    <h1>Buen Sabor</h1>
                    {/* <h4>by UTN</h4> */}
                </div>
                <div >
                    <input className="searchInput" type='search'placeholder="         Search Food"></input>
                    </div>
                    
                    <ul className="items">
                        <li><img src={setting} height="25"/></li>

                        <li>
                            <div className='circle'>
                                <img src={bike} height="25"/>
                                <div className='circle small_circle'>1</div>
                            </div>
                            
                        </li>

                        <li><img src={cart} height="25"/></li>
                        <li><button>Sign in</button></li>
                    </ul>
                    
                
            </div>
            <div className="under_nave">
                <ul className="items">
                    <li className='active'>Home</li>
                    <li>Order</li>
                    <li>Menu</li>
                    <li>About us</li>
                </ul>
            </div>
        </nav>
    )
  }

  export default Header