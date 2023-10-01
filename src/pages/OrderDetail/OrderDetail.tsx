// React
import { useContext, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

// React Router
import { NavigateFunction, useNavigate } from 'react-router-dom'

// Mercado Pago
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

// Contexts
import { CartContext } from '../../context/cart'
import { PaymenthDeliveryContext } from '../../context/paymenth-delivery'

// Components
import EditCartModal from '../../components/menu/EditCartModal/EditCartModal'
import SelectAddressModal from './Components/SelectAddressModal'

// Types
import { ICartContext, MCart } from '../../models/ICartContext'

// Assets
import pizzaSvg from '../../assets/pizza.svg'


const OrderDetail = () => {
    // Cart
    const { cart }: ICartContext = useContext(CartContext);

    // States: Delivery / Take Away - Cash / MP - Address
    const { deliveryTakeAway, setDeliveryTakeAway, mp, setMp, deliveryAddress, setDeliveryAddress }: any = useContext(PaymenthDeliveryContext);

    // Navigation
    const navigate: NavigateFunction = useNavigate();

    // Select Address Modal State
    const [isSelectAddressOpen, setSelectAddressOpen] = useState<boolean>(false);

    // Edit Cart Modal State
    const [isEditCartModalOpen, setIsEditCartModalOpen] = useState<boolean>(false);

    // Mercado Pago
    const [preferenceId, setPreferenceId] = useState(null)
    initMercadoPago('YOUR_PUBLIC_KEY');

    // TODO: Agregar al precio final $100 Service Fee y Descuento del 10% si es Take Away
    const createPreference = async () => {
        try {
            const response = await fetch("http://localhost:8080/create_preference", {
                method: 'POST',
                body: JSON.stringify({
                    description: "Bananita contenta",
                    price: 100,
                    quantity: 1,
                })
            }
            );

            const { id } = response.body;
            return id;
        } catch (error) {
            console.log(error);
        }
    };

    const handleBuy = async () => {
        const id = await createPreference();
        if (id) {
            setPreferenceId(id);
        }
    };

    // Calcula el total del carrito
    const totalPrice = cart.reduce((total: number, item: MCart) => {
        const itemPrice = item.product.price * item.quantity;
        return total + itemPrice;
    }, 0);

    // Open Edit Cart Modal
    const handleOpenEditCartModal = () => {
        setIsEditCartModalOpen(true);
    };

    // Close Edit Cart Modal
    const handleCloseEditCartModal = () => {
        setIsEditCartModalOpen(false);
    };

    // Max coocking time product to calculate estimated time
    const estimatedTime = cart.reduce((prevItem: MCart, actualItem: MCart) => {
        return actualItem.product.cookingTime > prevItem.product.cookingTime ? actualItem : prevItem;
      });

    return (
        <>
            { /* HEADER */}
            <header className='flex items-center justify-between h-16 border flex-rows'>
                <a className='flex flex-row items-center gap-2 pl-5 cursor-pointer' onClick={() => navigate('/')}><BiArrowBack /> Back </a>
                <a className="text-xl normal-case cursor-pointer"><h1 className=' font-bold text-red-600 min-w-[28px] ml-10 max-lg:mx-1' onClick={() => navigate('/')}>Buen Sabor</h1></a>
                <div></div>
            </header>
            { /* STEPS */}
            <div className='my-5'>
                <div className='flex justify-center mb-5'>
                    <ul className="steps">
                        <li className="step step-primary">Choice Product</li>
                        <li className="step step-primary">Create Order</li>
                        <li className="step step-primary">Follow Up</li>
                        {mp ? <><li className='step'>Pay</li><li className='step'>Ordered</li><li className='step'>Delivered!</li></> : <><li className='step'>Ordered</li><li className='step'>Delivered!</li></>}
                    </ul>
                </div>
                <div className='flex justify-center'>
                    <div className="grid grid-cols-[1000px_400px] ">
                        <div className="grid grid-rows-3 gap-7 ">

                            {/* DELIVERY */}
                            <div className="flex justify-center">
                                <div className={"grid grid-rows-[50px_1fr] bg-white h-64 w-[80%] rounded-3xl"}>
                                    { /* SELECT DELIVERY / TAKE AWAY */}
                                    <div className="grid grid-cols-2 join">
                                        <input className="rounded-full join-item btn" type="radio" name="delivery" aria-label="Delivery" onClick={() => { setDeliveryTakeAway(true); setMp(true) }} defaultChecked={deliveryTakeAway ? true : false} />
                                        <input className="rounded-full join-item btn" type="radio" name="delivery" aria-label="Take Away" onClick={() => setDeliveryTakeAway(false)} defaultChecked={!deliveryTakeAway ? true : false} />
                                    </div>

                                    { /* SELECT ADDRESS */}
                                    <div className="p-4">
                                        <div className="flex justify-between py-2">
                                            { deliveryTakeAway ? <h1>Delivery Address</h1> : <h1>Take Away Address</h1> }
                                            { deliveryTakeAway && <button className="text-sm tracking-widest text-primary" onClick={() => setSelectAddressOpen(true)}>Change</button> }
                                        </div>
                                        <hr />
                                        <div>
                                            <p className="mt-2 font-bold ">
                                                { deliveryAddress ? `${deliveryAddress?.street} ${deliveryAddress?.number}, ${deliveryAddress?.location.location}` :
                                                    deliveryTakeAway ? <button className="text-sm tracking-widest text-primary" onClick={() => setSelectAddressOpen(true)}>Select a delivery address</button> : `Take in 'Coronel Rodriguez 273, Mendoza'` }
                                            </p>
                                            { deliveryTakeAway && <div className="w-full mt-5 form-control">
                                                <label className="label">
                                                    <span className="label-text">Delivery Instructions (Optional)</span>
                                                </label>
                                                <input type="text" className="w-full rounded-full input" />
                                            </div> }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PRODUCTS SUMMARY */}
                            <div className="flex justify-center">
                                <div className="bg-white h-64 w-[80%] rounded-3xl p-4 grid grid-rows-[1fr_50px]">
                                    <div>
                                        <div className="flex justify-between my-3">
                                            <h1>Order</h1>
                                            <div className='flex flex-row items-center gap-2'>
                                                <button className='order-2 text-xs font-bold cursor-pointer btn-sm btn btn-primary' onClick={handleOpenEditCartModal}>edit</button>
                                                <p>{(cart[0].quantity != 0) ? cart.length : 0} products</p>
                                            </div>
                                        </div>
                                        <div className="h-32 mt-6 mb-1 overflow-y-auto scrollbar">
                                            {(cart[0].quantity != 0) ? (cart.map((item: MCart) => {
                                                return <div key={item.product.id} className='flex items-center'>
                                                    <img className='h-4 mr-4' src={pizzaSvg} alt="category icon" />
                                                    <p className="my-1">{item.quantity}x {item.product.name} ${item.product.price * item.quantity}</p>
                                                </div>
                                            })) : ''}
                                        </div>
                                    </div>
                                    <div>
                                        <hr />
                                        {(cart[0].quantity != 0) && <div className="flex justify-between my-3">
                                            { deliveryTakeAway ? <p>Estimated Delivery Time:</p> : <p>Estimated Cooking Time</p> }
                                            <p>{ deliveryTakeAway ? (estimatedTime.product.cookingTime + 10) : estimatedTime.product.cookingTime} minutes</p>
                                        </div>}
                                    </div>

                                </div>
                            </div>

                            {/* PAYMENT METHOD */}
                            <div className="flex justify-center">
                                <div className="bg-white h-64 w-[80%] rounded-3xl grid grid-rows-[50px_1fr] p-4">
                                    <div>
                                        <h1 className='mb-3'>Payment Methods</h1>
                                        <hr />
                                    </div>
                                    <div>
                                        <h1>Available Methods: </h1>
                                        <div className='flex flex-col items-center justify-between join'>
                                            <input className="w-full rounded-none join-item btn" type="radio" name="payment" aria-label="Mercado Pago" checked={mp ? true : false} onClick={() => setMp(true)} />
                                            <input className={deliveryTakeAway ? "w-full my-4 rounded-none join-item btn btn-disabled" : "w-full my-4 rounded-none join-item btn"} type="radio" name="payment" aria-label="Cash" onClick={() => setMp(false)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        { /* SUMMARY */}
                        <div className="flex ">
                            <div className="bg-white rounded-3xl w-80 h-80 grid grid-rows-[1fr_50px] p-1">
                                <div className="p-2">
                                    <h1 className="mb-2 tracking-widest">Summary</h1>
                                    <hr />
                                    {(cart[0].quantity != 0) && <div className="flex justify-between">
                                        <p className="my-3 text-sm">Products cost</p>
                                        <p className="my-3 text-sm">${totalPrice}</p>
                                    </div>}
                                    <div className="flex justify-between">
                                        <p className="my-3 text-sm">Service fee</p>
                                        <p className="my-3 text-sm">$100</p>
                                    </div>
                                    {deliveryTakeAway ? <div className="flex justify-between">
                                        <p className="my-3 text-sm">Shipping cost</p>
                                        <p className="my-3 text-sm">$300</p>
                                    </div> : ''}
                                    {!deliveryTakeAway && (cart[0].quantity != 0) ? <div className="flex justify-between">
                                        <p className="my-3 text-sm">Discount 10%</p>
                                        <p className="my-3 text-sm">-${(totalPrice + 100) - ((totalPrice + 100) * 0.9)}</p>
                                    </div> : ''}
                                    {(cart[0].quantity != 0) && <div className="flex justify-between">
                                        <p className="my-3 text-sm font-bold">Total</p>
                                        <p className="my-3 text-sm font-bold">${deliveryTakeAway ? (totalPrice + 100 + 300) : ((totalPrice + 100) * 0.9)}</p>
                                    </div>}
                                </div>
                                {/* TODO: Validación de dirección / toast */}
                                {mp ? <button className={(cart[0].quantity != 0) ? "rounded-full btn btn-primary" : "rounded-full btn btn-primary btn-disabled"} /*onClick={() => handleBuy}*/ onClick={() => { mp ? navigate('/order-tracking/0') : '' }}>Go to Pay</button> : <button className={(cart[0].quantity != 0) ? "rounded-full btn btn-primary" : "rounded-full btn btn-primary btn-disabled"} onClick={() => { !mp ? navigate('/order-tracking/0') : '' }}>Make the order</button>}
                                {preferenceId && <Wallet initialization={{ preferenceId }} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditCartModal
                isOpen={isEditCartModalOpen}
                onClose={handleCloseEditCartModal}
            />
            <SelectAddressModal
                isOpen={isSelectAddressOpen}
                onClose={() => setSelectAddressOpen(false)}
                onConfirm={setDeliveryAddress}
                addressSelected={deliveryAddress}
            />
        </>

    )
}

export default OrderDetail