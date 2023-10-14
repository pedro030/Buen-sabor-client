// React
import { useEffect } from 'react'

// Components
import Header from '../../components/header/Header'
import Carousel from '../Home/carousel/Carousel'
import Menu from '../../components/menu/Menu'

const MenuPage = () => {
    // Scroll to Menú
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
            <Header />
            <Carousel />
            <Menu />
        </div>
    )
}

export default MenuPage