import { useContext, useState, useEffect } from 'react'
import './Menu.scss'
import ProductCard from './product_card/ProductCard'
import clean from '../../assets/clean.svg'
import box from '../../assets/box.svg'
import line from '../../assets/line.svg'
import { FiltersContext } from '../../context/filters'
import { products as initialProducts } from '../../mocks/products.json'
import { CartContext } from '../../context/cart'
import EditCartModal from './EditCartModal/EditCartModal'


const Menu = () => {

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


    const [isEditCartModalOpen, setIsEditCartModalOpen] = useState(false);

    const handleOpenProductModal = () => {
        setIsEditCartModalOpen(true);
    };

    const handleCloseProductModal = () => {
        setIsEditCartModalOpen(false);
    };

    const handleConfirmDelete = () => {

    };

    const functionRename = () => {
        if (products.length > 0) {
            return products.map((p: any) => {
                return (<ProductCard key={p.id} product={p} />)
            })
        } else {
            return (
                <div className='flex items-center justify-center h-96 w-[40rem]'>
                    <h1 className='font-bold text-primary'>There are no results matching your search</h1>
                </div>
            )
        }
    }
    return (
        <>
            <div className="p-8 min-h-[140vh]">
                <h1 className='mb-6 text-4xl'>Menu</h1>
                <div className='grid grid-cols-[180px_3fr_1fr] gap-2'>
                    <div className='filter'>
                        <div className="flex justify-between">
                            <h2 className='card-title stat-title'>Filter</h2>
                            <img className='items-center h-4' src={clean} />
                        </div>
                        <form className="pt-2 form-control">
                            <h4 className='pb-2 text-sm font-bold'>Category</h4>
                            <div>
                                <input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value="0" onChange={handleChangeCategory} />
                                <label className='label-text'>Todos</label><br />
                                <input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value="1" onChange={handleChangeCategory} />
                                <label className='label-text'>Pizzas</label><br />
                                <input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value="2" onChange={handleChangeCategory} />
                                <label className='label-text'>Hamburguesas</label><br />
                                <input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value="3" onChange={handleChangeCategory} />
                                <label className='label-text'>Panchos</label><br />
                            </div>
                            <h4 className='mt-4 mb-2 text-sm font-bold'>Price</h4>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-row items-center justify-between'>
                                    <label className='mr-2 label-text'>Min Price:</label>
                                    <input type="number" className="w-20 input input-bordered input-xs" min={0} onChange={handleChangeMinPrice} />
                                </div>
                                <div className='flex flex-row items-center justify-between'>
                                    <label className='mr-2 label-text'>Max Price:</label>
                                    <input type="number" className="w-20 input input-bordered input-xs" max={3000} onChange={handleChangeMaxPrice} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='products'>
                        <div className='flex flex-row justify-between w-full'>
                            <p className='pl-5'>Found <span className='text-primary'>{products.length}</span> results</p>
                            <div className='flex flex-row gap-3 mb-5 mr-5'>
                                <div className="dropdown">
                                    <label tabIndex={0} className="btn btn-sm"><span className='text-gray-500'>Sort by</span> Rating: Low to High</label>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-b-lg w-full">
                                        <li><a>Item 1</a></li>
                                        <li><a>Item 2</a></li>
                                    </ul>
                                </div>
                                {/* <button className='btn btn-sm btn-primary'>paginable</button> */}
                                <div >
                                    <button className='rounded-none btn btn-sm btn-primary rounded-s-xl'><img src={box} /></button>
                                    <button className='rounded-none btn btn-sm btn-secondary rounded-e-xl'><img src={line} /></button>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className="grid grid-cols-3 gap-2">
                                {
                                    (products.length > 0) &&
                                    products.map((p: any) => {
                                        return (<ProductCard key={p.id} product={p} />)
                                    })
                                }

                            </div>
                            {(products.length === 0) &&
                                <div className='flex items-center justify-center h-96'>
                                    <h1 className='font-bold text-primary'>There are no results matching your search</h1>
                                </div>}
                        </div>
                        <div className='flex justify-end'>
                            {
                                (products.length > 0) && <div className="mt-5 join">
                                    <button className="join-item btn btn-sm">«</button>
                                    <input className="join-item btn btn-sm btn-square" type="radio" name="options" aria-label="1" checked />
                                    <input className="join-item btn btn-sm btn-square" type="radio" name="options" aria-label="2" />
                                    <input className="join-item btn btn-sm btn-square" type="radio" name="options" aria-label="3" />
                                    <button className="join-item btn btn-sm btn-disabled">...</button>
                                    <input className="join-item btn btn-sm btn-square" type="radio" name="options" aria-label="8" />
                                    <button className="join-item btn btn-sm">»</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='order'>
                        <div className='flex flex-col items-end mt-6'>
                            <div className="px-4 bg-white rounded-xl w-80 ">
                                <div className='overflow-auto w-72 h-60'>
                                    <div className="flex flex-row justify-between mt-2 mb-1">
                                        <h2>My order</h2>
                                        <a className='cursor-pointer text-primary' onClick={() => handleOpenProductModal()}>edit</a>
                                    </div>
                                    <hr className='my-2' />
                                    {
                                        cart[0].quantity != 0 ? (cart.map((item: any) => {
                                            return <div key={item.id} className="text-xs product_order">
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
            <EditCartModal
                isOpen={isEditCartModalOpen}
                onClose={handleCloseProductModal}
                onConfirm={handleConfirmDelete}
            />
        </>
    )
}

export default Menu