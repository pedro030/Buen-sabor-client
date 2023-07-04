import TrashSimple from '../../../../assets/TrashSimple.svg'

const History_Order = () => {
    const alertDelete = () => {
        alert("Coming soon! | DELETE |");
    }

    return (
        <div>
            <h2 className='mb-5 text-center stat-title'>Order history</h2>

            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Withdrawal</th>
                            <th>Total</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Producst</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>07/03/2023</td>
                            <td>Delivery</td>
                            <td>$100</td>
                            <td>Coronel Rodriguez 254</td>
                            <td>Delivered</td>
                            <td className='p-0'>
                                <div tabIndex={0} className=" collapse">
                                    <div className="flex items-center p-0 collapse-title">
                                        List products
                                    </div>
                                    <div className="p-0 collapse-content">
                                        <p>1x pizza muzzarella</p>
                                        <p>1x pizza muzzarella</p>
                                        <p>1x pizza muzzarella</p>
                                        <p>1x pizza muzzarella</p>
                                        <p>1x pizza muzzarella</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button onClick={alertDelete} className="btn btn-circle btn-secondary btn-sm">
                                    <img className='p-1 h-7' src={TrashSimple} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>07/03/2023</td>
                            <td>Delivery</td>
                            <td>$100</td>
                            <td>Coronel Rodriguez 254</td>
                            <td>Delivered</td>
                            <td className='p-0'>
                                <div tabIndex={0} className=" collapse">
                                    <div className="flex items-center p-0 collapse-title">
                                        List products
                                    </div>
                                    <div className="p-0 collapse-content">
                                        <p>1x pizza muzzarella</p>
                                        <p>1x pizza muzzarella</p>
                                        <p>1x pizza muzzarella</p>
                                        <p>1x pizza muzzarella</p>
                                        <p>1x pizza muzzarella</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button onClick={alertDelete} className="btn btn-circle btn-secondary btn-sm">
                                    <img className='p-1 h-7' src={TrashSimple} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>07/03/2023</td>
                            <td>Delivery</td>
                            <td>$100</td>
                            <td>Coronel Rodriguez 254</td>
                            <td>Delivered</td>
                            <td className='p-0'>
                                <div tabIndex={0} className=" collapse">
                                    <div className="flex items-center p-0 collapse-title">
                                        List products
                                    </div>
                                    <div className="p-0 collapse-content">
                                        <p>1x pizza muzzarella</p>
                                        <p>1x pizza muzzarella</p>
                                        <p>1x pizza muzzarella</p>
                                        <p>1x pizza muzzarella</p>
                                        <p>1x pizza muzzarella</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button onClick={alertDelete} className="flex btn btn-circle btn-secondary btn-sm">
                                    <img className='p-1 h-7' src={TrashSimple} />
                                </button>
                            </td>
                        </tr>

                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Date</th>
                            <th>Withdrawal</th>
                            <th>Total</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Producst</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default History_Order