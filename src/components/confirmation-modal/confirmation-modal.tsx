import ReactModal from "react-modal";
import { useContext } from "react";


interface confirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    buttonText:string;
    mainText:string;
}

const ConfirmationModal: React.FC<confirmationModalProps> = ({ isOpen, onClose, onConfirm, buttonText, mainText }) => {

    const handleSubmit = () => {
        onConfirm()
    }

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal-delete">
            <div className="modal modal-open">
                <div className="bg-white p-8 rounded-3xl modal-box min-w-[50rem] max-h-[30rem] mt-20">
                    <button onClick={onClose} className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    <h1>{mainText}</h1>
                    <button onClick={onClose} className='my-2 rounded-full btn'>Cancel</button>
                    <button className='my-2 rounded-full btn btn-primary' onClick={handleSubmit}>{buttonText}</button>
                </div>
            </div>
        </ReactModal>
    )
}

export default ConfirmationModal