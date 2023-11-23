// React
import { useContext, useEffect, useState } from 'react';

// React PDF & PDF Components
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFBillModal from './PDFBillModal/PDFBillModal';
import PDFDocument from './PDFDocument/PDFDocument';

// Context
import { UserContext } from '../../../../context/user';

// Component
import PageLoader from '../../../page_loader/PageLoader';

// Type
import { MOrder, MOrderProducts } from '../../../../models/MOrder';

// Assets
import { AiOutlineEye, AiOutlineFilePdf } from 'react-icons/ai'

const History_Order = () => {
    // User Context - Get All Orders
    const { getOrders } = useContext(UserContext)

    // State: Orders a mostrar
    const [orders, setOrders] = useState<MOrder[]>();

    // State: Bill a generar PDF
    const [bill, setBill] = useState<MOrder>();

    // State: Abrir o Cerrar Modal del PDFBillModal
    const [isOpen, setIsOpen] = useState(false);

    // State: True si las ordenes han sido traidas y seteadas
    const [isReady, setIsReady] = useState<boolean>(false);

    // Ver PDF
    const viewPDF = (b: MOrder) => {
        setBill(b);
        setIsOpen(true);
    }

    // UseEffect inicial que trae todas las ordenes actualizadas del usuario y las setea en el state de Orders
    useEffect(() => {
        getOrders()
        .then(res => {
            setOrders(res);
        })
        .then(() => setIsReady(true));
    }, [])

    // Loader
    if (!isReady) {
        return (
          <div className="page-layout">
            <PageLoader />
          </div>
        );
      }

    return (
        <>
            { /* PDF BILL MODAL */}
            <PDFBillModal
                obj={bill}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div>
                { /* ORDERS */}
                <h2 className='mb-5 text-center stat-title'>Order history</h2>
                <div className="overflow-x-auto">
                    <table className="table overflow-auto table-xs">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Withdrawal</th>
                                <th>Total</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Products</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.map((o: MOrder) => (
                                    <tr key={o.id}>
                                        <td>{o.creationDate}</td>
                                        <td>{o.withdrawalMode}</td>
                                        <td>${o.totalPrice}</td>
                                        <td>{o.address}</td>
                                        <td>{o.statusOrder.statusType}</td>
                                        <td>
                                            <div tabIndex={0} className='collapse'>
                                                <div className='flex items-center p-0 collapse-title'>
                                                    List Products
                                                </div>
                                                <div className='p-0 collapse-content'>
                                                    {o.products.map((p: MOrderProducts) => {
                                                        return <p key={p.id}>{p.cant}x {p.product.name}</p>
                                                    })}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            { /* DOWNLOAD BILL PDF BUTTON */}
                                            {<><button onClick={() => viewPDF(o)} className=""><AiOutlineEye className='w-6 h-6 ' /></button>
                                                <PDFDownloadLink
                                                    document={<PDFDocument obj={o} />}
                                                    fileName={`Buen Sabor - Order Bill #${o.id}`}
                                                >
                                                    {({ blob, url, loading, error }) =>
                                                        loading ? "Loading document..." : <button><AiOutlineFilePdf className='w-6 h-6 ' /></button>
                                                    }
                                                </PDFDownloadLink> </>}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default History_Order