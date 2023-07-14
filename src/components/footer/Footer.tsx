import './Footer.scss';
import facebook from "../../assets/facebook-logo.png";
import insta from "../../assets/instagam-logo.png";
import whatsapp from "../../assets/whatsapp-logo.png";
import twitter from "../../assets/twitter-logo.png";
import logo from "../../assets/logoBuenSabor.png";

const Footer = () => {


    return (
        <>
            <footer className="p-10 footer bg-base-200 text-base-content">
                <div>
                    <h1 className='text-4xl font-bold text-red-600'>Buen Sabor</h1>
                    <p>Buen sabor Rte.<br />Providing delicious food since 2023</p>
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </div>
            </footer>
            <footer className="px-10 py-4 border-t footer bg-base-200 text-base-content border-base-300">
                <p>Copyright © 2023 - All right reserved by Buen Sabor Rte</p>
            </footer>
        </>

    )
}

export default Footer