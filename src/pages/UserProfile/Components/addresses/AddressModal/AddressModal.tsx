import ReactModal from "react-modal";
import MapPin from '../../../../../assets/MapPin.svg'


interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal-delete">
            <div className="modal modal-open">
                <div className="bg-white p-8 rounded-3xl modal-box min-w-[50rem] max-h-[30rem] mt-20">
                    <button onClick={onClose} className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>

                    <div className='flex flex-col gap-3'>
                        <label className='mt-1 text-sm' htmlFor="">Address</label><input type="text" className='my-2 input input-bordered' />
                        <label className='mt-1 text-sm' htmlFor="">Number</label><input type="text" className='my-2 input input-bordered' />
                        <label className='mt-1 text-sm' htmlFor="">Location</label><input type="text" className='my-2 input input-bordered' />
                        <button className='my-2 rounded-full btn btn-primary'><img className='h-6' src={MapPin} />Save address</button>
                    </div>
                </div>
            </div>
        </ReactModal>
    )
}

export default AddressModal
