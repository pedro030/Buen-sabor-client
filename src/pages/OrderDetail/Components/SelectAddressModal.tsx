import ReactModal from "react-modal";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/user";
import { MAddress } from "../../../models/MAddress";
import MapPin from '../../../assets/MapPin.svg';
import AddressModal from "../../UserProfile/Components/addresses/AddressModal/AddressModal";


interface SelectAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (ad: MAddress) => void;
    addressSelected?: MAddress
}

const SelectAddressModal: React.FC<SelectAddressModalProps> = ({ isOpen, onClose, onConfirm, addressSelected}) => {
    const { addresses, getAddresses, newAddress } = useContext(UserContext);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    useEffect(() => {
        getAddresses()
    }, [])

    const handleSelectAddress = (ad: MAddress) =>{
        onConfirm(ad),
        onClose()
    }

    const handleCreateAddress= (ad: MAddress) => {
        newAddress(ad)
            .then((data) => {
                if(data){
                    alert("Agregado")
                    setIsAddressModalOpen(false);
                    getAddresses()
                }else{
                    alert("Error al agregar")
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