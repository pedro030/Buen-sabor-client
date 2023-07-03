import TrashSimple from '../../assets/TrashSimple.svg'
import MapPin from '../../assets/MapPin.svg'


const Address = () => {
    return (
        <div>
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
        </div>
    )
}

export default Address;