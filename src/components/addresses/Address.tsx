import TrashSimple from '../../assets/TrashSimple.svg'
import MapPin from '../../assets/MapPin.svg'


const Address = () => {
    return (
        <div>
            <h2 className='mb-5 text-center stat-title'>Address</h2>

            <div className='flex my-3 place-content-center'>
                <button className='rounded-full btn btn-primary'><img className='h-6' src={MapPin} />Add address</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>Number</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Littel, Schaden and Vandervort</td>
                            <td>
                                <button className="btn btn-circle btn-secondary btn-sm">
                                    <img className='p-1 h-7' src={TrashSimple} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Littel, Schaden and Vandervort</td>
                            <td>
                                <button className="btn btn-circle btn-secondary btn-sm">
                                    <img className='p-1 h-7' src={TrashSimple} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Littel, Schaden and Vandervort</td>
                            <td>
                                <button className="btn btn-circle btn-secondary btn-sm">
                                    <img className='p-1 h-7' src={TrashSimple} />
                                </button>
                            </td>
                        </tr>


                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Address</th>
                            <th>Number</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className='flex flex-col p-2 m-5 mt-10 border'>
                <label className='mt-1 text-sm' htmlFor="">Address</label><input type="text" className='my-2 input input-bordered' />
                <label className='mt-1 text-sm' htmlFor="">Number</label><input type="text" className='my-2 input input-bordered' />
                <label className='mt-1 text-sm' htmlFor="">Location</label><input type="text" className='my-2 input input-bordered' />
                <button className='my-2 rounded-full btn btn-primary'><img className='h-6' src={MapPin} />Save address</button>
            </div>
        </div>
    )
}

export default Address;