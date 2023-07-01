import { useAuth0 } from '@auth0/auth0-react'
import questionSVG from '../../assets/question.svg'
import pizzaSvg from '../../assets/pizza.svg'
import iceCreamSVG from '../../assets/ice-cream.svg'
import cashSVG from '../../assets/cash.svg'


const OrderTracking = () => {
    const { user } = useAuth0()

    return (
        <div className="grid grid-rows-[192px_80px_1fr] gap-5 p-10">
            {/* Maps */}
            <div>
                <iframe className="w-full h-48 rounded-3xl"
                    src="https://www.google.com/maps/embed/v1/place?q=Av.%20Las%20Heras%20y%20Av.%20San%20Martin%2C%20Ciudad%20de%20Mendoza&key=AIzaSyBEq7nhkPKV-rRkGcFmEWeAtICCTWf7pxs"></iframe>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center w-full h-20 p-4 bg-white shadow rounded-3xl">
                <h1 className="my-1 font-bold">The restaurant is preparing your order</h1>
                <p className="text-sm">Created 7:33 PM</p>
            </div>

            <div className="grid grid-cols-[2fr_1fr] gap-5">
                <div className="grid grid-rows-[96px_256px_80px_80px] gap-5 place-items-center">
                    {/* BUEN SABOR */}
                    <div className="flex flex-col justify-center w-full h-24 p-4 bg-white shadow rounded-3xl">
                        <h1 className='text-2xl font-bold text-red-600'>Buen Sabor</h1>
                        <p className='text-sm tracking-widest'>CORONEL RODRIGUEZ 273, Mendoza</p>
                    </div>

                    {/* ORDER */}
                    <div className="bg-white h-64 w-full rounded-3xl p-4 grid grid-rows-[1fr_50px]">
                        <div>
                            <div className="flex justify-between my-3">
                                <h1>Order</h1>
                                <p>2 products</p>
                            </div>
                            <div className="mt-6">
                                <div className='flex items-center'>
                                    <img className='h-4 mr-4' src={pizzaSvg} alt="category icon" />
                                    <p className="my-1">1x pizza muzzarella $1.700,00</p>
                                </div>
                                <div className='flex items-center'>
                                    <img className='h-4 mr-5' src={iceCreamSVG} alt="category icon" />
                                    <p className="my-1">1x 1kg Ice cream $2.990,00</p>
                                </div>
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

                        <p>Cash</p>
                    </div>

                    {/* TOTAL */}
                    <div tabIndex={0} className="w-full bg-white shadow collapse rounded-3xl">
                        <div className="flex items-center justify-between p-4">
                            <h1 className='font-bold'>Total to pay:</h1>
                            <p className='font-bold'>$808,00</p>
                        </div>
                        <div className="collapse-content">
                            <div className="flex ">
                                <div className="w-full p-1">
                                    <div className="p-2">
                                        <h1 className="mb-2 tracking-widest">Resume</h1>
                                        <hr />
                                        <div className="flex justify-between w-full">
                                            <p className="my-3 text-sm">Products cost</p>
                                            <p className="my-3 text-sm">$1400</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="my-3 text-sm">Service fee</p>
                                            <p className="my-3 text-sm">$1400</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="my-3 text-sm">Shipping cost</p>
                                            <p className="my-3 text-sm">$1400</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="my-3 text-sm font-bold">Total</p>
                                            <p className="my-3 text-sm font-bold">$1400</p>
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
    )
}

export default OrderTracking