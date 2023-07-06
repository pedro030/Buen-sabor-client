import { useContext, useState, useEffect } from 'react'
import './Menu.scss'
import ProductCard from './product_card/ProductCard'
import clean from '../../assets/clean.svg'
import { FiltersContext } from '../../context/filters'
import { products as initialProducts } from '../../mocks/products.json'
import { CartContext } from '../../context/cart'
import CartModal from '../edit_cart_modal/CartModal'


const Menu = () => {
    const [editCartModal, setEditCartModal] = useState(false);
    const { filters, setFilters }: any = useContext(FiltersContext);
    const { cart, setCart }: any = useContext(CartContext);

    const filterProducts = (products: any) => {
        return products.filter((p: any) => {
            return (
                (
                    p.price >= filters.minPrice &&
                    p.price <= filters.maxPrice
                )
                &&
                (
                    filters.category === 0 ||
                    p.idCategory === filters.category
                )
            )
        })
    }

    const products = filterProducts(initialProducts);

    const handleChangeCategory = (e: any) => {
        setFilters((prevState: any) => ({
            ...prevState,
            category: Number(e.target.value)
        }))
    }

    const handleChangeMinPrice = (e: any) => {
        setFilters((prevState: any) => ({
            ...prevState,
            minPrice: Number(e.target.value)
        }))
    }

    const handleChangeMaxPrice = (e: any) => {
        if (e.target.value != '') {
            setFilters((prevState: any) => ({
                ...prevState,
                maxPrice: Number(e.target.value)
            }))
        } else {
            setFilters((prevState: any) => ({
                ...prevState,
                maxPrice: 20000
            }))
        }

    }

    const totalPrice = cart.reduce((total: any, item: any) => {
        const itemPrice = item.price * item.quantity;
        return total + itemPrice;
    }, 0);

    return (
        <>
            {editCartModal && <CartModal setEditCartModal={setEditCartModal} />}
            <div className="p-8">
                <h1 className='mb-6 text-4xl'>Menu</h1>
                <div className='grid grid-cols-[180px_3fr_1fr] gap-2'>
                    <div className='filter'>
                        <div className="flex justify-between">
                            <h2>Filter</h2>
                            <img className='items-center h-4' src={clean} />
                        </div>
                        <div className="pt-2 form-control">
                            <h4 className='pb-2'>Category</h4>
                            <div>
                                <hr className='mb-1' />
                                <input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value="0" onChange={handleChangeCategory} />
                                <label className='label-text'>Todos</label><br />
                                <input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value="1" onChange={handleChangeCategory} />
                                <label className='label-text'>Pizzas</label><br />
                                <input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value="2" onChange={handleChangeCategory} />
                                <label className='label-text'>Hamburguesas</label><br />
                                <input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value="3" onChange={handleChangeCategory} />
                                <label className='label-text'>Panchos</label><br />
                                <hr className='mt-1' />
                            </div>
                            <h4 className='pb-2 mt-2'>Price</h4>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-row items-center justify-between'>
                                    <label className='label-text mr-2'>Min Price:</label>
                                    <input type="number" className="w-20 input input-bordered input-xs" min={0} onChange={handleChangeMinPrice} />
                                </div>
                                <div className='flex flex-row items-center justify-between'>
                                    <label className='label-text mr-2'>Max Price:</label>
                                    <input type="number" className="w-20 input input-bordered input-xs" max={3000} onChange={handleChangeMaxPrice} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='products'>
                        <div className='w-[650px]'>
                            <p className='pl-5'>Found <span className='text-primary'>376</span> results in 54 seconds</p>
                            {/* <div><button>sort</button></div>
                        <div><button>paginable</button></div>
                        <div><button>boxs</button>
                        <button>rows</button></div> */}
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className="grid grid-cols-3 gap-2">
                                {
                                    products.map((p: any) => {
                                        return (<ProductCard key={p.id} product={p} />)
                                    })
                                }

                            </div>
                        </div>
                    </div>
                    <div className='order'>
                        <div className='flex flex-col items-end mt-6'>
                            <div className="px-4 bg-white rounded-xl w-80 ">
                                <div className='w-72 h-60'>
                                    <div className="flex flex-row justify-between mt-2 mb-1">
                                        <h2>My order</h2>
                                        <h4 onClick={() => setEditCartModal(true)}>edit</h4>
                                    </div>
                                    <hr className='my-2' />
                                    {
                                        cart[0].quantity != 0 ? (cart.map((item: any) => {
                                            return <div key={item.id} className="product_order">
                                                <h4>{item.quantity}x {item.name}</h4>
                                                <h4>${item.price}</h4>
                                            </div>
                                        })) : ''

                                    }
                                </div>
                                <div>
                                    <h4 className='text-right'>subtotal: ${(totalPrice ? totalPrice : 0)}</h4>
                                    <div className='flex justify-center mt-2'><button className='w-full mb-2 rounded-full btn btn-primary btn-disabled'>Continue</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu