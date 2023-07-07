import TrashSimple from '../../../../assets/TrashSimple.svg'
import MapPin from '../../../../assets/MapPin.svg'
import { useState } from 'react';
import AddressModal from './AddressModal/AddressModal';


const Address = () => {

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    const handleOpenAddressModal = () => {
        setIsAddressModalOpen(true);
    };

    const handleCloseAddressModal = () => {
        setIsAddressModalOpen(false);
    };

    const handleConfirmDelete = () => {

    };

    return (
        <div>
            <h2 className='mb-5 text-center stat-title'>Address</h2>

            <div className='flex my-3 place-content-center'>
                <button onClick={() => handleOpenAddressModal()} className='rounded-full btn btn-primary'><img className='h-6' src={MapPin} />Add address</button>
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
            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={handleCloseAddressModal}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}

export default Address;