// React
import { useContext, useState, useEffect, ChangeEvent } from 'react'

// Auth0
import { useAuth0 } from '@auth0/auth0-react'

// React Router
import { NavigateFunction, useNavigate } from 'react-router-dom'

// React Responsive
import { useMediaQuery } from 'react-responsive'

// Sweet Alert 2
import Swal from 'sweetalert2'

// Contexts
import { FiltersContext } from '../../context/filters'
import { CartContext } from '../../context/cart'
import { UserContext } from '../../context/user'

// Components
import ProductCard from './product_card/ProductCard'
import EditCartModal from './EditCartModal/EditCartModal'

// Types
import { MProduct } from '../../models/MProduct'
import { MCategory } from '../../models/MCategory'
import { ICartContext, MCart } from '../../models/ICartContext'
import { IFilterContext, MFilters } from '../../models/IFilterContext'
import { IUserContext } from '../../models/IUserContext'

// Assets
import clean from '../../assets/clean.svg'

// Styles
import "./Menu.scss"

const Menu = () => {
    // Auth0
    const { loginWithRedirect } = useAuth0();

    // Api URL
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    // User Context
    const { userInfo }: IUserContext = useContext(UserContext);

    // Responsive
    const isTable = useMediaQuery({ maxWidth: 1024 });

    // Filters
    const { filters, setFilters, filterProducts }: IFilterContext = useContext(FiltersContext);

    // Cart
    const { cart }: ICartContext = useContext(CartContext);

    // Navigate
    const navigate: NavigateFunction = useNavigate();

    // States: Categories & Products
    const [productsFetch, setProductsFetch] = useState<MProduct[]>([]);
    const [categories, setCategories] = useState<MCategory[]>([]);

    // Setea los Products y las Categories
    useEffect(() => {
        const getAndSetData = async () => {
            await fetch(`${apiUrl}/products/getActives`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
            })
                .then(res => res.json())
                .then((data) => setProductsFetch(data))
                .catch((error) => console.error(error))

            await fetch(`${apiUrl}/categories/getAll`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
            })
                .then(res => res.json())
                .then((data) => { const cat = data.filter((c: MCategory) => c.parentCategory != null); setCategories(cat) })
                .catch((error) => console.error(error))
        }
        getAndSetData();
    }, [])

    // Inicializa todos los productos a ser filtrados
    const products: MProduct[] = filterProducts(productsFetch);

    // Handlers
    const handleChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters((prevState: MFilters) => ({
            ...prevState,
            category: e.target.value
        }))
    }

    const handleChangeMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters((prevState: MFilters) => ({
            ...prevState,
            minPrice: +e.target.value
        }))
    }

    const handleChangeMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value != '') {
            setFilters((prevState: MFilters) => ({
                ...prevState,
                maxPrice: +e.target.value
            }))
        } else {
            setFilters((prevState: MFilters) => ({
                ...prevState,
                maxPrice: 20000
            }))
        }
    }

    // Total Price del Carrito
    const totalPrice = cart.reduce((total: number, item: MCart) => {
        const itemPrice = item.product.price * item.quantity;
        return total + itemPrice;
    }, 0);

    // Cart Modal State
    const [isEditCartModalOpen, setIsEditCartModalOpen] = useState(false);

    // Handlers: Open and Close EditCartModal
    const handleOpenProductModal = () => {
        setIsEditCartModalOpen(true);
    };

    const handleCloseProductModal = () => {
        setIsEditCartModalOpen(false);
    };

    // Sorting
    const [sortedProducts, setSortedProducts] = useState<MProduct[]>([]);
    const [currentSorting, setCurrentSorting] = useState<number>(1);

    const sortProducts = (products: MProduct[], sortOp: number) => {
        switch (sortOp) {
            case 1: setSortedProducts(products);
                break;

            case 2: setSortedProducts(products.sort((a: MProduct, b: MProduct) => a.price > b.price ? 1 : -1))
                break;

            case 3: setSortedProducts(products.sort((a: MProduct, b: MProduct) => a.price < b.price ? 1 : -1))
                break;

            case 4: setSortedProducts(products.sort((a: MProduct, b: MProduct) => a.name > b.name ? 1 : -1))
                break;

            case 5: setSortedProducts(products.sort((a: MProduct, b: MProduct) => a.name < b.name ? 1 : -1))
                break;
        }
    }

    const handleChangeSorting = (e: ChangeEvent<HTMLSelectElement>) => {
        const sortOp = +e.target.value;
        console.log(sortOp);
        setCurrentSorting(sortOp);
        sortProducts(products, sortOp);
    }

    //Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productsPerPage, setProductsPerPage] = useState<number>(6);

    useEffect(() => {
        setCurrentPage(1);
        sortProducts(products, currentSorting);
    }, [filters, productsFetch, categories])

    // Calcula los productos a ser mostrados en la paginación
    const lastIndex = currentPage * productsPerPage;
    const beginIndex = lastIndex - productsPerPage;
    const currentProducts = sortedProducts.slice(beginIndex, lastIndex);
    let pages = [];

    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
        pages.push(i);
    }

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
        <>
            <div className="p-8">
                <h1 className='mb-6 text-4xl'>Menu</h1>
                {(isTable) && <>
                        <div className="mb-3 dropdown">
                            <label tabIndex={0} className='mb-1 w-52 btn btn-primary btn-sm'>Filters</label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <div className='filter'>
                                    {/* RESET FILTERS */}
                                    <div className="flex items-center justify-between ">
                                        <h2 className='card-title stat-title'>Filter</h2>
                                        <img className='items-center h-4 cursor-pointer' src={clean} onClick={() => { setFilters({ category: "all", minPrice: 0, maxPrice: 20000, search: '' }) }} />
                                    </div>
                                    <form className="pt-2 form-control">
                                        {/* FILTER by CATEGORY */}
                                        <h4 className='pb-2 text-sm font-bold'>Category</h4>
                                        <div>
                                            <input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value="all" onChange={handleChangeCategory} checked={filters.category == "all" ? true : false} />
                                            <label className='label-text'>Todos</label><br />
                                            {categories.map((c: MCategory, i) => {
                                                return <span key={i}><input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value={c.name} onChange={handleChangeCategory} />
                                                    <label className='label-text'>{c.name}</label><br /></span>
                                            })}
                                        </div>
                                        {/* FILTER by MIN & MAX PRICE */}
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
                    {(!isTable) && <div className='filter'>
                            {/* RESET FILTERS */}
                            <div className="flex items-center justify-between ">
                                <h2 className='card-title stat-title'>Filter</h2>
                                <img className='items-center h-4 cursor-pointer' src={clean} onClick={() => { setFilters({ category: "all", minPrice: 0, maxPrice: 20000, search: '' }) }} />
                            </div>
                            <form className="pt-2 form-control">
                                {/* FILTER by CATEGORY */}
                                <h4 className='pb-2 text-sm font-bold'>Category</h4>
                                <div>
                                    <input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value="all" onChange={handleChangeCategory} checked={filters.category == "all" ? true : false} />
                                    <label className='label-text'>Todos</label><br />
                                    {categories.map((c: MCategory, i) => {
                                        return <span key={i}><input type="radio" name="category" className="w-4 h-4 mr-1 rounded checkbox checkbox-primary" value={c.name} onChange={handleChangeCategory} />
                                            <label className='label-text'>{c.name}</label><br /></span>
                                    })}
                                </div>
                                {/* FILTER by MIN & MAX PRICE */}
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
                                {/* SORTING */}
                                <select className="w-full max-w-xs select select-bordered select-sm" onChange={handleChangeSorting}>
                                    <option value={1}>SORT BY: FEATURED</option>
                                    <option value={2}>SORT BY PRICE: LOW to HIGH</option>
                                    <option value={3}>SORT BY PRICE: HIGH to LOW</option>
                                    <option value={4}>SORT BY NAME: A - Z</option>
                                    <option value={5}>SORT BY NAME: Z - A</option>
                                </select>
                            </div>
                        </div>
                        {/* PRODUCTS */}
                        <div className='flex justify-center'>
                            <div className="flex flex-row flex-wrap justify-center gap-5">
                                {
                                    (products.length > 0) &&
                                    currentProducts.map((product: MProduct) => {
                                        return (<ProductCard key={product.id} product={product} />)
                                    })
                                }
                            </div>
                            {(products.length === 0) &&
                                <div className='flex items-center justify-center h-96'>
                                    <h1 className='font-bold text-primary'>There are no results matching your search</h1>
                                </div>}
                        </div>
                        {/* PAGINATION */}
                        <div className='flex justify-end'>
                            {
                                (products.length > 0) && <div className="mt-5 join ">
                                    <button className="join-item btn btn-sm max-lg:btn-xs" onClick={() => currentPage > 1 ? setCurrentPage(currentPage - 1) : ''}>«</button>
                                    {pages.map((page: number, index: number) => {
                                        return <input key={index.toString()} className="join-item btn btn-sm max-lg:btn-xs btn-square" type="radio" name="options" aria-label={(index + 1).toString()} onClick={() => setCurrentPage(page)} checked={currentPage === page} />
                                    })
                                    }
                                    <button className="join-item btn btn-sm max-lg:btn-xs" onClick={() => currentPage < Math.ceil(products.length / productsPerPage) ? setCurrentPage(currentPage + 1) : ''}>»</button>
                                </div>
                            }
                        </div>
                    </div>
                    { /* CART */ }
                    {(!isTable) && <div className='order '>
                            <div className='flex flex-col items-end mt-12 max-lg:mt-10'>
                                <div className="w-full px-4 bg-white rounded-xl">
                                    <div className='max-w-full h-60'>
                                        <div className="flex flex-row justify-between mt-2 mb-1">
                                            <h2>My order</h2>
                                            <a className='text-xs font-bold cursor-pointer btn-sm btn btn-primary' onClick={() => handleOpenProductModal()}>edit</a>
                                        </div>
                                        <hr className='my-2' />
                                        <div className='h-48 overflow-y-auto scrollbar'>
                                            {
                                                (cart[0].quantity != 0) ? (cart.map((item: MCart) => {
                                                    return <div key={item.product.id} className="pr-2 text-xs product_order">
                                                        <h4>{item.quantity}x {item.product.name}</h4>
                                                        <h4>${item.product.price * item.quantity}</h4>
                                                    </div>
                                                })) : ''

                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className='text-right max-lg:text-sm'>subtotal: <span className='font-bold'>${(totalPrice ? totalPrice : 0)}</span></h4>
                                        <div className='flex justify-center mt-2'>
                                            <button className={`w-full mb-2 rounded-full btn btn-primary ${cart[0].quantity === 0 && `btn-disabled`}`} onClick={handleLogin} >Continue</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {/* EDIT CART MODAL */}
            <EditCartModal
                isOpen={isEditCartModalOpen}
                onClose={handleCloseProductModal}
            />
        </>
    )
}

export default Menu