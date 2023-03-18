const  Header = () => {
    return (
        <header>
            <nav className="nav">
                <div className="logo">
                    <h1>Buen Sabor</h1>
                </div>
                <div className="searchInput">
                    <input type='search'></input>
                    <button type="button">Search</button></div>
                    
                    <div className="items">
                    <div className="setting">Setting</div>
                    <div className="bike">Bike</div>
                    <div className="cart">Cart</div>
                    <div className="signUp">Sign up</div>
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