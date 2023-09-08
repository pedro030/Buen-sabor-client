import { useAuth0 } from '@auth0/auth0-react'
import questionSVG from '../../assets/question.svg'
import pizzaSvg from '../../assets/pizza.svg'
import iceCreamSVG from '../../assets/ice-cream.svg'
import cashSVG from '../../assets/cash.svg'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/cart'
import { PaymenthDeliveryContext } from '../../context/paymenth-delivery'
import { useParams } from 'react-router-dom'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import { UserContext } from '../../context/user'


const OrderTracking = () => {
    const { user } = useAuth0();
    const { cart, clearCart }: any = useContext(CartContext);
    const { deliveryTakeAway, mp, deliveryAddress }: any = useContext(PaymenthDeliveryContext);
    const { id } : any = useParams();
    const [order, setOrder] = useState([{
        id: 0,
        date: '', 
        withdrawalMode: '', 
        totalPrice: 0,
        address: '',
        paymode: { id: 0, paymode: '' },
        products: [{ product: { name: '', price: 0}}],
        statusOrder: { statusType: 'Unknown'}
    }]);

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const day = yyyy + '-' + mm + '-' + dd;

    const { userInfo, orders, setOrders }: any = useContext(UserContext)
    const [stompClient, setStompClient] = useState<any>(over(new SockJS('https://buen-sabor-backend-production.up.railway.app/ws')))

    const conn = (idOrder: number) => {
        stompClient.connect({}, () => onConnected(idOrder), onError)
    }

    const onConnected = async (idOrder: number) => {
    
        if (stompClient && stompClient.connected) {
          try {
            await stompClient.subscribe(`/user/${userInfo.mail}/private`, (payload: {body: string}) => onMessageReceived(payload, idOrder))
            await stompClient.send(`/app/private-message`, {}, JSON.stringify(userInfo.id))
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log("WS is not connected")
        }
    
    }

    const onMessageReceived = (payload: { body: string; }, idOrder: number) => {
        const payloadData: any = JSON.parse(payload.body);
       
        const ord = payloadData.find((o: any) => o.id === idOrder)

        const updatedOrders = orders.map((o: any) => {
            if(o.id === idOrder) return { ...o, statusOrder: ord.statusOrder };

            return o;
        });
        
        setOrders(updatedOrders);
        setOrder([ord]);
    }
    
    const onError = (err: any) => {
        console.log(err);
    }

    useEffect(() => {
        if(id == '0') {
            let totalPay : number = 0;

            totalPay = cart.reduce((total: any, item: any) => {
                const itemPrice = item.price * item.quantity;
                return total + itemPrice;
            }, 0);

            if(deliveryTakeAway) totalPay += (100 + 300)
            else totalPay += 100

            const addrs = deliveryAddress.street + " " + deliveryAddress.number + ", " + deliveryAddress.location.location;

            const newOrder = {
                date: day,
                withdrawalMode: deliveryTakeAway ? 'Delivery' : 'Take Away',
                totalPrice: totalPay,
                paymode: {
                    id: mp ? 2 : 1,
                    paymode: mp ? "MercadoPago" : "Cash"
                },
                address: addrs,
                user: deliveryAddress.user,
                statusOrder: {
                    id: 1,
                    statusType: 'In_Queue'
                },
                products: cart.map((item: any) => ({
                    product: item,
                    cant: item.quantity
                }))
            };

            newOrder.products.map((p: any) => {
                delete p.product.quantity
            })

            fetch("https://buen-sabor-backend-production.up.railway.app/api/orders/save", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOrder)
            })
            .then( response => {
                if( !response.ok ) throw new Error("POST ERROR");
                return response.json();
            })
            .then( data => {
                setOrders((prevState: any) => [...prevState, data]);
                setOrder([data]);
                conn(data.id)
            })
            .catch( e => console.log("Error:", e))

            clearCart();
        } else {
            const ord = orders.filter((o: any) => o.id === +id);
            setOrder(ord);
            conn(+id);
        }

        return () => {
            stompClient?.disconnect();
        };
    }, []);

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
                    <h1 className="my-1 font-bold">State of your Order: { order.length > 0 ? order[0].statusOrder.statusType : "Loading..." }</h1>
                    <p className="text-sm">Created 7:33 PM</p>
                </div>

                <div className="grid grid-cols-[2fr_1fr] gap-5">
                    <div className="flex flex-col gap-5 place-items-center">
                        {/* BUEN SABOR */}
                        <div className="flex flex-col justify-center w-full h-24 p-4 bg-white shadow rounded-3xl">
                            <h1 className='text-2xl font-bold text-red-600'>Buen Sabor</h1>
                            <p className='text-sm tracking-widest'>{order[0].address}</p>
                        </div>

                        {/* ORDER */}
                        <div className="bg-white h-64 rounded-3xl w-full p-4 grid grid-rows-[1fr_50px]">
                            <div>
                                <div className="flex justify-between my-3">
                                    <h1>Order</h1>
                                    <p>{/*order.products.length*/} products</p>
                                </div>
                                <div className="h-32 mt-6 mb-1 overflow-y-auto scrollbar">
                                    {order[0].products.map((item: any, index:number) => {
                                        return <div key={index} className='flex items-center'>
                                            <img className='h-4 mr-4' src={pizzaSvg} alt="category icon" />
                                            <p className="my-1">{item.cant}x {item.product.name} ${item.product.price * item.cant}</p>
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

                            <p>{order[0].paymode.paymode}</p>
                        </div>

                        {/* TOTAL */}
                        <div tabIndex={0} className="w-full bg-white shadow cursor-pointer collapse rounded-3xl">
                            <div className="flex items-center justify-between p-4">
                                <h1 className='font-bold'>Total to pay:</h1>
                                <p className='font-bold'>${order[0].totalPrice}</p>
                            </div>
                            <div className="collapse-content">
                                <div className="flex ">
                                    <div className="w-full p-1">
                                        <div className="p-2">
                                            <h1 className="mb-2 tracking-widest">Resume</h1>
                                            <hr />
                                            <div className="flex justify-between w-full">
                                                <p className="my-3 text-sm">Products cost</p>
                                                <p className="my-3 text-sm">${order[0].withdrawalMode == 'Delivery' ? order[0].totalPrice - 400 : order[0].totalPrice - 100}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="my-3 text-sm">Service fee</p>
                                                <p className="my-3 text-sm">$100</p>
                                            </div>
                                            {order[0].withdrawalMode == 'Delivery' ? <div className="flex justify-between">
                                                <p className="my-3 text-sm">Shipping cost</p>
                                                <p className="my-3 text-sm">$300</p>
                                            </div> : ''
                                            }
                                            <div className="flex justify-between">
                                                <p className="my-3 text-sm font-bold">Total</p>
                                                <p className="my-3 text-sm font-bold">${order[0].totalPrice}</p>
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