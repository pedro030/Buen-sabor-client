import { PDFViewer } from '@react-pdf/renderer';
import { useRef, useEffect } from 'react'
import PDFDocument from '../PDFDocument/PDFDocument';
import { MOrder } from '../../../../../models/MOrder';
import ReactModal from 'react-modal';


interface PDFBillModalProps {
    obj?: MOrder;
    isOpen: boolean;
    onClose: () => void;
}

const PDFBillModal: React.FC<PDFBillModalProps> = ({ obj, isOpen, onClose }) => {

    if (!isOpen) return null;

    const modalRef = useRef(null);

    const handleClickOutside = (e: any) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal-delete">
            <div className="rounded modal modal-open">
                <div ref={modalRef} className='w-[80vw] h-[80vh] flex max-lg:flex-col relative rounded-3xl bg-base-100 z-10 mt-[6rem] overflow-auto'>

                    <PDFViewer style={{ width: "100%", height: "100%" }}>
                        <PDFDocument obj={obj} />
                    </PDFViewer>
                </div>
            </div>
        </ReactModal>
    )
}

export default PDFBillModal;