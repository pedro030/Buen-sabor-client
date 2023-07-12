import { useContext, useState, useEffect, ChangeEvent } from 'react'
import './Menu.scss'
import ProductCard from './product_card/ProductCard'
import clean from '../../assets/clean.svg'
import box from '../../assets/box.svg'
import line from '../../assets/line.svg'
import { FiltersContext } from '../../context/filters'
import { products as initialProducts } from '../../mocks/products.json'
import { CartContext } from '../../context/cart'
import EditCartModal from './EditCartModal/EditCartModal'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'


const Menu = () => {
    const isTable = useMediaQuery({ maxWidth: 1024 });
    const { filters, setFilters, filterProducts }: any = useContext(FiltersContext);
    const { cart }: any = useContext(CartContext);
    const navigate = useNavigate();

    const products = filterProducts(initialProducts);

    const handleChangeCategory = (e: any) => {
        setFilters((prevState: any) => ({
            ...prevState,
            category: +e.target.value
        }))
    }

    const handleChangeMinPrice = (e: any) => {
        setFilters((prevState: any) => ({
            ...prevState,
            minPrice: +e.target.value
        }))
    }

    const handleChangeMaxPrice = (e: any) => {
        if (e.target.value != '') {
            setFilters((prevState: any) => ({
                ...prevState,
                maxPrice: +e.target.value
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

    //Sorting
    const [sortedProducts, setSortedProducts] = useState([]);
    const [currentSorting, setCurrentSorting] = useState(1);

    const sortProducts = (products: any, sortOp: number) => {
        switch (sortOp) {
            case 1: setSortedProducts(products);
                break;

            case 2: setSortedProducts(products.sort((a: any, b: any) => a.price > b.price ? 1 : -1))
                break;

            case 3: setSortedProducts(products.sort((a: any, b: any) => a.price < b.price ? 1 : -1))
                break;

            case 4: setSortedProducts(products.sort((a: any, b: any) => a.name > b.name ? 1 : -1))
                break;

            case 5: setSortedProducts(products.sort((a: any, b: any) => a.name < b.name ? 1 : -1))
                break;
        }
    }


    const handleChangeSorting = (e: any) => {
        const sortOp = Number(e.target.value)
        setCurrentSorting(sortOp);
        sortProducts(products, sortOp);
    }

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(6);

    useEffect(() => {
        setCurrentPage(1);
        sortProducts(products, currentSorting);
    }, [filters])

    const lastIndex = currentPage * productsPerPage;
    const beginIndex = lastIndex - productsPerPage;
    const currentProducts = sortedProducts.slice(beginIndex, lastIndex);
    let pages = [];

    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pages.push(i);
    }

    return (
        <>
            <div className="p-8 min-h-[140vh]">
                <h1 className='mb-6 text-4xl'>Menu</h1>
                {
                    // FILTER TABLE
                    (isTable) &&
                    <>
                        <div className="mb-3 dropdown">
                            <label tabIndex={0} className='mb-1 w-52 btn btn-primary btn-sm'>Filters</label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <div className='filter'>
                                    <div className="flex items-center justify-between ">
                                        <h2 className='card-title stat-title'>Filter</h2>
                                        <img className='items-center h-4 cursor-pointer' src={clean} onClick={() => { setFilters({ category: 0, minPrice: 0, maxPrice: 20000, search: '' }) }} />
                                    </div>
                                    <form className="pt-2 form-control">
                                        <h4 className='pb-2 text-sm font-bold'>Category</h4>
                                        <div>
                                            <input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value="0" onChange={handleChangeCategory} checked={filters.category == 0 ? true : false} />
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
                                                <label className='mr-2 text-xs label-text'>Min Price:</label>
                                                <input type="number" className="w-14 input input-bordered input-xs" min={0} onChange={handleChangeMinPrice} value={filters.minPrice == 0 ? '' : filters.minPrice} />
                                            </div>
                                            <div className='flex flex-row items-center justify-between'>
                                                <label className='mr-2 text-xs label-text'>Max Price:</label>
                                                <input type="number" className="w-14 input input-bordered input-xs" min={0} max={3000} onChange={handleChangeMaxPrice} value={filters.maxPrice == 20000 ? '' : filters.maxPrice} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </ul>
                        </div>
                    </>
                }
                <div className='grid grid-cols-[140px_3fr_1fr] max-lg:grid-cols-1 gap-2'>
                    {
                        (!isTable) &&
                        <div className='filter'>
                            <div className="flex items-center justify-between ">
                                <h2 className='card-title stat-title'>Filter</h2>
                                <img className='items-center h-4 cursor-pointer' src={clean} onClick={() => { setFilters({ category: 0, minPrice: 0, maxPrice: 20000, search: '' }) }} />
                            </div>
                            <form className="pt-2 form-control">
                                <h4 className='pb-2 text-sm font-bold'>Category</h4>
                                <div>
                                    <input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value="0" onChange={handleChangeCategory} checked={filters.category == 0 ? true : false} />
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
                                        <label className='mr-2 text-xs label-text'>Min Price:</label>
                                        <input type="number" className="w-14 input input-bordered input-xs" min={0} onChange={handleChangeMinPrice} value={filters.minPrice == 0 ? '' : filters.minPrice} />
                                    </div>
                                    <div className='flex flex-row items-center justify-between'>
                                        <label className='mr-2 text-xs label-text'>Max Price:</label>
                                        <input type="number" className="w-14 input input-bordered input-xs" min={0} max={3000} onChange={handleChangeMaxPrice} value={filters.maxPrice == 20000 ? '' : filters.maxPrice} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                    <div className='products'>
                        <div className='flex flex-row justify-between w-full'>
                            <p className=' xl:ml-10'>Found <span className='text-primary'>{products.length}</span> results</p>
                            <div className='flex flex-row gap-3 mb-5 xl:mr-10'>
                                <select className="w-full max-w-xs select select-bordered select-sm" onChange={handleChangeSorting}>
                                    <option selected value={1}>SORT BY: FEATURED</option>
                                    <option value={2}>SORT BY PRICE: LOW to HIGH</option>
                                    <option value={3}>SORT BY PRICE: HIGH to LOW</option>
                                    <option value={4}>SORT BY NAME: A - Z</option>
                                    <option value={5}>SORT BY NAME: Z - A</option>
                                </select>
                                {/*<div className="dropdown">
                                    <label tabIndex={0} className="btn btn-sm"><span className='text-gray-500'>Sort by</span> Rating: Low to High</label>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-b-lg w-full">
                                        <li><a>Item 1</a></li>
                                        <li><a>Item 2</a></li>
                                    </ul>
                </div> */}
                                {/* <button className='btn btn-sm btn-primary'>paginable</button> */}
                                {/* <div >
                                    <button className='rounded-none btn btn-sm btn-primary rounded-s-xl'><img src={box} /></button>
                                    <button className='rounded-none btn btn-sm btn-secondary rounded-e-xl'><img src={line} /></button>
                                </div> */}
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className="grid grid-cols-3 gap-2">
                                {
                                    (products.length > 0) &&
                                    currentProducts.map((p: any) => {
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
                                (products.length > 0) && <div className="mt-5 join ">
                                    <button className="join-item btn btn-sm max-lg:btn-xs" onClick={() => currentPage > 1 ? setCurrentPage(currentPage - 1) : ''}>«</button>
                                    {pages.map((page: any, index: any) => {
                                        return <><input className="join-item btn btn-sm max-lg:btn-xs btn-square" type="radio" name="options" aria-label={index + 1} onClick={() => setCurrentPage(page)} checked={currentPage == page ? true : false} /></>
                                    })
                                    }

                                    { /*<input className="join-item btn btn-sm max-lg:btn-xs btn-square" type="radio" name="options" aria-label="2" />
                                    <input className="join-item btn btn-sm max-lg:btn-xs btn-square" type="radio" name="options" aria-label="3" />
                                    <button className="join-item btn btn-sm max-lg:btn-xs btn-disabled">...</button>
                                <input className="join-item btn btn-sm max-lg:btn-xs btn-square" type="radio" name="options" aria-label="8" />  */}
                                    <button className="join-item btn btn-sm max-lg:btn-xs" onClick={() => currentPage < Math.ceil(products.length / productsPerPage) ? setCurrentPage(currentPage + 1) : ''}>»</button>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        (!isTable) &&
                        <div className='order '>
                            <div className='flex flex-col items-end mt-12 max-lg:mt-10'>
                                <div className="w-full px-4 bg-white rounded-xl">
                                    <div className='max-w-full h-60'>
                                        <div className="flex flex-row justify-between mt-2 mb-1">
                                            <h2>My order</h2>
                                            <a className='cursor-pointer text-primary' onClick={() => handleOpenProductModal()}>edit</a>
                                        </div>
                                        <hr className='my-2' />
                                        <div className='h-48 overflow-y-auto'>
                                            {
                                                cart[0].quantity != 0 ? (cart.map((item: any) => {
                                                    return <div key={item.id} className="text-xs product_order">
                                                        <h4>{item.quantity}x {item.name}</h4>
                                                        <h4>${item.price * item.quantity}</h4>
                                                    </div>
                                                })) : ''

                                            }
                                        </div>

                                    </div>
                                    <div>
                                        <h4 className='text-right max-lg:text-sm'>subtotal: <span className='font-bold'>${(totalPrice ? totalPrice : 0)}</span></h4>
                                        <div className='flex justify-center mt-2'>
                                            {cart[0].quantity === 0 ? <button className='w-full mb-2 rounded-full btn btn-primary btn-disabled'>Continue</button> : <button className='w-full mb-2 rounded-full btn btn-primary' onClick={() => navigate('/order-detail')} >Continue</button>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
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