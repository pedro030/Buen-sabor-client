// React
import { useRef, useEffect, FC } from 'react'
import ReactModal from 'react-modal';

// React PDF & PDF Component
import { PDFViewer } from '@react-pdf/renderer';
import PDFDocument from '../PDFDocument/PDFDocument';

// Type
import { IPDFBillModalProps } from '../../../../../models/IPDFBillModalProps';

const PDFBillModal: FC<IPDFBillModalProps> = ({ obj,usr, isOpen, onClose }) => {
    // Si no está abierto el modal no se muestra
    if (!isOpen) return null;

    // Referencia del modal
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Cierra el modal si se clickea fuera
    const handleClickOutside = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    }

    useEffect(() => {
        // EventListener al clickear con el mouse
        document.addEventListener('mousedown', handleClickOutside);
        // Remueve el listener cuando se desmonta el componente
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} className="modal-delete">
            <div className="rounded modal modal-open">
                <div ref={modalRef} className='w-[80vw] h-[80vh] flex max-lg:flex-col relative rounded-3xl bg-base-100 z-10 mt-[6rem] overflow-auto'>
                    <PDFViewer style={{ width: "100%", height: "100%" }}>
                        <PDFDocument obj={obj} usr={usr} />
                    </PDFViewer>
                </div>
            </div>
        </ReactModal>
    )
}

export default PDFBillModal;