import { useContext, useEffect, useRef, useState } from "react"
import { CartContext } from "../../../context/cart"
import TrashSimple from '../../../assets/TrashSimple.svg'
import ReactModal from 'react-modal';
import { useNavigate } from "react-router-dom";

interface EditCartModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const EditCartModal: React.FC<EditCartModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const { cart, clearCart, addToCart, removeFromCart }: any = useContext(CartContext);
    const modalRef = useRef(null);
    const navigate = useNavigate();
    let total = 0;

    const handleClickOutside = (e: any) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

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
                    <div className="flex flex-wrap gap-8 h-80 overflow-y-auto scrollbar">

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
                                    cart.map((p: any) => {
                                        return (
                                            <tr key={p.id}>
                                                <td>
                                                    <img />
                                                    {p.name}
                                                </td>
                                                <td>
                                                    {p.price}
                                                </td>
                                                <td>
                                                    <button className="btn btn-primary btn-xs btn-outline" onClick={() => addToCart(p, false)}>-</button>
                                                    <input min={1} type='number' className="w-10 p-0 pl-2 mx-1 text-center input input-xs input-bordered" value={p.quantity} disabled />
                                                    <button className="btn btn-primary btn-xs btn-outline" onClick={() => addToCart(p)}>+</button>
                                                </td>
                                                <td>
                                                    {
                                                        calcTotal(p.quantity * p.price)
                                                    }
                                                </td>
                                                <td>
                                                    <button onClick={() => removeFromCart(p)}>
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
                        {/* <button onClick={() => setEditCartModal(false)}>Back to Shop</button> */}
                        {cart[0].quantity === 0 ? <button className="btn btn-primary btn-wide btn-disabled" onClick={() => navigate('/order-detail')}>Continue</button> : <button className="btn btn-primary btn-wide" onClick={() => navigate('/order-detail')}>Continue</button>}

                    </div>
                </div>
            </div>
        </ReactModal>
    )
}

export default EditCartModal