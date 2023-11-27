// React
import { useContext, useEffect, useRef, FC, MouseEvent } from "react";
import ReactModal from "react-modal";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// React Router
import { useNavigate } from "react-router-dom";

// Sweet Alert 2
import Swal from "sweetalert2";

// Context
import { CartContext } from "../../../context/cart";
import { UserContext } from "../../../context/user";

// Types
import { ICartContext, MCart } from "../../../models/ICartContext";
import { EditCartModalProps } from "../../../models/IEditCartModalProps";
import { IUserContext } from "../../../models/IUserContext";

// Assets
import TrashSimple from "../../../assets/TrashSimple.svg";

const EditCartModal: FC<EditCartModalProps> = ({ isOpen, onClose }) => {
  // Auth0
  const { loginWithRedirect } = useAuth0();

  // User Context
  const { userInfo }: IUserContext = useContext(UserContext);

  // Cart
  const { cart, clearCart, addToCart, removeFromCart }: ICartContext =
    useContext(CartContext);

  // Navigate
  const navigate = useNavigate();

  // Total
  let total = 0;

  // Modal Reference
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Si se clickea fuera del modal, el mismo se cierra
  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node))
      onClose();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calcula el Total de la compra
  const calcTotal = (num: number): number => {
    total += num;
    return num;
  };

  // The User is Logged to Continue Shopping?
  const handleLogin = () => {
    if(userInfo.id === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Login',
            text: 'To continue shopping you need to login',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Login',
            confirmButtonColor: '#E73636'
        })
            .then((result) => {
                if(result.isConfirmed) {
                    loginWithRedirect();
                }
            })
    } else navigate('/order-detail');
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className='modal-delete'
    >
      <div className=' modal modal-open'>
        <div
          ref={modalRef}
          className='w-full p-8 mt-40 overflow-hidden bg-white lg:mt-20 rounded-3xl modal-box'
        >
          { /* CLOSE EDIT CART MODAL BUTTON */}
          <button
            onClick={onClose}
            className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
          >
            ✕
          </button>

          <h2 className='text-xl font-bold text-center text-primary'>
            Edit Cart
          </h2>
          { /* LIST OF PRODUCTS IN CART */}
          <div className='flex flex-wrap gap-8 overflow-y-auto h-80 scrollbar'>
            <table className='table table-xs'>
              <thead>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>SubTotal</th>
                <th>Delete</th>
              </thead>
              <tbody>
                {cart[0].quantity === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className='py-20 text-xl font-bold text-center text-secondary'
                    >
                      Empty Cart
                    </td>
                  </tr>
                ) : (
                  cart.map((item: MCart) => {
                    return (
                      <tr key={item.product.id}>
                        <td className='max-sm:text-xs'>
                          <img />
                          {item.product.name}
                        </td>
                        <td className='max-sm:text-xs'>{item.product.price}</td>
                        <td>
                          <div className="flex">
                            { /* -1 QTY PRODUCT BUTTON */ }
                            <button
                              className='btn btn-primary btn-xs btn-outline'
                              onClick={() => addToCart(item.product, false)}
                            >
                              -
                            </button>
                            <input
                              min={1}
                              type='number'
                              className='w-10 p-0 pl-2 mx-1 text-center input input-xs input-bordered'
                              value={item.quantity}
                              disabled
                            />
                            { /* +1 QTY PRODUCT BUTTON */ }
                            <button
                              className='btn btn-primary btn-xs btn-outline'
                              onClick={() => addToCart(item.product)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        { /* SUBTOTAL */ }
                        <td className='max-sm:text-xs'>
                          ${calcTotal(item.quantity * item.product.price)}
                        </td>
                        <td>
                          <button onClick={() => removeFromCart(item.product)}>
                            <img
                              className='p-1 btn btn-secondary btn-circle btn-xs'
                              src={TrashSimple}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          { /* TOTAL */ }
          <h1 className='my-1 text-right'>
            Total <span className='font-bold'>${total}</span>
          </h1>
          { /* EMPTY CART OR CONTINUE SHOPPING BUTTONS */ }
          <div className='flex flex-row justify-between'>
            <button className='w-40 btn btn-primary' onClick={clearCart}>
              Empty Cart
            </button>
            <button
              className={`btn btn-primary w-40 ${
                cart[0].quantity === 0 && `btn-disabled`
              }`}
              onClick={handleLogin}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default EditCartModal;
