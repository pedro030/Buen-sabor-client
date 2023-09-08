import { PDFViewer } from '@react-pdf/renderer';
import { useRef, useEffect } from 'react'
import PDFDocument from '../PDFDocument/PDFDocument';
import { MOrder } from '../../../../../models/MOrder';


interface PDFBillModal {
    obj?: any;
    isOpen: boolean;
    onClose: () => void;
}

const PDFBillModal: React.FC<PDFBillModal> = ({ obj, isOpen, onClose }) => {

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
        <div ref={modalRef}>
            <PDFViewer style={{ width: "80%", height: "100vh"}}>
                <PDFDocument obj={obj}/>
            </PDFViewer>
        </div>
    )
}

export default PDFBillModal;