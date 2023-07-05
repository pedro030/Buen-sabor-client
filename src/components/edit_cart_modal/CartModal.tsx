import { useContext } from "react"
import { CartContext } from "../../context/cart"
import TrashSimple from '../../assets/TrashSimple.svg'

function CartModal({ setEditCartModal } : any) {
    const { cart, clearCart, addToCart, removeFromCart } : any = useContext(CartContext);

  return (
    <div>
        <div>
            <div>
                <button onClick={() => setEditCartModal(false)}>X</button>
            </div>

            <div>
                <h2>Edit Cart</h2>
            </div>

            <div>
                <table>
                    <thead>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>SubTotal</th>
                        <th>Delete</th>
                    </thead>
                    <tbody>
                        { cart[0].quantity === 0 ?
                        <tr><td colSpan={5}>Empty Cart</td></tr> :
                        cart.map((p:any) => {
                            return (
                                <tr key={p.id}>
                                    <td>
                                        <img/>
                                        {p.name}
                                    </td>
                                    <td>
                                        {p.price}
                                    </td>
                                    <td>
                                        <button onClick={() => addToCart(p, false)}>-</button>
                                        <input min={1} type='number' className="bg-white" value={p.quantity} disabled/>
                                        <button onClick={() => addToCart(p)}>+</button>
                                    </td>
                                    <td>
                                        {p.price} 
                                    </td>
                                    <td>
                                        <button onClick={() => removeFromCart(p)}>
                                            <img className='p-1 h-7' src={TrashSimple} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div>
                <button onClick={clearCart}>Empty Cart</button>
                <button onClick={() => setEditCartModal(false)}>Back to Shop</button>
                <button>Continue</button>
            </div>
        </div>
    </div>
  )
}

export default CartModal