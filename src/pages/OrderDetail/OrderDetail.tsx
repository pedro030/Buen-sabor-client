import pizzaSvg from '../../assets/pizza.svg'
import iceCreamSVG from '../../assets/ice-cream.svg'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/cart'
import { useNavigate } from 'react-router-dom'
import { PaymenthDeliveryContext } from '../../context/paymenth-delivery'
import EditCartModal from '../../components/menu/EditCartModal/EditCartModal'
import SelectAddressModal from './Components/SelectAddressModal'
import { MAddress } from '../../models/MAddress'




const OrderDetail = () => {
    const { cart }: any = useContext(CartContext);
    const { deliveryTakeAway, setDeliveryTakeAway, mp, setMp, deliveryAddress, setDeliveryAddress }: any = useContext(PaymenthDeliveryContext);
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total: any, item: any) => {
        const itemPrice = item.price * item.quantity;
        return total + itemPrice;
    }, 0);

    const [isSelectAddressOpen, setSelectAddressOpen] = useState(false);

    const [isEditCartModalOpen, setIsEditCartModalOpen] = useState(false);

    const handleOpenProductModal = () => {
        setIsEditCartModalOpen(true);
    };

    const handleCloseProductModal = () => {
        setIsEditCartModalOpen(false);
    };

    const handleConfirmDelete = () => {

    };


    

    return (
        <>
            <div className='mb-5'>
                <h1 className="flex justify-center my-6 text-3xl font-bold text-red-600">Buen Sabor</h1>
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
                                    <div className="grid grid-cols-2 join">
                                        <input className="rounded-full join-item btn" type="radio" name="delivery" aria-label="Delivery" onClick={() => { setDeliveryTakeAway(true); setMp(true) }} defaultChecked={deliveryTakeAway ? true : false} />
                                        <input className="rounded-full join-item btn" type="radio" name="delivery" aria-label="Take Away" onClick={() => setDeliveryTakeAway(false)} defaultChecked={!deliveryTakeAway ? true : false} />
                                    </div>

                                    <div className="p-4">
                                        <div className="flex justify-between py-2">
                                            <h1>Delivery address</h1>
                                            {deliveryTakeAway && <button className="text-sm tracking-widest text-primary" onClick={() => setSelectAddressOpen(true)}>Change</button>}
                                        </div>
                                        <hr />
                                        <div>
                                            <p className="mt-2 font-bold ">
                                                {deliveryAddress ? `${deliveryAddress?.street} ${deliveryAddress?.number}, ${deliveryAddress?.location.location}` :
                                                    <button className="text-sm tracking-widest text-primary" onClick={() => setSelectAddressOpen(true)}>{deliveryTakeAway ? 'Select a delivery address' : "Take in 'Coronel Rodriguez 273, Mendoza'"}</button>}</p>
                                            <div className="w-full mt-5 form-control">
                                                <label className="label">
                                                    <span className="label-text">Delivery instruction (optional)</span>
                                                </label>
                                                <input type="text" className="w-full rounded-full input" />
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            {/* PRODUCTS */}
                            <div className="flex justify-center">
                                <div className="bg-white h-64 w-[80%] rounded-3xl p-4 grid grid-rows-[1fr_50px]">
                                    <div>
                                        <div className="flex justify-between my-3">
                                            <h1>Order</h1>
                                            <div className='flex flex-row items-center gap-2'>
                                                <a className='order-2 text-xs font-bold cursor-pointer btn-sm btn btn-primary' onClick={() => handleOpenProductModal()}>edit</a>
                                                <p>{cart.length} products</p>
                                            </div>
                                        </div>
                                        <div className="h-32 mt-6 mb-1 overflow-y-auto scrollbar">
                                            {cart.map((item: any) => {
                                                return <div key={item.id} className='flex items-center'>
                                                    <img className='h-4 mr-4' src={pizzaSvg} alt="category icon" />
                                                    <p className="my-1">{item.quantity}x {item.name} ${item.price * item.quantity}</p>
                                                </div>
                                            })}
                                            {/*<div className='flex items-center'>
                                            <img className='h-4 mr-4' src={pizzaSvg} alt="category icon" />
                                            <p className="my-1">1x pizza muzzarella $1.700,00</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <img className='h-4 mr-5' src={iceCreamSVG} alt="category icon" />
                                            <p className="my-1">1x 1kg Ice cream $2.990,00</p>
                                    </div> */}
                                        </div>
                                    </div>
                                    <div>
                                        <hr />
                                        <div className="flex justify-between my-3">
                                            <p>Estimated Delivery:</p>
                                            <p> 26 - 41 min</p>
                                        </div>
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
                                            <input className="w-full rounded-none join-item btn" type="radio" name="payment" aria-label="Mercado Pago" defaultChecked={mp ? true : false} onClick={() => setMp(true)} />
                                            <input className={deliveryTakeAway ? "w-full my-4 rounded-none join-item btn btn-disabled" : "w-full my-4 rounded-none join-item btn"} type="radio" name="payment" aria-label="Cash" onClick={() => setMp(false)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex ">
                            <div className="bg-white rounded-3xl w-80 h-80 grid grid-rows-[1fr_50px] p-1">
                                <div className="p-2">
                                    <h1 className="mb-2 tracking-widest">Summary</h1>
                                    <hr />
                                    <div className="flex justify-between">
                                        <p className="my-3 text-sm">Products cost</p>
                                        <p className="my-3 text-sm">${totalPrice}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="my-3 text-sm">Service fee</p>
                                        <p className="my-3 text-sm">$100</p>
                                    </div>
                                    {deliveryTakeAway ? <div className="flex justify-between">
                                        <p className="my-3 text-sm">Shipping cost</p>
                                        <p className="my-3 text-sm">$300</p>
                                    </div> : ''}
                                    <div className="flex justify-between">
                                        <p className="my-3 text-sm font-bold">Total</p>
                                        <p className="my-3 text-sm font-bold">${deliveryTakeAway ? (totalPrice + 100 + 300) : (totalPrice + 100)}</p>
                                    </div>
                                </div>
                                {mp ? <button className="rounded-full btn btn-primary" onClick={() => { mp ? navigate('/order-tracking/0') : '' }}>Go to Pay</button> : <button className="rounded-full btn btn-primary" onClick={() => { !mp ? navigate('/order-tracking/0') : '' }}>Make the order</button>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditCartModal
                isOpen={isEditCartModalOpen}
                onClose={handleCloseProductModal}
                onConfirm={handleConfirmDelete}
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