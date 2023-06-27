import React from 'react'
import './Menu.scss'
import ProductCard from '../product_card/ProductCard'
import clean from '../../assets/clean.svg'


const Menu = () => {
    return (
        <div id='menuSeccion' className="p-8 ">
            <h1 className='text-4xl mb-6'>Menu</h1>
            <div className='grid grid-cols-[180px_3fr_1fr] gap-2'>
                <div className='filter'>
                    <div className="flex justify-between">
                        <h2>Filter</h2>
                        <img className='items-center h-4' src={clean} />
                    </div>
                    <div className="form-control pt-2">
                        <h4 className='pb-2'>Cusine/Food Type</h4>
                        <div>
                            <hr className='mb-1' />
                            <input type="checkbox" className="checkbox checkbox-primary rounded w-4 h-4 mr-1 " />
                            <label className='label-text'>American</label><br />
                            <input type="checkbox" className="checkbox checkbox-primary rounded w-4 h-4 mr-1" />
                            <label className='label-text'>Italy</label><br />
                            <input type="checkbox" className="checkbox checkbox-primary rounded w-4 h-4 mr-1" />
                            <label className='label-text'>India</label><br />
                            <input type="checkbox" className="checkbox checkbox-primary rounded w-4 h-4 mr-1" />
                            <label className='label-text'>French</label><br />
                            <input type="checkbox" className="checkbox checkbox-primary rounded w-4 h-4 mr-1" />
                            <label className='label-text'>Thailand</label>
                            <hr className='mt-1' />
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
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                        </div>
                    </div>
                </div>
                <div className='order'>
                    <div className='flex flex-col mt-4 items-end'>
                        <div className="px-4 bg-white rounded-xl w-80 ">
                            <div className='w-72 h-60'>
                                <div className="flex flex-row justify-between mb-1">
                                    <h2>My order</h2>
                                    <h4>edit</h4>
                                </div>
                                <hr className='my-2' />
                                <div className="product_order">
                                    <h4>1x Pizza mozarella</h4>
                                    <h4>$1700</h4>
                                </div>
                                <div className="product_order">
                                    <h4>1x Pizza mozarella</h4>
                                    <h4>$1700</h4>
                                </div>
                                <div className="product_order">
                                    <h4>1x Pizza mozarella</h4>
                                    <h4>$1700</h4>
                                </div>
                            </div>
                            <div>
                                <h4 className='text-right'>subtotal: xxx</h4>
                                <div className='flex justify-center mt-2'><button className='btn btn-primary rounded-full w-full mb-2 btn-disabled'>Continue</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu