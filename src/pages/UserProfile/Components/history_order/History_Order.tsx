import { useContext, useEffect, useState } from 'react';
import TrashSimple from '../../../../assets/TrashSimple.svg'
import { UserContext } from '../../../../context/user';
import PDFBillModal from './PDFBillModal/PDFBillModal';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument/PDFDocument';

import { AiOutlineEye, AiOutlineFilePdf } from 'react-icons/ai'
import { MOrder } from '../../../../models/MOrder';
import PageLoader from '../../../page_loader/PageLoader';


const History_Order = () => {
    const { getOrders } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [orders, setOrders] = useState<MOrder[]>();
    const [bill, setBill] = useState<MOrder>();

    const viewPDF = (b: MOrder) => {
        setBill(b);
        setIsOpen(true);
    }

    useEffect(() => {
        getOrders()
        .then(res => {
            setOrders(res);
        })
        .then(() => setIsReady(true));
    }, [])

    if (!isReady) {
        return (
          <div className="page-layout">
            <PageLoader />
          </div>
        );
      }

    return (
        <>
            <PDFBillModal
                obj={bill}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div>
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
                                                    {o.products.map((p: any) => {
                                                        return <p>{p.cant}x {p.product.name}</p>
                                                    })}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
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