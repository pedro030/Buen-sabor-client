// React
import { useContext, useEffect, useState, FC } from "react";
import ReactModal from "react-modal";

// Context
import { UserContext } from "../../../context/user";

// Sweet Alert 2
import Swal from "sweetalert2";

// Component
import AddressModal from "../../UserProfile/Components/addresses/AddressModal/AddressModal";

// Type
import { MAddress } from "../../../models/MAddress";
import { ISelectAddressModalProps } from "../../../models/ISelectAddressModalProps";
import { IUserContext } from "../../../models/IUserContext";

// Assets
import MapPin from '../../../assets/MapPin.svg';

const SelectAddressModal: FC<ISelectAddressModalProps> = ({ isOpen, onClose, onConfirm, addressSelected}) => {
    // User Context - Addresses State and Functions
    const { addresses, getAddresses, newAddress }: IUserContext = useContext(UserContext);

    // Address Modal Open/Close State
    const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

    // Al cargar el componente se cargan todas las direcciones del usuario
    useEffect(() => {
        getAddresses()
    }, [])

    // Handler: Select Address
    const handleSelectAddress = (ad: MAddress) =>{
        onConfirm(ad),
        onClose()
    }

    // Handler: Create Address with Sweet Alerts
    const handleCreateAddress= (ad: MAddress) => {
        Swal.fire({
            title: 'Adding...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
        })
        
        newAddress(ad)
            .then((res) => {
                // console.log(res)
                if(res) {
                    Swal.fire({
                        icon: 'success',
                        title: `The address was added`,
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showCancelButton: false,
                        confirmButtonColor: '#E73636'
                    })
                    setIsAddressModalOpen(false);
                    getAddresses();                
                } else {
                    Swal.fire({ title: 'There was an error', icon: 'error', confirmButtonColor: '#E73636' })
                }
            })
    };

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal-delete">
            <div className="modal modal-open">
                <div className="bg-white p-8 rounded-3xl modal-box min-w-[30rem] max-h-[30rem] mt-20">
                    <button onClick={onClose} className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    <h1>My addresses</h1>
                    <div className="overflow-y-auto scrollbar">
                        <table className="table table-xs">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Address</th>
                                    <th>Number</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {addresses?.map((a: MAddress, i: number) => (
                                    <tr key={i} onClick={() => handleSelectAddress(a)}>
                                        <td><input type="checkbox" defaultChecked={a.id === addressSelected?.id} className="checkbox checkbox-xs checkbox-error" /></td>
                                        <td>{a.street}</td>
                                        <td>{a.number}</td>
                                        <td>{a.location.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex my-3 place-content-center'>
                        <button onClick={() => setIsAddressModalOpen(true)} className='rounded-full btn btn-primary'><img className='h-6' src={MapPin} />Add address</button>
                    </div>
                </div>
            </div>
            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={()=>setIsAddressModalOpen(false)}
                onConfirm={handleCreateAddress}
            />
        </ReactModal>
    )
}

export default SelectAddressModal