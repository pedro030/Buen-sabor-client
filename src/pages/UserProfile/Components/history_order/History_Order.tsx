import { useContext, useEffect, useState } from 'react';
import TrashSimple from '../../../../assets/TrashSimple.svg'
import { UserContext } from '../../../../context/user';
import PDFBillModal from './PDFBillModal/PDFBillModal';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument/PDFDocument';

import { AiOutlineEye, AiOutlineFilePdf } from 'react-icons/ai'


const History_Order = () => {
    const { orders } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);
    const [bill, setBill] = useState();

    const viewPDF = (b: any) => {
        setBill(b);
        setIsOpen(true);
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
                    <table className="table table-xs">
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
                                orders.map((o: any) => (
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