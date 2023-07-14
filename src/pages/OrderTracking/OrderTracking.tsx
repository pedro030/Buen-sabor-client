import { useAuth0 } from '@auth0/auth0-react'
import questionSVG from '../../assets/question.svg'
import pizzaSvg from '../../assets/pizza.svg'
import iceCreamSVG from '../../assets/ice-cream.svg'
import cashSVG from '../../assets/cash.svg'
import { useContext } from 'react'
import { CartContext } from '../../context/cart'
import { PaymenthDeliveryContext } from '../../context/paymenth-delivery'


const OrderTracking = () => {
    const { user } = useAuth0();
    const { cart }: any = useContext(CartContext);
    const { deliveryTakeAway, mp }: any = useContext(PaymenthDeliveryContext);

    const totalPrice = cart.reduce((total: any, item: any) => {
        const itemPrice = item.price * item.quantity;
        return total + itemPrice;
    }, 0);

    return (
        <>
            <div className="grid grid-rows-[120px_80px_1fr] gap-5 p-10 h-[100%]">
                {/* Maps */}
                {/* <div>
                    <iframe className="w-full h-48 rounded-3xl"
                        src="https://www.google.com/maps/embed/v1/place?q=Av.%20Las%20Heras%20y%20Av.%20San%20Martin%2C%20Ciudad%20de%20Mendoza&key=AIzaSyBEq7nhkPKV-rRkGcFmEWeAtICCTWf7pxs"></iframe>
                </div> */}

                <div className='flex justify-center mb-5'>
                    <ul className="steps">
                        <li className="step step-primary">Choice Product</li>
                        <li className="step step-primary">Create Order</li>
                        <li className="step step-primary">Follow Up</li>
                        {mp ? <><li className='step step-primary'>Paid</li><li className='step step-primary'>Ordered</li><li className='step'>Delivered!</li></> : <><li className='step step-primary'>Ordered</li><li className='step'>Delivered!</li></>}
                    </ul>
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center w-full h-20 p-4 bg-white shadow rounded-3xl">
                    <h1 className="my-1 font-bold">The restaurant is preparing your order</h1>
                    <p className="text-sm">Created 7:33 PM</p>
                </div>

                <div className="grid grid-cols-[2fr_1fr] gap-5">
                    <div className="flex flex-col gap-5 place-items-center">
                        {/* BUEN SABOR */}
                        <div className="flex flex-col justify-center w-full h-24 p-4 bg-white shadow rounded-3xl">
                            <h1 className='text-2xl font-bold text-red-600'>Buen Sabor</h1>
                            <p className='text-sm tracking-widest'>CORONEL RODRIGUEZ 273, Mendoza</p>
                        </div>

                        {/* ORDER */}
                        <div className="bg-white h-64 rounded-3xl w-full p-4 grid grid-rows-[1fr_50px]">
                            <div>
                                <div className="flex justify-between my-3">
                                    <h1>Order</h1>
                                    <p>{cart.length} products</p>
                                </div>
                                <div className="h-32 mt-6 mb-1 overflow-y-auto scrollbar">
                                    {cart.map((item: any) => {
                                        return <div className='flex items-center'>
                                            <img className='h-4 mr-4' src={pizzaSvg} alt="category icon" />
                                            <p className="my-1">{item.quantity}x {item.name} ${item.price * item.quantity}</p>
                                        </div>
                                    })}

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

                        {/* PAYMENT METHOD */}
                        <div className="flex items-center justify-between w-full h-20 p-4 bg-white shadow rounded-3xl">
                            <div className='flex'>
                                <img className='h-6 mr-2' src={cashSVG} alt="category icon" />
                                <p className="text-md">Your payment methotd is: </p>
                            </div>

                            <p>{mp ? 'Mercado Pago' : 'Cash'}</p>
                        </div>

                        {/* TOTAL */}
                        <div tabIndex={0} className="w-full bg-white shadow cursor-pointer collapse rounded-3xl">
                            <div className="flex items-center justify-between p-4">
                                <h1 className='font-bold'>Total to pay:</h1>
                                <p className='font-bold'>${deliveryTakeAway ? (totalPrice + 100 + 300) : (totalPrice + 100)}</p>
                            </div>
                            <div className="collapse-content">
                                <div className="flex ">
                                    <div className="w-full p-1">
                                        <div className="p-2">
                                            <h1 className="mb-2 tracking-widest">Resume</h1>
                                            <hr />
                                            <div className="flex justify-between w-full">
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
                                            </div> : ''
                                            }
                                            <div className="flex justify-between">
                                                <p className="my-3 text-sm font-bold">Total</p>
                                                <p className="my-3 text-sm font-bold">${deliveryTakeAway ? (totalPrice + 100 + 300) : (totalPrice + 100)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="grid grid-rows-[56px_80px] gap-5">

                        {/* QUESTIONS */}
                        <div className="w-full p-4 bg-white shadow h-14 rounded-3xl">
                            <div className='flex '>
                                <img className='h-6 mr-4' src={questionSVG} alt="category icon" />
                                <p>Have any questions?</p>
                            </div>
                        </div>

                        {/* DELIVERY */}
                        <div className="flex flex-row w-full h-20 p-4 bg-white shadow rounded-3xl">
                            <div className="mr-4 avatar">
                                <div className="w-12 rounded-full">
                                    <img src={user?.picture} />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-bold'>Leonardo David</p>
                                <p className='text-sm'>Your delivery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderTracking