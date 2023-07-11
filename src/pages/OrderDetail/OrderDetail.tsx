import pizzaSvg from '../../assets/pizza.svg'
import iceCreamSVG from '../../assets/ice-cream.svg'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/cart'

const OrderDetail = () => {
    const { cart }: any = useContext(CartContext);
    const [deliveryTakeAway, setDeliveryTakeAway] = useState(true);
    const [mp, setMp] = useState(true);

    const totalPrice = cart.reduce((total: any, item: any) => {
        const itemPrice = item.price * item.quantity;
        return total + itemPrice;
    }, 0);

    return (
        <>
            <h1 className="flex justify-center my-6 text-3xl font-bold text-red-600">Buen Sabor</h1>
            <div className='flex justify-center mb-5'>
                <ul className="steps">
                    <li className="step step-primary">Choice product</li>
                    <li className="step step-primary">Create Order</li>
                    <li className="step step-primary">Follow up</li>
                    { mp ? <><li className='step'>Pay</li><li className='step'>Delivered!</li></> : <li className="step">Delivered!</li> }
                </ul>
            </div>
            <div className='flex justify-center'>
                <div className="grid grid-cols-[1000px_400px] ">
                    <div className="grid grid-rows-3 gap-7 ">

                        {/* DELIVERY */}
                        <div className="flex justify-center">
                            <div className={deliveryTakeAway ? "grid grid-rows-[50px_1fr] bg-white h-64 w-[80%] rounded-3xl" : "grid grid-rows-[50px_1fr] bg-white h-32 w-[80%] rounded-3xl"}>
                                <div className="grid grid-cols-2 join">
                                    <input className="rounded-full join-item btn" type="radio" name="delivery" aria-label="Delivery" onClick={() => {setDeliveryTakeAway(true); setMp(true)}} checked={deliveryTakeAway ? true : false}/>
                                    <input className="rounded-full join-item btn" type="radio" name="delivery" aria-label="Take Away" onClick={() => setDeliveryTakeAway(false)} checked={!deliveryTakeAway ? true : false}/>
                                </div>
                                {deliveryTakeAway ?
                                    <div className="p-4">
                                        <div className="flex justify-between py-2">
                                            <h1>Delivery address</h1>
                                            <p className="text-sm tracking-widest text-primary">Change</p>
                                        </div>
                                        <hr />
                                        <div>
                                            <p className="mt-2 font-bold ">Coronel Rodriguez 273, Mendoza</p>
                                            <div className="w-full mt-5 form-control">
                                                <label className="label">
                                                    <span className="label-text">Delivery instruction (optional)</span>
                                                </label>
                                                <input type="text" className="w-full rounded-full input" />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex items-center p-4">
                                            <p className="">Take in 'Coronel Rodriguez 273, Mendoza'</p>
                                    </div>
                                }

                            </div>
                        </div>

                        {/* PRODUCTS */}
                        <div className="flex justify-center">
                            <div className="bg-white h-64 w-[80%] rounded-3xl p-4 grid grid-rows-[1fr_50px]">
                                <div>
                                    <div className="flex justify-between my-3">
                                        <h1>Order</h1>
                                        <p>{cart.length} products</p>
                                    </div>
                                    <div className="h-32 mt-6 overflow-y-auto">
                                        {cart.map((item: any) => {
                                            return <div className='flex items-center'>
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
                                        <input className="w-full rounded-none join-item btn" type="radio" name="payment" aria-label="Mercado Pago" checked={mp ? true : false} onClick={() => setMp(true)}/>
                                        <input className={deliveryTakeAway ? "w-full my-4 rounded-none join-item btn btn-disabled" : "w-full my-4 rounded-none join-item btn"} type="radio" name="payment" aria-label="Cash" onClick={() => setMp(false)}/>
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
                                <div className="flex justify-between">
                                    <p className="my-3 text-sm">Shipping cost</p>
                                    <p className="my-3 text-sm">$300</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="my-3 text-sm font-bold">Total</p>
                                    <p className="my-3 text-sm font-bold">${(totalPrice + 100 + 300)}</p>
                                </div>
                            </div>
                            { mp ? <button className="rounded-full btn btn-primary">Go to Pay</button> : <button className="rounded-full btn btn-primary">Make the order</button>}
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderDetail