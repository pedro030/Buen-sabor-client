import React from 'react'
import './Header.scss'

const  Header = () => {
    return (
        <header>
            <nav className="nav">
                <div className="logo">
                    <h1>Buen Sabor</h1>
                    {/* <h4>by UTN</h4> */}
                </div>
                <div >
                    <input className="searchInput" type='search'placeholder="&#xF002; Search Food"></input>
                    </div>
                    
                    <div className="items">
                    <div ><i class="fa-light fa-gear"></i></div>
                    <div><i class="fa-light fa-bicycle"></i></div>
                    <div >cart</div>
                    <div><button>Sign in</button></div>
                    </div>
                    
                
            </nav>
            <nav className="items">
                <div>Home</div>
                <div>Order</div>
                <div>Take away</div>
                <div>About us</div>
            </nav>
        </header>
    )
  }

  export default Header