import React from 'react'
import './Header.scss'

const  Header = () => {
    return (
        <nav className="nav">
            <div className='top_nav'>
                <div className="logo">
                    <h1>Buen Sabor</h1>
                    {/* <h4>by UTN</h4> */}
                </div>
                <div >
                    <input className="searchInput" type='search'placeholder="&#xF002; Search Food"></input>
                    </div>
                    
                    <ul className="items">
                        <li><i class="fa-light fa-gear"></i></li>
                        <li><i class="fa-light fa-bicycle"></i></li>
                        <li>cart</li>
                        <li><button>Sign in</button></li>
                    </ul>
                    
                
            </div>
            <div className="under_nave">
                <ul className="items">
                    <li>Home</li>
                    <li>Order</li>
                    <li>Take away</li>
                    <li>About us</li>
                </ul>
            </div>
        </nav>
    )
  }

  export default Header