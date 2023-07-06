import { useContext } from "react"
import { CartContext } from "../../../context/cart"
import TrashSimple from '../../../assets/TrashSimple.svg'
import ReactModal from 'react-modal';

interface EditCartModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const EditCartModal: React.FC<EditCartModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const { cart, clearCart, addToCart, removeFromCart }: any = useContext(CartContext);

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal-delete">
            <div className="modal modal-open">
                <div className="bg-white p-8 rounded-3xl modal-box min-w-[50rem] max-h-[30rem] mt-20">
                    <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                    <div className="grid grid-rows-[25px_1fr_50px] gap-8">
                        <h2 className="text-center font-bold text-primary text-xl">Edit Cart</h2>

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
                                    <tr><td colSpan={5}>Empty Cart</td></tr> :
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
                                                    <input min={1} type='number' className="input input-xs input-bordered mx-1 text-center w-10 p-0 pl-2" value={p.quantity} disabled />
                                                    <button className="btn btn-primary btn-xs btn-outline" onClick={() => addToCart(p)}>+</button>
                                                </td>
                                                <td>
                                                    {p.quantity * p.price}
                                                </td>
                                                <td>
                                                    <button onClick={() => removeFromCart(p)}>
                                                        <img className='btn btn-secondary btn-circle btn-xs p-1' src={TrashSimple} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>

                        <div className="flex flex-row justify-between">
                            <button className="btn btn-primary btn-wide" onClick={clearCart}>Empty Cart</button>
                            {/* <button onClick={() => setEditCartModal(false)}>Back to Shop</button> */}
                            <button className="btn btn-primary btn-wide">Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    )
}

export default EditCartModal