// React
import { useContext, useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

// React Router
import { NavigateFunction, useNavigate } from 'react-router-dom'

// Mercado Pago
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

// Contexts
import { CartContext } from '../../context/cart'
import { UserContext } from '../../context/user'

// Utils
import { checkOpeningHours } from '../../utils/utils'

// Components
import EditCartModal from '../../components/menu/EditCartModal/EditCartModal'
import SelectAddressModal from './Components/SelectAddressModal'

// Types
import { ICartContext, MCart } from '../../models/ICartContext'
import { IUserContext } from '../../models/IUserContext'
import { MAddress } from '../../models/MAddress'
import { MOrder } from '../../models/MOrder'

// Sweet Alert
import Swal from 'sweetalert2'

const OrderDetail = () => {
    // Api URL
    const urlApi = import.meta.env.VITE_REACT_APP_API_URL

    // Cart Context
    const { cart, clearCart }: ICartContext = useContext(CartContext);

    // User Context
    const { tokenUser, setOrders, userInfo }: IUserContext = useContext(UserContext);

    // State: Order ID para Mercado Pago
    const [value, setValue] = useState<number>(0);

    // States: Delivery - Take Away / Cash - MP / Address
    const [isDelivery, setIsDelivery] = useState<boolean>(true);
    const [isMP, setIsMP] = useState<boolean>(true);
    const [deliveryAddress, setDeliveryAddress] = useState<MAddress | undefined>(undefined);

    // Navigation
    const navigate: NavigateFunction = useNavigate();

    // Select Address Modal State
    const [isSelectAddressOpen, setSelectAddressOpen] = useState<boolean>(false);

    // Edit Cart Modal State
    const [isEditCartModalOpen, setIsEditCartModalOpen] = useState<boolean>(false);

    // Mercado Pago
    initMercadoPago('TEST-ccef55f6-eb14-4d67-8380-2d8ca6889032');
    const currentURL = window.location.href;
    const urlParams = new URLSearchParams(window.location.search)
    const status = urlParams.get('status');
    const external_reference = urlParams.get('external_reference');

    // Calcula el total del carrito
    const totalCartPrice = cart.reduce((total: number, item: MCart) => {
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

    // Sweet Alert. User Enabled o en Blacklist
    const enabledUser = () => {
        Swal.fire({
            icon: 'error',
            title: "This user is not enabled to place orders",
            text: "For more information contact the administrator",
            confirmButtonColor: '#E73636',
            allowEscapeKey: false,
            allowOutsideClick: false,
        })
            .then((result) => {
                if(result.isConfirmed) {
                    navigate('/');
                }
            })
    }

    // Sweet Alert. Si se confirma el pago en efectivo se crea la orden.
    const confirmCashPaymenth = async () => {
        if (userInfo.blacklist != "Enabled") return enabledUser();
        if(!checkOpeningHours()) return;
        const stock = await validateStock();
        stock && Swal.fire({
            title: "Did you pay the order to the Casher?",
            text: "If you check yes and have not paid, your order will be canceled anyway",
            icon: "warning",
            confirmButtonText: 'Yes, I Did',
            cancelButtonText: 'Not Yet',
            allowEscapeKey: false,
            allowOutsideClick: false,
            confirmButtonColor: '#E73636',
            showCancelButton: true,
            reverseButtons: true
        })
            .then((result) => {
                if(result.isConfirmed) {
                    Swal.fire({
                        title: 'Loading...',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        showCancelButton: false,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                    });
                    createOrder();
                }
            })
    }

    // Sweet Alert. Aparece cuando se entrega por Delivery y no hay direccion seleccionada.
    const selectAnAddress = () => {
        Swal.fire({
            icon: "warning",
            title: "Select an Address",
            confirmButtonColor: '#E73636',
        })
    }

    // Sweet Alert. Cuando el carrito no cumple con el stock.
    const cartOutOfStock = () => {
        Swal.fire({
            icon: "error",
            title: "We're sorry",
            text: "One or more products in your cart are no longer available in stock. Please modify your cart and try again",
            confirmButtonColor: '#E73636',
            allowEscapeKey: false,
            allowOutsideClick: false,
        })
            .then((result) => {
                if(result.isConfirmed) {
                    navigate('/');
                }
            })
    }

    // Sweet Alert. Order creada y redireccion a OrderTracking.
    const orderCreated = (id: number) => {
        Swal.fire({
            icon: "success",
            title: "Your order was created",
            text: "See ya in a few minutes!",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 3000
        })
            .then(() => {
                clearCart();
                navigate(`/order-tracking/${id}`);
            })
    }

    // Create Order
    const createOrder = async () => {
        const totalToPay: number = isDelivery ? (totalCartPrice + 100 + 300) : ((totalCartPrice + 100) * 0.9)
        const addrs: string = isDelivery ? `${deliveryAddress?.street} ${deliveryAddress?.number}, ${deliveryAddress?.location.location}` : 'Coronel Rodriguez 273, Mendoza';

        const newOrder = {
            withdrawalMode: isDelivery ? 'Delivery' : 'Take Away',
            totalPrice: totalToPay,
            paymode: {
                id: isMP ? 2 : 1,
                paymode: isMP ? "MercadoPago" : "Cash"
            },
            address: addrs,
            user: userInfo,
            statusOrder: {
                id: 1,
                statusType: 'In_Queue'
            },
            products: cart.map((item: MCart) => ({
                product: item.product,
                cant: item.quantity
            }))
        };

        fetch(`${urlApi}/orders/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenUser}`
            },
            body: JSON.stringify(newOrder)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
            .then(async (data: (MOrder)) => {
                updateOrders(data);
                if (data.paymode.paymode === "Cash") orderCreated(data.id)
                else setValue(data.id)
            })
            .catch((error) => { Swal.fire({ title: 'There was an error', icon: 'error', confirmButtonColor: '#E73636' }); throw new Error(error) })
    }

    // Cuando se crea una orden, se setea la misma junto con las demás ordenes del cliente.
    const updateOrders = (data: MOrder) => {
        try {
            setOrders((prevState: MOrder[]) => [...prevState, data])
        } catch (error) {
            console.error(error)
        }
    }

    // Pago con Mercado Pago
    const PayWithMP = async () => {
        if (userInfo.blacklist != "Enabled") return enabledUser();
        // Primero valida si hay stock.
        const stock = await validateStock();

        // Si hay stock se crea la orden para obtener el 'id' para crear la preferencia.
        if (stock) {
            await createOrder()
            // Se crea la preferencia.
            await fetch(`${urlApi}/mp/create-preference/${value}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${(tokenUser).trim()}`
                }
            })
                .then(res => res.json())
                .then(data => { window.location.href = (data.initPoint) })
                .catch(err => { Swal.fire({ title: 'There was an error', icon: 'error', confirmButtonColor: '#E73636' }) })
        }
    }

    if (status == 'null') {
        fetch(`${urlApi}/orders/delete/${external_reference}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenUser}`
            }
        })
    }

    // Valida si el carrito tiene stock para cubrir todo el pedido
    const validateStock = async () => {
        const verifyCart = cart.map((item: MCart) => {
            return {
                product: { id: item.product.id },
                cant: item.quantity
            }
        })

        try {
            const response = await fetch(`${urlApi}/products/validarStock`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenUser.trim()}`
                },
                body: JSON.stringify(verifyCart),
            });

            if (response.ok) {
                const data = await response.json();

                if (!data) {
                    cartOutOfStock();
                    return false;
                } else return true

            } else throw new Error('Validation Error: ')

        } catch (e) {
            console.log(e)
            return false;
        }
    }

    // Si el user no está logueado se redirecciona al Home
    useEffect(() => {
        if(userInfo.id != 0) {
            validateStock();
        } else navigate('/');
    }, [])

    return (
        <>
            { /* HEADER */}
            <header className='flex items-center justify-between h-16 border flex-rows'>
                <a className='flex flex-row items-center gap-2 pl-5 cursor-pointer' onClick={() => navigate('/')}><BiArrowBack /> Back </a>
                <a className="text-xl normal-case cursor-pointer"><h1 className=' font-bold text-red-600 min-w-[28px] ml-10 max-lg:mx-1' onClick={() => navigate('/')}>Buen Sabor</h1></a>
                <div></div>
            </header>

            { /* STEPS */}
            <div className='m-5 '>
                <div className='flex justify-center mb-5 '>
                    <ul className="z-0 overflow-hidden steps">
                        <li className="step step-primary max-md:text-sm">Choice Product</li>
                        <li className="step step-primary max-md:text-sm ">Create Order</li>
                        <li className="step step-primary max-md:text-sm ">Follow Up</li>
                        {isMP ? <><li className='step max-md:text-sm'>Pay</li><li className='step max-md:text-sm'>Ordered</li><li className='step max-md:text-sm'>Delivered!</li></> : <><li className='step max-md:text-sm'>Ordered</li><li className='step max-md:text-sm'>Delivered!</li></>}
                    </ul>
                </div>

                <div className='flex justify-center'>
                    <div className="grid lg:grid-cols-[3fr_1fr] max-lg:grid-rows-[1fr_20rem]  max-lg:gap-7 w-full ">
                        <div className="grid grid-rows-3 gap-7 ">

                            {/* DELIVERY */}
                            <div className="flex justify-center ">
                                <div className="bg-white h-64 w-[80%] max-sm:w-full rounded-3xl">
                                    { /* SELECT DELIVERY / TAKE AWAY */}
                                    <div className="grid grid-cols-2 join">
                                        <input className="rounded-full join-item btn" type="radio" name="delivery" aria-label="Delivery" onClick={() => { setIsDelivery(true); setIsMP(true) }} defaultChecked={isDelivery ? true : false} />
                                        <input className="rounded-full join-item btn" type="radio" name="delivery" aria-label="Take Away" onClick={() => setIsDelivery(false)} defaultChecked={!isDelivery ? true : false} />
                                    </div>

                                    { /* SELECT ADDRESS */}
                                    <div className="p-4">
                                        <div className="flex justify-between py-2">
                                            {isDelivery ? <h1>Delivery Address</h1> : <h1>Take Away Address</h1>}
                                            {isDelivery && <button className="text-sm tracking-widest text-primary" onClick={() => setSelectAddressOpen(true)}>Change</button>}
                                        </div>
                                        <hr />
                                        <div>
                                            <p className="mt-2 font-bold ">
                                                {deliveryAddress ? `${deliveryAddress?.street} ${deliveryAddress?.number}, ${deliveryAddress?.location.location}` :
                                                    isDelivery ? <button className="text-sm tracking-widest text-primary" onClick={() => setSelectAddressOpen(true)}>Select a delivery address</button> : `Take in 'Coronel Rodriguez 273, Mendoza'`}
                                            </p>
                                            {isDelivery && <div className="w-full mt-5 form-control">
                                                <label className="label">
                                                    <span className="label-text">Delivery Instructions (Optional)</span>
                                                </label>
                                                <input type="text" className="w-full rounded-full input" />
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PRODUCTS SUMMARY */}
                            <div className="flex justify-center ">
                                <div className="bg-white h-64 w-[80%] max-sm:w-full rounded-3xl p-4 grid grid-rows-[1fr_50px]">
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
                                                return <div key={item.product.id} className='flex items-center '>
                                                    {/* <img className='h-4 mr-4' src={pizzaSvg} alt="category icon" /> */}
                                                    <p className="my-1 max-md:text-sm">{item.quantity}x {item.product.name} ${item.product.price * item.quantity}</p>
                                                </div>
                                            })) : ''}
                                        </div>
                                    </div>
                                    <div>
                                        <hr />
                                        {(cart[0].quantity != 0) && <div className="flex justify-between mt-2">
                                            {isDelivery ? <p>Estimated Delivery Time:</p> : <p>Estimated Cooking Time:</p>}
                                            <p>{isDelivery ? (estimatedTime.product.cookingTime + 10) : estimatedTime.product.cookingTime} minutes</p>
                                        </div>}
                                    </div>

                                </div>
                            </div>

                            {/* PAYMENT METHOD */}
                            <div className="flex justify-center">
                                <div className="bg-white h-64 w-[80%] max-sm:w-full rounded-3xl grid grid-rows-[50px_1fr] p-4">
                                    <div>
                                        <h1 className='mb-3'>Payment Methods</h1>
                                        <hr />
                                    </div>
                                    <div >
                                        <h1 className='mb-5'>Available Methods: </h1>
                                        <div className='flex flex-col join'>
                                            <input className="w-full rounded-none join-item btn" type="radio" name="payment" aria-label="Mercado Pago" checked={isMP ? true : false} onClick={() => setIsMP(true)} />
                                            <input className={isDelivery ? "w-full my-4 rounded-none join-item btn btn-disabled" : "w-full my-4 rounded-none join-item btn"} type="radio" name="payment" aria-label="Cash" onClick={() => setIsMP(false)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-center'>
                            { /* SUMMARY */}
                            <div className="bg-white rounded-3xl w-80 h-80 max-lg:w-[80%] max-sm:w-full  grid grid-rows-[1fr_50px] p-1">
                                <div className="p-2">
                                    <h1 className="mb-2 tracking-widest">Summary</h1>
                                    <hr />
                                    {(cart[0].quantity != 0) && <div className="flex justify-between">
                                        <p className="my-3 text-sm">Products cost</p>
                                        <p className="my-3 text-sm">${totalCartPrice}</p>
                                    </div>}
                                    <div className="flex justify-between">
                                        <p className="my-3 text-sm">Service fee</p>
                                        <p className="my-3 text-sm">$100</p>
                                    </div>
                                    {isDelivery ? <div className="flex justify-between">
                                        <p className="my-3 text-sm">Shipping cost</p>
                                        <p className="my-3 text-sm">$300</p>
                                    </div> : ''}
                                    {!isDelivery && (cart[0].quantity != 0) ? <div className="flex justify-between">
                                        <p className="my-3 text-sm">Discount 10%</p>
                                        <p className="my-3 text-sm">-${(totalCartPrice + 100) - ((totalCartPrice + 100) * 0.9)}</p>
                                    </div> : ''}
                                    {(cart[0].quantity != 0) && <div className="flex justify-between">
                                        <p className="my-3 text-sm font-bold">Total</p>
                                        <p className="my-3 text-sm font-bold">${isDelivery ? (totalCartPrice + 100 + 300) : ((totalCartPrice + 100) * 0.9)}</p>
                                    </div>}
                                </div>
                                {isMP ? <button className={(cart[0].quantity != 0) ? "rounded-full btn btn-primary" : "rounded-full btn btn-primary btn-disabled"} onClick={() => { isDelivery && !deliveryAddress ? selectAnAddress() : PayWithMP() }}>Go to Pay</button> : <button className={(cart[0].quantity != 0) ? "rounded-full btn btn-primary" : "rounded-full btn btn-primary btn-disabled"} onClick={confirmCashPaymenth}>Pay to Cahser</button>}
                                {/* <Wallet
                                    onSubmit={onSubmit}
                                    onReady={onReady}
                                    onError={onError}
                                /> */}
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