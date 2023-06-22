import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import Carousel from '../../components/carousel/Carousel'
import Menu from '../../components/menu/Menu'
import Footer from '../../components/footer/Footer'




const MenuPage = () => {

    function scrollToSection() {
        const seccionDestino = document.getElementById('menuSeccion');
        if (seccionDestino) {
            seccionDestino.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        scrollToSection();
    }, []);

    return (
        <div>
            {/* <Header /> */}
            <Carousel />
            <Menu />
        </div>
    )
}

export default MenuPage