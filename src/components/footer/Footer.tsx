import './Footer.scss';
import facebook from "../../assets/facebook-logo.png";
import insta from "../../assets/instagam-logo.png";
import whatsapp from "../../assets/whatsapp-logo.png";
import twitter from "../../assets/twitter-logo.png";
import logo from "../../assets/logoBuenSabor.png";

const Footer = () => {


    return (
        <>
            <footer className="p-10 mt-5 footer bg-base-200 text-base-content">
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
        // <section className="Footer">
        //     <div className='Footer-top'>
        //         <div className='Footer-top_left'>Instagram Feed</div>
        //         <div className='Footer-top_center'><img src={logo} alt="logo" /></div>
        //         <div className='Footer-top_right'>
        //             <div className='Footer-top_right_container'>
        //                 <img src={whatsapp} alt="whatsapp" />
        //                 <img src={insta} alt="insta" />
        //                 <img src={facebook} alt="facebook" />
        //                 <img src={twitter} alt="twitter" />
        //             </div>
        //         </div>
        //     </div>
        //     <div className='Footer-middle'>
        //         <div className='Footer-middle_left'>
        //             <h4>Contact</h4>
        //             <p>5 Rue Dalou, 75015 Paris
        //                 Call - +33 156 78 89 56
        //                 benoit@mail.com</p>
        //         </div>
        //         <div className='Footer-middle_center'>
        //             <p>Join our mailing list for updates,</p>
        //             <p>Get news & offers events.</p>
        //             <input type="text" value="Email" />
        //             <button>Suscribe</button>
        //         </div>
        //         <div className='Footer-middle_right'>
        //             <h5>Working Hours</h5>
        //             <p>Mon - Fri: 7.00am - 6.00pm</p>
        //             <p>Sat: 7.00am - 6.00pm</p>
        //             <p>Sun: 8.00am - 6.00pm</p>
        //         </div>
        //     </div>
        //     <div className='Footer-bottom'>
        //         <div className='Footer-bottom_left'>
        //             <p className='Footer-bottom_left_h5'>© Copyright - Restaurantate | Designed by VictorFlow Templates - Powered by Webflow</p>
        //         </div>
        //         <div className='Footer-bottom_right'>
        //             <p className='Footer-bottom_right_h5'>Styleguide / Licenses</p>
        //         </div>
        //     </div>
        // </section>

    )
}

export default Footer