import TrashSimple from '../../../../assets/TrashSimple.svg'
import MapPin from '../../../../assets/MapPin.svg'
import { useContext, useEffect, useState } from 'react';
import AddressModal from './AddressModal/AddressModal';
import { UserContext } from '../../../../context/user';
import { MAddress } from '../../../../models/MAddress';


const Address = () => {

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const {addresses, getAddresses, newAddress}   = useContext(UserContext);

    useEffect(() => {
      getAddresses()
    }, [])
    
    

    const handleOpenAddressModal = () => {
        setIsAddressModalOpen(true);
    };

    const handleCloseAddressModal = () => {
        setIsAddressModalOpen(false);
    };

    const handleConfirmDelete = (ad: MAddress) => {
        newAddress(ad)
        .then(() => {
            alert("Agregado")
            handleCloseAddressModal();
        })
        .catch(()=>{
            console.log("error")
            alert("error al agregar")
        })
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
                        { addresses?.map((a: MAddress, i: number) => (
                            <tr key={i}>
                                <td>{a.street}</td>
                                <td>{a.number}</td>
                                <td>{a.location.location}</td>
                                <td>
                                    <button className="btn btn-circle btn-secondary btn-sm">
                                        <img className='p-1 h-7' src={TrashSimple} />
                                    </button>
                                </td>
                            </tr>
                        ))}
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