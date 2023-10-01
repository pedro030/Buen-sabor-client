// React
import { useContext, useEffect, useRef, FC, MouseEvent } from "react"
import ReactModal from 'react-modal'

// React Router
import { useNavigate } from "react-router-dom";

// Context
import { CartContext } from "../../../context/cart"

// Types
import { ICartContext, MCart } from "../../../models/ICartContext"
import { EditCartModalProps } from "../../../models/IEditCartModalProps";

// Assets
import TrashSimple from '../../../assets/TrashSimple.svg'


const EditCartModal: FC<EditCartModalProps> = ({ isOpen, onClose }) => {
    // Cart
    const { cart, clearCart, addToCart, removeFromCart }: ICartContext = useContext(CartContext);

    // Navigate
    const navigate = useNavigate();

    // Total
    let total = 0;

    // Modal Reference
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Si se clickea fuera del modal, el mismo se cierra
    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    // Calcula el Total de la compra
    const calcTotal = (num: number): number => {
        total += num
        return num
    }

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal-delete">
            <div className=" modal modal-open">
                <div ref={modalRef} className="bg-white p-8 rounded-3xl modal-box min-w-[50rem] max-h-[30rem] mt-20 overflow-y-hidden">
                    <button onClick={onClose} className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>

                    <h2 className="text-xl font-bold text-center text-primary">Edit Cart</h2>
                    <div className="flex flex-wrap gap-8 overflow-y-auto h-80 scrollbar">

                        <table className="table">
                            <thead>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>SubTotal</th>
                                <th>Delete</th>
                            </thead>
                            <tbody>
                                {cart[0].quantity === 0 ?
                                    <tr><td colSpan={5} className="py-20 text-xl font-bold text-center text-secondary">Empty Cart</td></tr> :
                                    cart.map((item: MCart) => {
                                        return (
                                            <tr key={item.product.id}>
                                                <td>
                                                    <img />
                                                    {item.product.name}
                                                </td>
                                                <td>
                                                    {item.product.price}
                                                </td>
                                                <td>
                                                    <button className="btn btn-primary btn-xs btn-outline" onClick={() => addToCart(item.product, false)}>-</button>
                                                    <input min={1} type='number' className="w-10 p-0 pl-2 mx-1 text-center input input-xs input-bordered" value={item.quantity} disabled />
                                                    <button className="btn btn-primary btn-xs btn-outline" onClick={() => addToCart(item.product)}>+</button>
                                                </td>
                                                <td>$
                                                    {
                                                        calcTotal(item.quantity * item.product.price)
                                                    }
                                                </td>
                                                <td>
                                                    <button onClick={() => removeFromCart(item.product)}>
                                                        <img className='p-1 btn btn-secondary btn-circle btn-xs' src={TrashSimple} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                    <h1 className="my-1 text-right">Total <span className="font-bold">${total}</span></h1>
                    <div className="flex flex-row justify-between">
                        <button className="btn btn-primary btn-wide" onClick={clearCart}>Empty Cart</button>
                         <button className={`btn btn-primary btn-wide ${cart[0].quantity === 0 && `btn-disabled`}`} onClick={() => navigate('/order-detail')}>Continue</button>

                    </div>
                </div>
            </div>
        </ReactModal>
    )
}

export default EditCartModal